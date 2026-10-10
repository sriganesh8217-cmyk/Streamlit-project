import { useEffect, useRef } from 'react'
import MessageBubble from './MessageBubble'

export default function ChatWindow({ messages, isLoading, error }) {
  const containerRef = useRef(null)

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [messages, isLoading])

  if (messages.length === 0 && !isLoading) {
    return (
      <div className="chat-window empty">
        <div className="empty-state">
          <div className="empty-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </div>
          <h2 className="empty-title">Start a conversation</h2>
          <p className="empty-subtitle">Ask anything — powered by Google Gemini 2.5 Flash</p>
        </div>
      </div>
    )
  }

  return (
    <div className="chat-window" ref={containerRef}>
      <div className="messages-container">
        {messages.map((msg, idx) => (
          <MessageBubble key={idx} message={msg} />
        ))}
        {isLoading && messages[messages.length - 1]?.role !== 'assistant' && (
          <div className="message-row assistant">
            <div className="avatar assistant-avatar">AI</div>
            <div className="typing-indicator">
              <span /><span /><span />
            </div>
          </div>
        )}
        {error && (
          <div className="error-banner">
            <span className="error-text">{error}</span>
          </div>
        )}
      </div>
    </div>
  )
}
