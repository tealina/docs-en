### Why Tealina

When you develop a full-stack project directly with TypeScript, you may encounter the following issues:

1. Extensive Type Definitions: There's a need to define numerous types, especially models. Although [Prisma](https://prisma.io) offers type generation, the generated types are complex.
2. Documentation: Without using [GraphQL](https://graphql.org/), [Swagger](https://swagger.io/docs/open-source-tools/swagger-editor/) is almost the only option. However, it relies on JSDoc, meaning you have to rewrite parameter types in comments.
3. API Calls: When making API calls from the frontend, you need to redefine the types related to the API. [tRPC](https://trpc.io) is a good choice, but unfortunately, it doesn't have documentation generation.

Tealina non-intrusively solves these issues:
1. It generates simpler types for frontend and documentation use with the command `gpure`.
2. It extracts documentation directly from code with the command `gdoc`.
3. It implements end-to-end typing with type aliases and a few conventions.

Finally, developing APIs with built-in documentation is simpler with Tealina, requiring only a function rich in types.