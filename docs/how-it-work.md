Tealina implements end-to-end typing through a few conventions and the basic features of Typescript, Here is the least amount of code is used to help you quickly understand its principle:

## Type extraction flowchart

![type-flow](/type-flow.png)

## Batch export APIs

Batch export of APIs using the key value structure brings two benefits:

1. Each API directory only needs to define a route once
2. Convenient for subsequent mapping types

```ts
/// [api-dir/index.ts]
export default {
  post: import("./post/index.js"),
}

// [api-dir/post/index.ts]
export default {
  "category/create": import("./category/create.js"),
}
```

## Type alias

A framework based handler function that encapsulates a type alias:\
 `HandlerType<Input, Output, Header, ...Other>`

```ts {7}
interface RawPayload {
  body?: unknown
  params?: unknown
  query?: unknown
}

type HandlerType<T extends RawPayload, Treponse, Theaders> = (req, res) => any

// api-v1/post/category/create.ts

// Declare API function type
type ApiType = HandlerType<{ body: Pure.CategoryCreateInput }, Pure.Category>

const handler: ApiType = (req, res) => {
  ///....
}

export default handler
```

### Type extraction and remapping

Using the `infer` syntax to extract API information

```ts [types/api-v1.d.ts] {4-6}
import apis from "../src/api-v1/index.ts"

type ExtractApiType<T> = T extends HandlerType<
  infer Payload,
  infer Response,
  infer Headers
>
  ? Payload & { response: Response; headers: Headers }
  : never

type RawApis = typeof apis
export type ApiTypesRecord = {
  [Method in keyof RawApis]: ExtractApiType<Awaited<RawApis[Method]>["default"]>
}
```

::: info ApiTypesRecord will become like this

```ts
type ApiTypesRecord = {
  post: {
    "category/create": {
      body: Pure.CategoryCreateInput
      response: Pure.Category
    }
  }
}
```

:::

## Type sharing with front-end

Using the package management feature of Node, expose the type to the front-end,
Define the `exports` type declaration in `server/package.json` and export API types

```json
// server/package.json
{
  "exports": {
    "./api/v1": "./types/api-v1.d.ts"
  }
}
```

Add `server` as devDependencies in the front-end `web/packages.json`

```json
// web/package.json
{
  "devDependencies": {
    "server": "link:../server"
  }
}
```

:::warning
When executing build on the front-end, Typescript will use the constraint rules in `web/tsconfig.json` to check the TS code on the back-end. The reason is that the TSC check only skips the .d.ts file, not the .ts file. Therefore, Ensure that the constraint rules on the front-end and back-end are consistent
:::

## Encapsulation request function

Encapsulate a request object using the API type exported from the backend,
When writing code, real-time types are used, and using the proxy feature, all requests are handed over to axios.request for processing
::: code-group

```ts [web/src/api/req.ts]
import axios from "axios"
import { ApiTypesRecord } from "server/api/v1"
import { MakeReqType, createReq } from "./createReq"

const instance = axios.create({
  baseURL: "/api/v1/",
})
instance.interceptors.response.use((v) => v.data)

export const req = createReq<MakeReqType<ApiTypesRecord>>(instance)
```

```ts [web/src/api/createReq.ts]
/**
 * Returns a proxy object pointing internally to ` axiosInstance `
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
  })
```

:::

Using 'req' to call APIs with intelligent prompts throughout the process

```ts
//web/src/some-file.ts
import { req } from "api/req.ts"

req.post("category/create", {
  body: {
    categoryName: "Books",
    description: "Desc...",
  },
})
```

:::tip Type delay
If there is an update to the backend type and the frontend does not respond,
This situation is because the Typescript language service has a cache,
Two solutions:

1. Locate the variable, F12 jumps to the definition, triggering a type refresh
2. Manually restart the TS service, using VS code as an example, Ctrl+Shift+P, find: Restart TS Server and execute it
   :::
