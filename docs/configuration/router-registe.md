Tealina not take control for route registe, and wild scope middlewares,
Fortunately, `create-tealina` already setup the basic version for you.

### Registe route and middlewares
> Assume you created a new API:`post/user/login`, you need set it to open Router(without verify token)

```ts {10-12}
// server/src/app/index.ts
const buildV1Router = async () => {
  const record = await loadAPIs(apisV1);
  validateMethod(record);
  const openRouter = Router();
  const authRouter = Router().use(verifyToken);
  const { get, post, ...rest } = record;
  // handle APIs whether should login or not here
  const [authGetApis, openGetApis] = separateObject(get, "health");
  const [authPostApis, openPostApis] = separateObject(post, "user/login"); // [!code ++]
  registeApiRoutes(openRouter, { get: openGetApis, post: openPostApis }); 
  registeApiRoutes(authRouter, { get: authGetApis, post: authPostApi, ...rest });
  const router = Router().use(openRouter).use(authRouter);
  return router;
};
```



<!-- #### Tealina only effect files blow:
1. `[api-dir]/index.ts`
2. `[api-dir]/[method]/index.ts`
2. `[api-dir]/[method]/**/[hanlder].ts`
3. `types/[api-dir].d.ts`
4. `docs/[api-dir].json`

####  No watch mode
The reason is:  APIs file structure is not change frequently, most of time you coding inside the file. -->
