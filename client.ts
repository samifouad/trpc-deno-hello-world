import type { AppRouter } from "./server.ts";
import { createTRPCClient } from "https://esm.sh/@trpc/client@9.27.2";

const client = createTRPCClient<AppRouter>({
  url: 'http://localhost:5005/trpc',
});

try {
  const query = await client.query("hw");
  console.log(JSON.stringify(query));
} catch (e) {
  console.log(e);
}
