import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import babel from 'vite-plugin-babel'

export default defineConfig({
  plugins: [
    react(),
    babel({
      babelConfig: {
        plugins: ['@babel/plugin-transform-react-jsx']
      }
    })
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    transformMode: {
      web: [/.[jt]sx?$/],
    },
  },
})
