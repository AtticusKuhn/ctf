import ReactMarkdown from "react-markdown"
// import {dark} from 'react-syntax-highlighter/dist/esm/styles/prism'

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"

const Markdown: React.FC<{ markdown: string }> = ({ markdown }) => (
  <ReactMarkdown
    components={{
      code({ node, inline, className, children, ...props }) {
        const match = /language-(\w+)/.exec(className || "")
        return !inline && match ? (
          <SyntaxHighlighter
            // children=
            // style={dark}
            language={match[1]}
            PreTag="div"
            {...props}
          >{String(children).replace(/\n$/, "")}</SyntaxHighlighter>
        ) : (
          <code className={className} {...props}>
            {children}
          </code>
        )
      },
    }}
  >{markdown}</ReactMarkdown>
)
export default Markdown
