End-to-end types rely on the file structure of [conventions](/conventions), which are created and deleted through the command line. It will automatically help you adhere to the conventions.

## Create One

If no HTTP Method is specified, the default is post.

```bash
yarn v1 get/user
```

::: details output
<span style="color:#3dd68c"> + </span> api-v1/index.ts\
<span style="color:#3dd68c"> + </span> api-v1/get/index.ts\
<span style="color:#3dd68c"> + </span> api-v1/get/user.ts
:::

::: tip `v1` is an alias script for `tealina api-v1`
:::

## Create Multiple

Create four APIs for a model to perform CRUD operations. Alternatively, you can only pass “cr” to create two APIs.

> `crud` is an abbreviation for template defined in [config](/configuration/templates).

```bash
yarn v1 user -t crud
```

## Batch Create

According to the model name in the schema.prisma file, create APIs in bulk. If you are not using Prisma ORM, a .prisma file is also acceptable.

```bash
yarn v1 -t crud -m
```

:::info If the API file already exists, it will not be overwritten.
:::

## Delete API

Just add -d.

```bash
yarn v1 get/user -d
```

## Realign

If the file structure has been manually changed, this command can help you realign the index file.

```bash
yarn v1 -a
```

## Generate API Document

```bash
yarn v1 gdoc
```

:::tip Before running, make sure your Handler has been defined with the correct type.
:::

## Generate Types

```bash
yarn v1 gtype
```

:::info Features

1. The relation fields are excluded
1. All types use `interface` keyword (for remain the type name when use `gdoc`)
   :::

### Options

| Option               | description                                                                  | default                            |
| -------------------- | ---------------------------------------------------------------------------- | ---------------------------------- |
| --align, -a          | Align and update the index file according to the existing API files. | false                              |
| --delete-api, -d     | Delete API                                                                   | false                              |
| --template-alias, -t | Templates alias                                                              |                                    |
| --model, -m          | Use the model name from schema.prisma                                        | false                              |
| --input, -i          | The file path of schema.prisma when executing gtype                        | prisma/schema.prisma               |
| --output, -o         | Output path, gdoc is the folder, gtype is the file path                     | docs(gdoc), types/pure.d.ts(gtype) |
| --namespace, -n      | gtype Generated type, within this namespace                                  | Pure                               |
| --with-test          | Generate test files too                                                      | false                              |
| --config-path        | Tealina config file path                                                     | tealina.config.mjs                 |
| --verbose            | Print more detail when error                                                 | false                              |
