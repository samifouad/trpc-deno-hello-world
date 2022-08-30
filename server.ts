import { opine } from "https://deno.land/x/opine@2.3.3/mod.ts";
import * as trpc from "https://esm.sh/@trpc/server@9.27.2";
import * as trpcExpress from "https://esm.sh/@trpc/server@9.27.2/adapters/express";
import { opineCors } from "https://deno.land/x/cors@v1.2.2/mod.ts";

const app = opine();

app.get("/", function (req, res) {
  res.send("Hello World");
});

const appRouter = trpc.router().query("hw", {
  resolve() {
    const data = {
      hello: 'world'
    }
    return data;
  },
});

app.use("/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext: () => null,
  })
);

app.use(opineCors());

app.listen(5005, () =>
  console.log("server has started on http://localhost:5005")
);

// trpc type export
export type AppRouter = typeof appRouter;
