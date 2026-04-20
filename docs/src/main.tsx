import { ViteReactSSG } from 'vite-react-ssg'
import './index.css'
import { routes } from './App.tsx'

export const createRoot = ViteReactSSG({ routes })
