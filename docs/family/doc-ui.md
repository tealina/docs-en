`@tealina/doc-ui` provide a webpage for presenting API documentation
## VS Code style syntax highlighting
![synatx-highlight](/synatx-highlight.png)

## Automatically generate Form
![Form Feature](/doc-ui-feature.png)

## Complex types in Form
- When encountering complex types, such as' any 'and' recursion '(circular reference), the form item will use a code editor
- Tuple types will have an additional toggle button
- Enum type will be converted to a dropdown selection box
- File type will be converted to an upload button, and 'Content Type' needs to be configured in Headers: 'multipart/form data'
::: details Headers config
```ts
// server/src/api-v1/post/upload.ts
const handler: AuthedHandler<
  { body: { payload: File } },
  { url: string },
  {'Content-Type': 'multipart/form-data'},// headers
> = async (req, res, next) => {
    // ...
}
```
:::