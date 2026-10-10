export default function Header({ onClear, useStreaming, onToggleStreaming, messageCount }) {
  return (
    <header className="header">
      <div className="header-left">
        <div className="logo">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#EE7C37" />
            <path d="M2 17L12 22L22 17" stroke="#EE7C37" strokeWidth="2" />
            <path d="M2 12L12 17L22 12" stroke="#EE7C37" strokeWidth="2" />
          </svg>
        </div>
        <h1 className="header-title">AI Chat</h1>
        <span className="badge">Gemini 3.8 Flash</span>
      </div>
      <div className="header-right">
        <label className="toggle" title="Toggle streaming response">
          <input
            type="checkbox"
            checked={useStreaming}
            onChange={onToggleStreaming}
          />
          <span className="toggle-slider" />
          <span className="toggle-label">Stream</span>
        </label>
        {messageCount > 0 && (
          <button className="clear-btn" onClick={onClear}>
            Clear chat
          </button>
        )}
      </div>
    </header>
  )
}
