import { useState, useRef, useCallback } from 'react'
import Header from './components/Header'
import ChatWindow from './components/ChatWindow'
import ChatInput from './components/ChatInput'
import { sendMessage, streamMessage } from './api'

function App() {
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isStreaming, setIsStreaming] = useState(false)
  const [error, setError] = useState(null)
  const [useStreaming, setUseStreaming] = useState(true)
  const messagesEndRef = useRef(null)

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  const handleSend = useCallback(async (text) => {
    if (!text.trim() || isLoading) return

    setError(null)
    const userMessage = { role: 'user', content: text }
    const newMessages = [...messages, userMessage]
    setMessages(newMessages)
    setIsLoading(true)

    try {
      if (useStreaming) {
        setIsStreaming(true)
        const assistantMessage = { role: 'assistant', content: '' }
        setMessages([...newMessages, assistantMessage])

        await streamMessage(
          text,
          newMessages.slice(0, -1),
          (chunk) => {
            setMessages((prev) => {
              const updated = [...prev]
              const last = updated[updated.length - 1]
              updated[updated.length - 1] = {
                ...last,
                content: last.content + chunk,
              }
              return updated
            })
            scrollToBottom()
          }
        )
      } else {
        const response = await sendMessage(text, newMessages.slice(0, -1))
        setMessages([...newMessages, { role: 'assistant', content: response.reply }])
      }
    } catch (err) {
      setError(err.message || 'Something went wrong')
      setMessages(newMessages)
    } finally {
      setIsLoading(false)
      setIsStreaming(false)
      setTimeout(scrollToBottom, 100)
    }
  }, [messages, isLoading, useStreaming, scrollToBottom])

  const handleClear = useCallback(() => {
    setMessages([])
    setError(null)
  }, [])

  return (
    <div className="app">
      <Header
        onClear={handleClear}
        useStreaming={useStreaming}
        onToggleStreaming={setUseStreaming}
        messageCount={messages.length}
      />
      <ChatWindow
        messages={messages}
        isLoading={isLoading}
        error={error}
      />
      <ChatInput onSend={handleSend} disabled={isLoading} />
      <div ref={messagesEndRef} />
    </div>
  )
}

export default App
