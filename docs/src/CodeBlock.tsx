import { useEffect, useRef, useState } from 'react'
import Prism from 'prismjs'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-tsx'

type CodeLang = 'bash' | 'tsx'

interface CodeBlockProps {
    code: string
    language: CodeLang
}

const grammarMap: Record<CodeLang, Prism.Grammar> = {
    bash: Prism.languages.bash,
    tsx: Prism.languages.tsx,
}

function CodeBlock({ code, language }: CodeBlockProps) {
    const [copied, setCopied] = useState(false)
    const timeoutRef = useRef<number | null>(null)
    const grammar = grammarMap[language] ?? Prism.languages.plain
    const normalizedCode = code.trim()
    const highlighted = Prism.highlight(normalizedCode, grammar, language)

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                window.clearTimeout(timeoutRef.current)
            }
        }
    }, [])

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(normalizedCode)
            setCopied(true)
            if (timeoutRef.current) {
                window.clearTimeout(timeoutRef.current)
            }
            timeoutRef.current = window.setTimeout(() => {
                setCopied(false)
            }, 1600)
        } catch {
            setCopied(false)
        }
    }

    return (
        <pre className="ba-code-block" aria-label={`${language} code example`}>
            <button
                type="button"
                className="ba-code-copy"
                onClick={handleCopy}
                aria-label={copied ? 'Code copied' : 'Copy code'}
            >
                {copied ? 'Copied' : 'Copy'}
            </button>
            <code className={`language-${language}`} dangerouslySetInnerHTML={{ __html: highlighted }} />
        </pre>
    )
}

export default CodeBlock
