Follow the conventions, So Tealina can help you generate API documentation, type declarations, and updated index files.

## File Structure
1. All API files store in `[api-dir]/[method]`,
```md {1,3}
api-dir
├─ index.ts
└─ post
   ├─ index.ts
   ├─ login.ts
   ├─ category
   └─── create.ts
   
```
1. One API one file
```md {5,7}
api-dir
├─ index.ts
└─ post
   ├─ index.ts
   ├─ login.ts
   ├─ category
   └─── create.ts
   
```
## Inside File
2. Each API file has an export default handler
::: code-group
```ts [create.ts] {12}
import type { AuthedHandler } from '../../../../types/handler.js'
import type { Pure } from '../../../../types/pure.js'
import { convention } from '../../../convention.js'

type ApiType = AuthedHandler<{ body: Pure.CategoryCreateInput }, Pure.Category>

/** Comement declare here will be extra to API document */
const handler: ApiType = async (req, res) => {
  ...
}

export default convention(handler)
```

```ts [types/handler.ts]
import type { NextFunction, Request, Response } from 'express'

interface RawPayload {
  body?: unknown
  params?: unknown
  query?: unknown
}

export interface AuthedHandler< 
  T extends RawPayload = {}, 
  Tresponse = null,
  Theaders extends Request['headers'] = AuthHeaders,
  Tlocals extends Record<string, any> = AuthedLocals,
> {
  (
    req: Request<T['params'], Tresponse, T['body'], T['query']>,
    res: Response<Tresponse, Tlocals>,
    next: NextFunction,
  ): any
}
...
```

```ts [pure.d.ts]
export namespace Pure {
  interface Category{
    /** @default {autoincrement()} */
    id: number
    categoryName: string
    description: string
  }
  
  interface CategoryCreateInput{
    /** @default {autoincrement()} */
    id?: number
    categoryName: string
    description: string
  }
}
```

```ts [conventions.ts]

import type { RequestHandler } from 'express'
import type { CustomHandlerType } from '../types/handler.js'

type ConstrainedHandlerType = readonly [...RequestHandler[], CustomHandlerType]

type EnsureHandlerType = <const T extends ConstrainedHandlerType>(
  ...handlers: T
) => T
// just do the check type
export const convention: EnsureHandlerType = (...handlers) => handlers

```
:::

## Index
4. `[api-dir]/[method]/index.ts` declare route and hanlder Map
  ```ts
    export default {
      'category/create': import('./category/create.js'),
      ...
    }
  ```
5. `[api-dir]/index.ts` declare method and routes Map
```ts
    export default {
      'post': import('./post/index.js'),
      ...
    }
  ```

  ## Type declaration
6. `[api-dir].d.ts` for APIs type entry
```ts
import apis from '../src/api-v1/index.ts'
import type { ResolveApiType } from './handler.js'

type RawApis = typeof apis
export type ApiTypesRecord = {
  [Method in keyof RawApis]: ResolveApiType<Awaited<RawApis[Method]>['default']>
}
```
