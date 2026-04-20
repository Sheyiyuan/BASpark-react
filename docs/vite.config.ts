import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(() => {
  const isGithubActions = process.env.GITHUB_ACTIONS === 'true'

  return {
    plugins: [react()],
    base: isGithubActions ? '/BASpark-react/' : '/',
  }
})