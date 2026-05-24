'use client'

interface BlogPostBodyProps {
  body: string
}

export default function BlogPostBody({ body }: BlogPostBodyProps) {
  const renderBody = (text: string) => {
    return text.split('\n').map((line, i) => {
      if (line.startsWith('## ')) {
        return (
          <h2 key={i} className="font-display text-2xl text-charcoal-900 mt-10 mb-4">
            {line.replace('## ', '')}
          </h2>
        )
      }
      if (line.trim() === '') return <br key={i} />
      return (
        <p key={i} className="font-body text-charcoal-700/80 leading-relaxed mb-0">
          {line}
        </p>
      )
    })
  }

  return (
    <div className="max-w-2xl mx-auto">
      {renderBody(body)}
    </div>
  )
}
