### Why Tealina

When you develop a full-stack project directly with TypeScript, you may encounter the following issues:

1. Extensive Type Definitions: There's a need to define numerous types, especially models. Although [Prisma](https://prisma.io) offers type generation, the generated types are complex.
2. Documentation: Without using [GraphQL](https://graphql.org/), [Swagger](https://swagger.io/docs/open-source-tools/swagger-editor/) is almost the only option. However, it relies on JSDoc, meaning you have to rewrite parameter types in comments.
3. API Calls: When making API calls from the frontend, you need to redefine the types related to the API. [tRPC](https://trpc.io) is a good choice, but unfortunately, it doesn't have documentation generation.

Tealina has solved the above problems without invasion:

1. Use the **gtype** command to generate simpler types for front-end and document use

2. Extract document information directly from the code using the **gdoc** command

3. Implement end-to-end types using type aliases and a few conventions



Additionally, using Tealina to develop APIs with built-in documentation is simpler, requiring only a type rich function