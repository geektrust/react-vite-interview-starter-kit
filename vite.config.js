import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    react(),
    {
      name: "custom-urls",
      configureServer(server) {
        const original = server.printUrls.bind(server);
        server.printUrls = () => {
          original();
          const port = server.config.server.port;
          server.config.logger.info(
            `  ➜  Preview: https://${process.env.CONTAINER_NAME}-${process.env.REGION}-${port}.userapp.qa-interview.geektrust.in`
          );
        };
      },
    },
  ],
  server: {
    allowedHosts: true,
    hmr: {
      clientPort: 443,
    },
  },
});
