When creating the API, Tealina only knows the final file path, and the specific code inside the file is filled in through custom templates
## Template is a function
A JavaScript function that receives context and returns a string.
For more convenient customization of templates, Tealina provides an auxiliary function called `makeTemplate`,

::: details Sample code
```js [dev-templates/genCreateCode.mjs]
// @ts-check
import { makeTemplate } from 'tealina'
export default makeTemplate(({ Dir: Model, relative2api, dir: model }) => {
  // Feel free to change it
  const imps = [
    `import type { AuthedHandler } from '${relative2api}/../types/handler.js'`,
    `import type { Pure } from '${relative2api}/../types/pure.js'`,
    `import { convention } from '${relative2api}/convention.js'`,
    `import { db } from '${relative2api}/db/prisma.js'`,
  ]
  const codes = [
    `type ApiType = AuthedHandler<{ body: Pure.${Model}CreateInput }, Pure.${Model}>`,
    '',
    `/** Create ${Model} */`,
    `const handler: ApiType = async (req, res) => {`,
    `  const result = await db.${model}.create({`,
    '    data: req.body,',
    '  })',
    '  res.send(result)',
    '}',
    '',
    `export default convention(handler)`,
  ]
  return [...imps, '', ...codes].join('\n')
})

```
:::

## Mutiple Templates
Multiple templates can be defined for different HTTP methods or by name to form a JavaScript array, and Tealina also provides the `definedApiTemplates` auxiliary function
```js [dev-templates/index.mjs]
// @ts-check
import genCreateCode from './genCreateCode.mjs'
import genBasicCode from './genBasicCode.mjs'
import { defineApiTemplates } from 'tealina'

export default defineApiTemplates([
  {
    alias: 'c',
    name: 'create',
    method: 'post',
    generateFn: genCreateCode,
  },
  ...
  {
    alias: '*', //fallback
    name: '',
    method: 'post',
    generateFn: genBasicCode,
  },
])
```

::: tip
When executing 'v1 user - t c', Tealina will find the corresponding template through alias c, use the template name as the file name, call generateFn to obtain the file content, and write it to the API file
:::

## Assign to configuration file
```js [tealina.config.mjs]
// @ts-check
import { defineConfig } from 'tealina'
import apiTemplates from './dev-templates/handlers/index.mjs'
import { genTestSuite } from './dev-templates/test/index.mjs'

export default defineConfig({
  template: {
    handlers: apiTemplates,
    test: {
      genSuite: genTestSuite,
    },
  },
})
```

## Types
::: details Details
```ts [template.d.ts]
interface TemplateContext {
  dir?: string
  /** captialized directory name */
  Dir?: string
  filename: string
  /** captialized filename */
  Filename: string
  relative2api: string
  /** http method */
  method: string
}

type CodeGenerateFnType = (ctx: TemplateContext) => string

interface ApiTemplateType {
  /**
   * 
   * One character, case sensitive.\
   * `*` Used when neither name nor alias matches
   */
  alias: string
  /**
   * Used as a file name, if empty characters, the file name is the last segment in the route
   */
  name: string
  /**
   * Http Method
   * @default 'post'
   */
  method?: string
  /** Code generate function */
  generateFn: CodeGenerateFnType
}
```
:::