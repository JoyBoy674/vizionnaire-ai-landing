'use client'

import { useState, useRef, useEffect } from 'react'
import { MessageSquare, Send, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

type Message = {
  role: 'assistant' | 'user'
  content: string
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Bonjour, je suis ravi de vous retrouver. Comment puis-je vous accompagner aujourd'hui ?"
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = input.trim()
    setInput('')
    setIsLoading(true)

    // Ajouter le message de l'utilisateur
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])

    try {
      const response = await fetch('https://vizionnaire.app.n8n.cloud/webhook/orison-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
      })

      const data = await response.json()
      
      // Ajouter la réponse de l'assistant
      setMessages(prev => [...prev, { role: 'assistant', content: data.response }])
    } catch (error) {
      console.error('Error:', error)
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "Je suis désolé, j'ai rencontré une difficulté. Pouvons-nous réessayer ?"
      }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-primary/10 bg-background/80 sticky top-0 z-50">
        <div className="container flex items-center justify-between py-4">
          <Link href="/journal" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span>Retour</span>
          </Link>
          <h1 className="text-xl font-serif">Votre espace d'échange</h1>
          <div className="w-20"></div>
        </div>
      </header>

      {/* Chat Container */}
      <main className="flex-1 overflow-hidden">
        <div className="container max-w-2xl mx-auto py-8">
          <div className="space-y-8 overflow-y-auto max-h-[calc(100vh-16rem)] p-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-4 ${
                    message.role === 'user'
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
                <div className="bg-muted rounded-lg p-4">
                  Je réfléchis...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </main>

      {/* Input Form */}
      <div className="border-t border-primary/10 bg-background/80 sticky bottom-0">
        <div className="container max-w-2xl mx-auto py-4">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Votre message..."
              className="flex-1 rounded-lg border bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              disabled={isLoading}
            />
            <Button 
              type="submit" 
              disabled={isLoading}
              className="gap-2"
            >
              <Send className="h-4 w-4" />
              <span className="sr-only">Envoyer</span>
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
} 