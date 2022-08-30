# tRPC + Deno - simple hello world example

this example uses [Opine](https://github.com/cmorten/opine) for HTTP requests. it's a Deno port of Express for Node. it works with tRPC's Express adapters without any problems.

Running server in terminal: ```deno run --allow-env --allow-read --allow-net server.ts```

Running client in terminal: ```deno run --allow-net client.ts```

Example using: **[opine@2.3.3](https://deno.land/x/opine@2.3.3), [@trpc/server@9.27.2](https://esm.sh/@trpc/server@9.27.2), & [@trpc/client@9.27.2](https://esm.sh/@trpc/client@9.27.2)**

*Remember to install the [Deno extension for VS Code](https://marketplace.visualstudio.com/items?itemName=denoland.vscode-deno) and enable it to avoid a flood of errors*
