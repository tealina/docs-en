The `gdoc` command is for generate json format API document,
It use [Typescript Compilier API](https://github.com/microsoft/TypeScript/wiki/Using-the-Compiler-API) behind.

```bash
yarn v1 gdoc
```

### Options

| options          | description           | default value   |
| ---------------- | --------------------- | --------------- |
| --output-dir, -o | output directory path | docs            |
| --tsconfig       | tsconfig file path    | ./tsconfig.json |
| --api-dir        | api directory path    |                 |

::: tip `v1` is an alias script for `tealina --api-dir api-v1`
:::

The json format type is not jsonschema, instead, it use [@tealina/doc-type](/family/doc-types), a type born for transforming tools.
