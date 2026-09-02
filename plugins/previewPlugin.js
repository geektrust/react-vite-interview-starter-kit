import fs from 'fs'
import path from 'path'

export default function previewPlugin() {
  return {
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
          const previewUrl = `https://${container}-${region}-${port}.userapp.${domain}`;
          server.config.logger.info(
            `  ➜  Preview: ${previewUrl}`
          );
            try {
              const readmePath = path.resolve(process.cwd(), 'README.md');
              let readmeContent = fs.readFileSync(readmePath, 'utf8');
              if (readmeContent.includes('{URL}')) {
                fs.writeFileSync(readmePath, readmeContent.replace('{URL}', previewUrl), 'utf8');
              }
          } catch (err) {
            server.config.logger.error(`  ➜  Failed to update README.md: ${err.message}`);
          }
        }
      };
    }
  };
}
