# trpc-openapi with model schema support

in your script where you generate your specs you can now pass a object of the
schemas you want to be defined as `components/schemas` in the output doc

```ts
import { generateOpenApiDocument } from "trpc-openapi";
import { z } from "zod";

const SomeSchema = z.object({
  a: z.literal(69),
});

generateOpenApiDocument(appRouter, {
  // ...
  defs: {
    SomeSchema,
  },
});
```

which will be included in the response object definition like

```json
{
  "$ref": "#/components/schemas/SomeSchema"
}
```

and in the actual schemas list like

```json
{
  "components": {
    "schemas": {
      "SomeSchema": "..."
    }
  }
}
```
