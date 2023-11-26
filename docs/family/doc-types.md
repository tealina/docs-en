# The API document types
The API document type designed for transformation tools.
Some key features below:
1. Independent package (so you can install and build your own tools)
1. More close to typescript
1. Easy to code with

### Example
 transform doc to UI
```tsx
// type2cell.tsx
import type { DocNode } from '@tealina/doc-types'
import { DocKind } from '@tealina/doc-types'

export function type2cell(d: DocNode): ReactElement {
    // DocNode has a kind prop, can be simply use switch case
  switch (d.kind) {
    
    case DocKind.Primitive:
      return <ColorText type={d.type}>{d.type}</ColorText>

    case DocKind.Union:
        // use recursive calling do the transformation.
      return <>{injectDivider(d.types.map(t => type2cell(t, doc)))}</>
    
    case DocKind.Never:
      return <ColorText type="any">never</ColorText>

    case DocKind.StringLiteral:
      return <ColorText type="string">"{d.value}"</ColorText>
    // ...  
  }
}

```
### FAQ
####  Multiple http status code?
  Not support directly, Some alternative way:,
  1. Add comment to handler, (when error handled in the interceptors)
  ```ts
  /**
   * @return
   *  -500 descript about it
   */
  type ApiType=ApiHandler<Payload,Resonse>
  ```
  2. Code inside your response type 
  ```ts
  type BaseResponse<T>={
    code: number
    data: T
  }
  interface NamedResponse extends BaseResponse<{code:200,data:{status:'ok'}}>{}
  type ApiType = ApiHandler<Payload,NamedResponse>
  ```
#### Type name losed
  Use `interface` instead `type`, so the name will be retained.
```ts
type UserType = TypeFromCalculationUnitily<{name:string}>

interface User extends UserType{}

type ApiType = ApiHandler<Payload, User>
//...
  ```
  ::: tip  Only use `interface` in the handler file is recommended
  :::


### More detail
::: code-group
``` ts [@tealina/doc-type/index.ts]
export const DocKind = { // more close to typescript
  /** eg: string,number */
  Primitive: 0,
  /** types that has method, eg: Date, File, Blob  */
  NonLiteralObject: 1,
  Tuple: 2,
  Union: 3,
  EntityRef: 4,
  Never: 5,
  Record: 6,
  StringLiteral: 7,
  NumberLiteral: 8,
  EnumRef: 9,
  EnumMemberRef: 10,
  Array: 11,
  RecursionTuple: 12,
  RecursionEntity: 13,
} as const

export interface Kind {
  isOptional?: true
  comment?: string
  jsDoc?: Partial<Record<string, string>>
}

export interface PrimitiveType extends Kind {
  kind: DocKind['Primitive'] // every DocNode has a kind prop
  type: string
}

// ...

export type DocNode =
  | PrimitiveType
  | ObjectType
  | TupleType
  | UnionType
  | RefType
  | EnumRefType
  | EnumMemberRefType
  | RecordType
  | NumberLiteral
  | StringLiteral
  | NeverType
  | ArrayType
  | RecursionTuple
  | RecursionEntity

export interface DocItem {
  body?: DocNode 
  response?: DocNode
  query?: DocNode
  params?: DocNode
  headers?: DocNode
  comment?: string
}

type HttpMethod = string
type Endpoint = string
type Id = number

export interface ApiDoc {
  apis: Record<HttpMethod, Record<Endpoint, DocItem>>
  entityRefs: Record<Id, Entity>
  enumRefs: Record<Id, EnumEntity>
  tupleRefs: Record<Id, TupleEntity>
  /**
   * The Tealina doc type version,
   * flow semver conventions.
   * format: [major].[minor]
   *  */
  docTypeVersion: number
}

```
:::