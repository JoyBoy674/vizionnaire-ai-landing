'use client'

import { useState } from 'react'
import { MessageSquare, Send, X, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'

const FUNDAMENTAL_QUESTIONS = [
  "Quelle est la première chose que vous voulez matérialiser ?",
  "Qu'est-ce qui vous empêche de commencer aujourd'hui ?",
  "Quelle est votre plus grande peur dans cette aventure ?",
  "Quelle est votre plus grande force pour la surmonter ?",
  "Quel est le premier petit pas que vous pouvez faire maintenant ?"
]

export default function ChatInterface() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [messages, setMessages] = useState<Array<{type: 'user' | 'ai', content: string}>>([
    {
      type: 'ai',
      content: "Bienvenue dans votre espace de dialogue intime. Je suis là pour vous aider à transformer vos aspirations en réalité. Commençons par une question simple mais puissante..."
    },
    {
      type: 'ai',
      content: FUNDAMENTAL_QUESTIONS[0]
    }
  ])
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
      const response = await fetch('https://vizionnaire.app.n8n.cloud/webhook/orison-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          message: userMessage,
          question: FUNDAMENTAL_QUESTIONS[currentQuestionIndex]
        }),
      })

      const data = await response.json()
      setMessages(prev => [...prev, { type: 'ai', content: data.response }])
      
      // Passer à la question suivante si ce n'est pas la dernière
      if (currentQuestionIndex < FUNDAMENTAL_QUESTIONS.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1)
        setMessages(prev => [...prev, { 
          type: 'ai', 
          content: FUNDAMENTAL_QUESTIONS[currentQuestionIndex + 1]
        }])
      }
    } catch (error) {
      console.error('Error:', error)
      setMessages(prev => [...prev, { type: 'ai', content: "Je suis désolé, je n'ai pas pu enregistrer votre message. Pouvons-nous réessayer ?" }])
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
        Dialoguer avec Orison
      </Button>

      {isOpen && (
        <div className="fixed bottom-20 right-4 w-96 h-[600px] bg-background border rounded-lg shadow-lg flex flex-col">
          <div className="p-4 border-b flex justify-between items-center bg-gradient-primary text-primary-foreground rounded-t-lg">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              <h3 className="font-semibold">Votre espace de transformation</h3>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>

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
                  Je vous écoute...
                </div>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="p-4 border-t">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Votre réponse..."
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