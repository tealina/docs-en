All Tealina features work in one `[api-dir]`, when you have another api-dir, eg: api-v2,
follow the setups below:

1. Update server/packages.json
```json {4}
{
  "scripts": {
    "v1": "tealina --api-dir src/api-v1",
    "v2": "tealina --api-dir src/api-v2" //[!code ++]
  },
  "exports": {
    "./api/v1": "./types/api-v1.d.ts",
    "./api/v2": "./types/api-v2.d.ts" //[!code ++]
  }
}
```
2. Create first API (will genereate all relative files)
```bash
yarn v2 capi get/status
```
::: details output
<span style="color:#3dd68c"> + </span> api-v2/index.ts\
<span style="color:#3dd68c"> + </span> api-v2/get/index.ts\
<span style="color:#3dd68c"> + </span> api-v2/get/status.ts\
<span style="color:#3dd68c"> + </span> types/api-v2.d.ts
:::

3. Registe `v2` API router

```ts {14-19}
// server/src/app/index.ts
import express, { Router } from "express";
import apisV1 from "../api-v1/index.js";
import apisV2 from "../api-v2/index.js"; //[!code ++]
//...

const buildV1Router = async () => {
  const record = await loadAPIs(apisV1);
  validateMethod(record);
  //....
  return router;
};

const buildV2Router = async () => { //[!code ++]
  const record = await loadAPIs(apisV2);
  validateMethod(record);
  //....
  return router;
};

express()
.use("/api/v1", buildV1Router)
.use("/api/v2", buildV2Router); //[!code ++]

//...
```
4. Registe `v2` doc router
::: details
```ts {9-13,25-27}
// server/src/app/docRouter.ts
const vDocCofig: TealinaVdocWebConfig = {
  sources: [
    {
      baseURL: '/api/v1',
      jsonURL: `${VDOC_BASENAME}/v1.json`,
      name: 'v1',
    },
    {//[!code ++]
      baseURL: '/api/v2',
      jsonURL: `${VDOC_BASENAME}/v2.json`,
      name: 'v2',
    },
  ],
  ///....
}

const docRouter = Router({ caseSensitive: true })
  .get('/index.html', (_req, res) => {
    assembleHTML(vDocCofig).then(html => res.send(html))
  })
  .get('/v1.json', (_req, res) => {
    res.sendFile(path.resolve('docs/api-v1.json'))
  })
  .get('/v2.json', (_req, res) => { //[!code ++]
    res.sendFile(path.resolve('docs/api-v2.json'))
  })
  .use(express.static(getAssetsPath()))

export { docRouter, VDOC_BASENAME }
```
:::
5. Create new req.ts in the web/src/api direcotry.

```ts [reqV2.ts] {3}
// web/src/api/reqV2.ts
import axios from "axios";
import { ApiTypesRecord } from "server/api/v2";
import { MakeReqType, createReq } from "./createReq";

const instance = axios.create({
  baseURL: "/api/v2",
});

instance.interceptors.response.use((v) => v.data);

export const req = createReq<MakeReqType<ApiTypesRecord>>(instance);
```
