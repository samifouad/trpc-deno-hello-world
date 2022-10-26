import { opine } from "https://deno.land/x/opine@2.3.3/mod.ts";
// TODO: Update imports to stable 10.0.0 when ready
import {
  inferAsyncReturnType,
  initTRPC,
} from "https://esm.sh/@trpc/server@10.0.0-proxy-beta.26";
import * as trpcExpress from "https://esm.sh/@trpc/server@10.0.0-proxy-beta.26/adapters/express";
// This zod import is for request validation
import { z } from "https://deno.land/x/zod@v3.19.1/mod.ts";
//import { opineCors } from "https://deno.land/x/cors@v1.2.2/mod.ts";

/**
 * TRPC V10 Docs for Express integration:
 * https://trpc.io/docs/v10/express#3-use-the-express-adapter
 */

// created for each request
const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({}); // no context
type Context = inferAsyncReturnType<typeof createContext>;

const t = initTRPC.context<Context>().create();

const appRouter = t.router({
  hello: t.procedure
    .input(z.string())
    .query((req) => {
      return `Hello ${req.input}`;
    }),

  helloJson: t.procedure
    .input(z.string())
    .query((req) => {
      const data = { hello: req.input };
      return data;
    }),
});

const app = opine(); // opine is express ported to deno
const port = 5005;

// apply tRPC router as a middleware
app.use(
  "/trpc",
  // @ts-expect-error Something is wrong with the typing here, prob. inside the createExpressMiddleware function,
  // but it works when running `deno task server`
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  }),
);

//app.use(opineCors()); // uncomment to use cors

app.listen(port); // start server

console.log(`Opine started on port: ${port}`);

export type AppRouter = typeof appRouter; // tRPC type-only export
