import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'preview-info',
      configureServer(server) {
        const original = server.printUrls.bind(server);
        server.printUrls = () => {
          original();
          const container = process.env.CONTAINER_NAME;
          const region = process.env.REGION;
          const port = process.env.USER_APP_PORT;
          const remoteUrl = process.env.LT_REMOTE_URL;
          if (container && region && port && remoteUrl) {
            const domain = new URL(remoteUrl).hostname;
            server.config.logger.info(
              `  ➜  Preview: https://${container}-${region}-${port}.userapp.${domain}`
            );
          }
        };
      }
    }
  ],
  server: {
    allowedHosts: true,
    hmr: {
      clientPort: 443
    }
  }
})