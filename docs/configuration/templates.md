When coding CRUD, most of code are the same at the beginning,
so we can formulate some templates.



The scaffold project already have some and feel free to change it.
::: code-group
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
```js [tealina.config.mjs]
// @ts-check
import { defineConfig } from 'tealina'
import apiTemplates from './dev-templates/handlers/index.mjs'
import { genTestSuite, genTestHelper } from './dev-templates/test/index.mjs'

export default defineConfig({
  template: {
    handlers: apiTemplates,
    test: {
      genSuite: genTestSuite,
      genHelper: genTestHelper,
    },
  },
})
```
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
   * Short name for this template.\
   * one character, case sensitive.\
   * `*` means fallback, when both alias and name not matched
   */
  alias: string
  /**
   * Will be use as filename, can be empty string
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

::: tip
When you run `v1 capi user c`, Tealina will find the template by alias c, and use template name as the filename, and call the generateFn to get the actual file content.