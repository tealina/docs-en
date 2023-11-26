The `dapi` command is for delete API files,
And update the index declaration files automaticly,
This command is almost the mirror version of [capi](/commands/capi)
> Relative files would be effect\
    1. `[api-dir]/index.ts`\
    2. `[api-dir]/[method]/index.ts`

## Delete one by passing route
```bash
yarn v1 dapi get/user
```
::: tip `v1` is an alias script for ```tealina --api-dir api-v1```
:::


## Batch delete by passing name and template alias
```bash
yarn v1 dapi user crud
```

## Batch delete by model names from schema.prisma
`dapi` Not support --by-model

