Tealina achieve end-to-end type safety by a few conventions and Typescript basic features.
Here is a quick explaination with minimal codebase.
### Convetions

APIs batch export in key value structure

```ts
/// [api-dir/index.ts]
export default {
  'post': import('./post/index.js'),
}

// [api-dir/post/index.ts]
export default {
  'category/create': import('./category/create.js'),
}
```
Use handler type alias that can be inferred

```ts
// api-v1/post/category/create.ts
import type { HandlerType } from '../../../types/handler.js' //source code at next code block

type ApiType = HandlerType<{ body: Pure.CategoryCreateInput }, Pure.Category>

const handler:ApiType = (req, res) => {
    ///....
}

export default handler
```

### Typescript

Use typescript to extra API infomations
::: code-group
```ts [types/api-v1.d.ts]
import apis from "../src/api-v1/index.ts";
import type { ExtractApiType } from "./handler.js";

type RawApis = typeof apis;
export type ApiTypesRecord = {
  [Method in keyof RawApis]: ExtractApiType<
    Awaited<RawApis[Method]>["default"]
  >;
};
```
```ts [types/handler.js]
interface RawPayload {
  body?: unknown
  params?: unknown
  query?: unknown
}

type HandlerType<T extends RawPayload, Treponse, Theaders> = (req,res) => any

type ExtractApiType<T> = T extends HandlerType<
  infer Payload,
  infer Response,
  infer Headers
>
  ? Payload & { response: Response; headers: Headers }
  : never

```
:::
::: info ApiTypesRecord would be like this
```ts
type ApiTypesRecord = {
  post: {
    "category/create": {
      body: Pure.CategoryCreateInput;
      response: Pure.Category;
    };
  };
};
```
:::
### Link Package
Add `exports` field in server/package.json

```json
// server/package.json
{
  "exports": {
    "./api/v1": "./types/api-v1.d.ts"
  }
}
```

Add `server` as devDependencies in web/packages.json

```json
// web/package.json
{
  "devDependencies": {
    "server": "link:../server"
  }
}
```

:::warning
When web side run build, Typescript will still apply the strict rule to server side code. so make sure both side has same strict rule.
:::

Create a reqeust object with ApiTypesRecord
::: code-group

```ts [web/src/api/req.ts]
import axios from "axios";
import { ApiTypesRecord } from "server/api/v1";
import { MakeReqType, createReq } from "./createReq";

const instance = axios.create({
  baseURL: "/api/v1/",
});
instance.interceptors.response.use((v) => v.data);

export const req = createReq<MakeReqType<ApiTypesRecord>>(instance);
```

```ts [web/src/api/createReq.ts]
/**
 * return a proxied object that points to `axiosInstance`.
 * @param axiosInstance
 */
const createReq = <T extends ApiShape>(axiosInstance: AxiosInstance) =>
  new Proxy({} as T, {
    get:
      (_target, method: string) =>
      (url: string, ...rest: DynamicParmasType) =>
        axiosInstance.request({
          method,
          url,
          ...transformPayload(url, rest),
        }),
  });
```

:::

 Use `req` to calling APIs

```ts
//web/src/some-file.ts
import { req } from 'api/req.ts'

req.post("category/create", {
  body: {
    categoryName: "Books",
    description: "Desc...",
  },
});
```