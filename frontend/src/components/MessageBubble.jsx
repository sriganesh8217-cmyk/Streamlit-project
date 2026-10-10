export default function MessageBubble({ message }) {
  const isUser = message.role === 'user'

  return (
    <div className={`message-row ${message.role}`}>
      {!isUser && <div className="avatar assistant-avatar">AI</div>}
      <div className={`message-bubble ${message.role}`}>
        {isUser ? (
          <p className="message-text">{message.content}</p>
        ) : (
          <pre className="message-content">{message.content}</pre>
        )}
      </div>
      {isUser && <div className="avatar user-avatar">U</div>}
    </div>
  )
}
