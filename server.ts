import { opine } from "opine";
// import { opineCors } from "cors";
// TODO: Update imports in importMap.json to stable 10.0.0 when ready
import { inferAsyncReturnType, initTRPC } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import { z } from "zod";

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
    // This z.string() is a zod validator, see https://trpc.io/docs/v10/quickstart#add-a-query-procedure
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
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  }),
);

//app.use(opineCors()); // uncomment to use cors

app.listen(port); // start server

console.log(`Opine started on port: ${port}`);

export type AppRouter = typeof appRouter; // tRPC type-only export
