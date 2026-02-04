import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

const libRootPath = path.resolve(
  __dirname,
  '../../../Common/vue-lib-exo-nico-corrected',
);

export default defineConfig(({ mode }) => {
  const isLibDev = process.env.LIB_DEV_MODE === 'true';
  const env = loadEnv(mode, process.cwd(), '');
  const strapiBaseUrl = (env.STRAPI_BASE_URL ?? '').replace(/\/$/, '');
  const strapiToken = env.STRAPI_BEARER_TOKEN ?? '';

  return {
    plugins: [vue()],
    resolve: {
      alias: [
        {
          find: '@',
          replacement: path.resolve(__dirname, 'src'),
        },
        // Toujours résoudre le CSS vers le fichier physique (dist ou node_modules)
        {
          find: 'vue-lib-exo-corrected/style.css',
          replacement: isLibDev
            ? path.resolve(libRootPath, 'dist/style.css')
            : path.resolve(__dirname, 'node_modules/vue-lib-exo-corrected/dist/style.css'),
        },
        ...(isLibDev
          ? [
              {
                find: 'vue-lib-exo-corrected',
                replacement: libRootPath,
              },
            ]
          : []),
      ],
    },
    server: {
      ...(isLibDev ? { fs: { allow: [path.resolve(__dirname), libRootPath] } } : {}),
      proxy: strapiBaseUrl
        ? {
            '/api/strapi': {
              target: strapiBaseUrl,
              changeOrigin: true,
              rewrite: (path) => path.replace(/^\/api\/strapi/, '/api'),
              configure: (proxy) => {
                proxy.on('proxyReq', (proxyReq) => {
                  if (strapiToken) {
                    proxyReq.setHeader('Authorization', `Bearer ${strapiToken}`);
                  }
                });
              },
            },
          }
        : undefined,
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: isLibDev
            ? `@use "${path.resolve(libRootPath, 'src/styles/vue-lib-exo-corrected.scss')}" as *;`
            : `@use "vue-lib-exo-corrected/styles/vue-lib-exo-corrected.scss" as *;`,
        },
      },
    },
  };
});
