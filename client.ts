import type { AppRouter } from "./server.ts";
import {
  createTRPCProxyClient,
  httpBatchLink,
} from "https://esm.sh/@trpc/client@10.0.0-proxy-beta.26";

const client = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:5005/trpc",
    }),
  ],
});

try {
  const query1 = await client.hello.query("World");
  const query2 = await client.helloJson.query("World");
  console.log(query1);
  console.log(JSON.stringify(query2));
} catch (e) {
  console.error(e);
}
