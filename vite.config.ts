import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
//@ts-ignore
import path from 'path'


console.log('http://localhost:5173/page/desktop/index.html');
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    base:'./',
    root:'src',
    build: {
        //@ts-ignore
        outDir: path.resolve(__dirname, 'dist'),
        // rollup 配置打包项
        rollupOptions: {
            input: {
                //@ts-ignore
                desktop: path.resolve(__dirname, 'src/page/desktop/index.html'),
            }
        },
    },
    server: {
        port: 5173,
        host: '0.0.0.0',
        hmr: {
            protocol: "ws",
            clientPort: 5173
        },
    }
})
