# Config for generate type from schema.prisma
By default, `gpure` follow the same basic rule as `prisma generate`,
eg: mark optional for all property when making `xxUpdateInput`.
You can change most of the them in `tealina.config.mjs`
```js
// @ts-check
import { defineConfig } from 'tealina'

export default defineConfig({
  gpure:{
    // ...
  }
})
```

### Example
 Exlude the `id` property 
::: code-group
```js [ tealina.config.mjs ]
{
    overwrite: {
      excludeProps: [
        {
          blockName: '*',// '*' for all model and type you declare
          keyword: 'model',
          kind: 'CreateInput',
          predicate: p => p.name === 'id',
        },
      ],
    },
}
```
```prisma [schema.prisma]

model Category {
  id           Int    @id @default(autoincrement())
  categoryName String
  description  String

  products Product[]
}
```
```ts [ types/pure.d.ts ]

 interface Category {
    categoryName: string
    description: string
  }

```
:::

### Type remap
Type remap is more straightforward than overwrite,
and effect all kind,(`model`,`type`,`xxCreateInput`,`xxUpdateInput`,`xx`)
```js
{
    typeRemap: type => {
      switch (type) {
        case 'Date':
          return 'number | string'
        //  ....
        default:
          // retrun null fallback to default stategy
          return null
      }
    },
}
```

### The default type Map
```ts
/** https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference#model-field-scalar-types */
const justMap = new Map<string, string>([
  ['BigInt', 'bigint'],
  ['Int', 'number'],
  ['Float', 'number'],
  ['Decimal', 'number'],
  ['String', 'string'],
  ['DateTime', 'Date'],
  ['Boolean', 'boolean'],
  ['Json', 'JsonValue'],
  ['Bytes', 'Buffer'],
])
```