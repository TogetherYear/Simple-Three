import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig(({ command, mode }) => {
    return {
        plugins: [],
        resolve: {
            alias: {
                '@': path.resolve('Src')
            }
        },
        esbuild: {
            drop: command === 'serve' ? [] : ['debugger'],
            pure: command === 'serve' ? [] : ['console.log']
        },
        build: {
            outDir: path.join(__dirname, 'Dist'),
            emptyOutDir: true,
            minify: 'esbuild',
            assetsDir: 'Source',
            sourcemap: false,
            target: 'esnext',
            rollupOptions: {
                output: {
                    manualChunks: (id: string) => {
                        if (id.includes('node_modules')) {
                            return 'Vendor';
                        }
                    }
                }
            }
        },
        root: path.join(__dirname, ''),
        publicDir: 'Public',
        optimizeDeps: {
            include: []
        },
        base: './',
        envDir: './Env',
        server: {
            host: '0.0.0.0',
            port: 6768,
            open: true,
            strictPort: true,
            headers: {
                'Cross-Origin-Opener-Policy': 'same-origin',
                'Cross-Origin-Embedder-Policy': 'require-corp'
            }
        }
    };
});
