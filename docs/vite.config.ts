import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(() => {
  const isGithubActions = process.env.GITHUB_ACTIONS === 'true'
  const repository = process.env.GITHUB_REPOSITORY ?? ''
  const repoName = repository.split('/')[1]
  const pagesBase = repoName ? `/${repoName}/` : '/'

  return {
    plugins: [react()],
    base: isGithubActions ? pagesBase : '/',
  }
})