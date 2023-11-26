The `capi` command is for create API files,
And update the index declaration files automaticly.
> Relative files would be effect\
    1. `[api-dir]/index.ts`\
    2. `[api-dir]/[method]/index.ts`


## Create one by passing route
> if the http method not in route, default to post
```bash
yarn v1 capi get/user
```
::: tip `v1` is an alias script for ```tealina --api-dir api-v1```
:::

## Batch create by passing name and template alias
> `crud` is the template alias defined at [ tealina.config.mjs ](/configuration/templates)
```bash
yarn v1 capi user crud
```

## Batch create by model names from schema.prisma
> it's useful when you migration from existing project,\
> if your ORM isn't Prisma, still work if you only have the .prisma file
```bash
yarn v1 capi --by-model -t crud
```
:::tip Alias option need to be explict pass to `-t` when using `--by-model`
:::

:::info If the target file exists, will not overwrite.
:::