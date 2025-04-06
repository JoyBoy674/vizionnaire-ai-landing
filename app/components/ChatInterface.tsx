'use client'

import { useState } from 'react'
import { MessageSquare, Send, X } from 'lucide-react'
import { Button } from './ui/button'

export default function ChatInterface() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Array<{type: 'user' | 'ai', content: string}>>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage = input.trim()
    setInput('')
    setMessages(prev => [...prev, { type: 'user', content: userMessage }])
    setIsLoading(true)

    try {
      const response = await fetch('https://vizionnaire.app.n8n.cloud/webhook-test/aeb9377e-9585-4e07-922d-8fcdf713a2b2', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
      })

      const data = await response.json()
      setMessages(prev => [...prev, { type: 'ai', content: data.response }])
    } catch (error) {
      console.error('Error:', error)
      setMessages(prev => [...prev, { type: 'ai', content: "Désolé, une erreur s'est produite. Veuillez réessayer." }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 gap-2 bg-gradient-primary hover:opacity-90 text-primary-foreground"
      >
        <MessageSquare className="h-4 w-4" />
        Chat avec Vizionnaire
      </Button>

      {isOpen && (
        <div className="fixed bottom-20 right-4 w-96 h-[600px] bg-background border rounded-lg shadow-lg flex flex-col">
          {/* Header */}
          <div className="p-4 border-b flex justify-between items-center bg-gradient-primary text-primary-foreground rounded-t-lg">
            <h3 className="font-semibold">Vizionnaire AI</h3>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.type === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-lg p-3">
                  En train d'écrire...
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-4 border-t">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Écrivez votre message..."
                className="flex-1 rounded-md border bg-background px-3 py-2 text-sm"
              />
              <Button type="submit" disabled={isLoading}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </div>
      )}
    </>
  )
} 