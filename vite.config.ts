import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
//@ts-ignore
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    //@ts-ignore
    outDir: path.resolve(__dirname, 'dist'),
    // rollup 配置打包项
    rollupOptions: {
        input: {
            //@ts-ignore
            desktop: path.resolve(__dirname, 'src/wap/index.html'),
        }
    },
},
})
