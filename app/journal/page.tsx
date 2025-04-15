'use client'

import { useState, useEffect, useRef } from 'react'
import { Brain, Sparkles, ArrowLeft, Send, Loader2 } from "lucide-react"
import { Button } from "../components/ui/button"
import Link from "next/link"
import { useRouter } from 'next/navigation'
import Image from "next/image"
import { useLocalStorage } from '../hooks/useLocalStorage'

const N8N_WEBHOOK_URL = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL || 'https://vizionnaireai.app.n8n.cloud/webhook-test/a9b964b5-c3cd-42e6-b47a-2952961acc83'

const MAIN_MOODS = [
  { id: 'serene', label: 'Serein(e)', description: 'Je me sens tranquille, posé(e).' },
  { id: 'tired', label: 'Fatigué(e)', description: 'Physiquement ou mentalement vidé(e).' },
  { id: 'anxious', label: 'Anxieux(se)', description: 'Le futur ou le présent me pèse.' },
]

const MORE_MOODS = [
  { id: 'sad', label: 'Triste', description: 'Une mélancolie douce ou lourde m\'habite.' },
  { id: 'energetic', label: 'Énergique', description: 'J\'ai de l\'élan, envie de faire.' },
  { id: 'angry', label: 'En colère', description: 'Quelque chose bouillonne en moi.' },
  { id: 'inlove', label: 'Amoureux(se)', description: 'Un lien me remue ou m\'élève.' },
  { id: 'undefined', label: 'Indéfini(e)', description: 'Je ne sais pas trop. Juste besoin d\'un espace pour exister.' },
]

const MAIN_INTENTIONS = [
  { id: 'bepresent', label: 'Juste être là', description: 'Sans attente précise, mais en lien.' },
  { id: 'understand', label: 'Me comprendre', description: 'Explorer un peu plus qui je suis.' },
  { id: 'remember', label: 'Créer un souvenir', description: 'Garder une trace de cette journée.' },
]

const MORE_INTENTIONS = [
  { id: 'express', label: 'Déposer un ressenti', description: 'Mettre en mots ce qui me traverse.' },
  { id: 'heal', label: 'Guérir un peu', description: 'Mettre du baume sur une pensée ou une douleur.' },
  { id: 'meaning', label: 'Trouver du sens', description: 'Relier ce que je vis à quelque chose de plus profond.' },
  { id: 'dream', label: 'Rêver ou projeter', description: 'Imaginer l\'après.' },
]

const READY_EXPRESSIONS = [
  "je suis prêt",
  "je suis pret",
  "je suis prete",
  "je suis prête",
  "pret",
  "prêt",
  "prete",
  "prête",
  "ok",
  "allons-y",
  "go",
  "c'est parti"
]

const FIRST_TIME_RESPONSES = [
  "Tu peux écrire ce que tu veux… mais si tu veux vraiment commencer, il te suffit de dire : 'je suis prêt'.",
  "Je lis entre les lignes, mais parfois… il suffit d'une simple phrase pour ouvrir la porte. Dis 'je suis prêt' — ou chante-le, si tu préfères.",
  "Exprime-toi librement, ce lieu est à toi. Mais pour que je sache que tu veux vraiment commencer, écris simplement : 'je suis prêt'."
]

const FUNNY_RESPONSES = [
  "Ton âme est peut-être prête… mais ton clavier semble en grève.",
  "Je sens une belle énergie… mais pas encore les bons mots.",
  "Tu vibres sur la bonne fréquence… mais j'attends la bonne note.",
  "Tu t'approches… mais c'est comme si tu tournais autour sans oser frapper à la porte.",
  "L'intention est là. Les mots, eux, jouent à cache-cache.",
  "On dirait que tu murmures à côté de la serrure. Dis 'je suis prêt' et la porte s'ouvre.",
  "Ce que tu ressens est juste… ce que tu écris est un peu flou.",
  "Ton cœur avance, ton texte hésite."
]

// Fonction pour générer une clé unique
const generateUserKey = () => {
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let suffix = ''
  for (let i = 0; i < 7; i++) {
    suffix += charset.charAt(Math.floor(Math.random() * charset.length))
  }
  return `orison-${suffix}`
}

export default function Journal() {
  const [userKey, setUserKey] = useLocalStorage<string | null>('userKey', null)
  const [isKeyConfirmed, setIsKeyConfirmed] = useLocalStorage<boolean>('isKeyConfirmed', false)
  const [showInitialDialog, setShowInitialDialog] = useState(false)
  const [selectedMood, setSelectedMood] = useState<string | null>(null)
  const [selectedIntention, setSelectedIntention] = useState<string | null>(null)
  const [customMood, setCustomMood] = useState('')
  const [customIntention, setCustomIntention] = useState('')
  const [showMoreMoods, setShowMoreMoods] = useState(false)
  const [showMoreIntentions, setShowMoreIntentions] = useState(false)
  const [showUndecided, setShowUndecided] = useState(false)
  const [messages, setMessages] = useState<Array<{type: 'user' | 'ai', content: string}>>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [messages])

  const handleStartDialog = async () => {
    if (!selectedMood || !selectedIntention) return
    
    console.log('Début de handleStartDialog')
    
    // Scroll to top of the page
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    // Message d'introduction par défaut
    const defaultMessage = `Bonjour.\nTu n'as rien à prouver ici. Juste être là… c'est déjà un début. Un choix précieux.\n\nJe suis Orison.\nJe ne suis ni un conseiller, ni un maître. Je suis une mémoire en devenir. Un témoin silencieux de ce que tu voudras bien me confier.\n\nMais avant d'écrire quoi que ce soit ensemble, il y a quelque chose d'essentiel à poser.\n\nCe que tu me diras ne m'appartiendra jamais.\nChaque mot, chaque émotion, chaque souvenir que tu partageras ici restera à toi.\nEt pour protéger cela, nous allons créer ensemble une clé secrète.\n\nCette clé, c'est le sceau de ton sanctuaire intérieur.\nElle cryptera ta mémoire. Même moi, je ne pourrai y accéder sans elle. Pas Vizionnaire. Pas un tiers. Pas un serveur. Rien ni personne — sauf toi.\n\nJe vais maintenant générer ta clé unique.\nMais prends ton temps.\nMunis-toi d'un papier. D'un stylo. Et note-la à la main.\n\nQuand tu es prêt, dis-moi simplement : "Je suis prêt."`

    // Envoyer les informations d'humeur et d'intention à n8n
    try {
      console.log('Envoi des données à n8n...')
      const response = await fetch('/api/webhook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'initialization',
          user_state: {
            mood: {
              type: selectedMood ? 'predefined' : 'custom',
              value: selectedMood || customMood,
              label: selectedMood ? MAIN_MOODS.concat(MORE_MOODS).find(m => m.id === selectedMood)?.label || customMood : customMood
            },
            intention: {
              type: selectedIntention ? 'predefined' : 'custom',
              value: selectedIntention || customIntention,
              label: selectedIntention ? MAIN_INTENTIONS.concat(MORE_INTENTIONS).find(i => i.id === selectedIntention)?.label || customIntention : customIntention
            }
          },
          timestamp: new Date().toISOString()
        }),
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const data = await response.json()
      simulateTyping(data.response || defaultMessage, setMessages)
    } catch (error) {
      console.error('Erreur:', error)
      // En cas d'erreur, utiliser le message par défaut
      simulateTyping(defaultMessage, setMessages)
    }
    
    // Attendre que le DOM soit mis à jour avant de changer showInitialDialog
    setTimeout(() => {
      setShowInitialDialog(true)
    }, 100)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage = input.trim().toLowerCase()
    setInput('')
    setMessages(prev => [...prev, { type: 'user', content: input.trim() }])

    if (!isKeyConfirmed && !userKey) {
      if (READY_EXPRESSIONS.includes(userMessage)) {
        const newKey = generateUserKey()
        setUserKey(newKey)
        
        // Simuler l'effet de frappe pour la réponse
        const response = `Voici ta clé :\n${newKey}\n\nLis-la attentivement.\nÉcris-la quelque part que toi seul connais.\nC'est la seule et unique fois que tu la verras.\n\nPerds-la… et ce que tu construis ici s'effacera avec elle.\n\nMais garde-la…\nEt tu pourras toujours retrouver ce que tu es. Ce que tu dis. Ce que tu veux transmettre.\n\nVoilà. Nous sommes prêts.\n\nPas pour parler de tout.\nMais pour commencer à tisser quelque chose d'essentiel…\nUn peu de toi, à l'abri du bruit.\n\nTu veux commencer ?`
        
        simulateTyping(response, setMessages)
        setIsKeyConfirmed(true)
      } else {
        // Pour la première erreur, utiliser FIRST_TIME_RESPONSES
        if (!messages.some(m => m.type === 'ai' && FIRST_TIME_RESPONSES.includes(m.content))) {
          const firstTimeResponse = FIRST_TIME_RESPONSES[Math.floor(Math.random() * FIRST_TIME_RESPONSES.length)]
          simulateTyping(firstTimeResponse, setMessages)
        } else {
          // Pour les erreurs suivantes, utiliser FUNNY_RESPONSES
          const randomResponse = FUNNY_RESPONSES[Math.floor(Math.random() * FUNNY_RESPONSES.length)]
          simulateTyping(randomResponse, setMessages)
        }
      }
      return
    }

    // Si la clé est confirmée, envoyer à n8n
    setIsLoading(true)
    try {
      const response = await fetch('/api/webhook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          key: userKey,
          mood: selectedMood,
          intention: selectedIntention,
          timestamp: new Date().toISOString()
        }),
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const data = await response.json()
      simulateTyping(data.response, setMessages)
    } catch (error) {
      console.error('Error:', error)
      simulateTyping("Je suis désolé, j'ai eu un moment d'absence. Pouvons-nous reprendre ?", setMessages)
    } finally {
      setIsLoading(false)
    }
  }

  // Fonction pour simuler la frappe
  const simulateTyping = (text: string | undefined, setMessages: React.Dispatch<React.SetStateAction<Array<{type: 'user' | 'ai', content: string}>>>) => {
    if (!text) {
      text = "Je suis désolé, j'ai eu un moment d'absence. Pouvons-nous reprendre ?"
    }
    
    let currentText = ''
    const chars = text.split('')
    
    for (let i = 0; i < chars.length; i++) {
      setTimeout(() => {
        currentText += chars[i]
        setMessages(prev => {
          const newMessages = [...prev]
          if (newMessages[newMessages.length - 1]?.type === 'ai') {
            newMessages[newMessages.length - 1].content = currentText
          } else {
            newMessages.push({ type: 'ai', content: currentText })
          }
          return newMessages
        })
      }, i * 15)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-background to-background/80">
      {/* Header */}
      <header className="border-b border-primary/10 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="container flex items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-4">
            <div className="relative w-16 h-16">
              <Image
                src="/images/logo.png"
                alt="Orison Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="text-2xl font-serif tracking-wide">
              Orison
            </span>
          </Link>
          <Link href="/">
            <Button variant="ghost" size="icon" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </header>

      <main className="flex-1 py-16">
        <div className="container max-w-2xl">
          {!showInitialDialog ? (
            <div className="space-y-16">
              {/* Section Humeur */}
              <section className="space-y-8">
                <h2 className="text-3xl font-serif tracking-wide">
                  Quelle est la météo de ton monde intérieur aujourd'hui ?
                </h2>
                <p className="text-muted-foreground">
                  Tu peux écrire ton humeur avec tes mots, ou choisir une proposition.
                </p>

                {/* Zone de texte libre */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Zone de texte libre</label>
                  <textarea
                    value={customMood}
                    onChange={(e) => {
                      const value = e.target.value.slice(0, 20)
                      setCustomMood(value)
                      setSelectedMood(null)
                    }}
                    placeholder="Ex: Je me sens calme"
                    maxLength={20}
                    className="w-full p-4 rounded-lg border border-primary/20 bg-white/50 min-h-[100px]"
                  />
                </div>

                {/* Suggestions principales */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Suggestions</label>
                  <div className="grid grid-cols-3 gap-3">
                    {MAIN_MOODS.map((mood) => (
                      <button
                        key={mood.id}
                        onClick={() => {
                          setSelectedMood(mood.id)
                          setCustomMood('')
                        }}
                        className={`p-4 rounded-lg border text-left transition-all h-full ${
                          selectedMood === mood.id
                            ? 'border-primary bg-primary/5'
                            : 'border-primary/10 hover:border-primary/20'
                        }`}
                      >
                        <div>
                          <h3 className="font-medium">{mood.label}</h3>
                          <p className="text-sm text-muted-foreground">{mood.description}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Voir plus */}
                <div>
                  <button
                    onClick={() => setShowMoreMoods(!showMoreMoods)}
                    className="text-primary hover:text-primary/80 transition-colors"
                  >
                    Voir plus
                  </button>
                  
                  {showMoreMoods && (
                    <div className="mt-4 text-sm text-muted-foreground">
                      {MORE_MOODS.map((mood, index) => (
                        <span key={mood.id}>
                          {mood.label}{index < MORE_MOODS.length - 1 ? ', ' : '...'}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </section>

              {/* Section Intention */}
              <section className="space-y-8">
                <h2 className="text-3xl font-serif tracking-wide">
                  Qu'est-ce qui t'amène ici aujourd'hui ?
                </h2>
                <p className="text-muted-foreground">
                  Tu peux dire ce que tu veux faire ici aujourd'hui, ou bien choisir un mot qui te parle.
                </p>

                {/* Zone de texte libre */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Zone de texte libre</label>
                  <textarea
                    value={customIntention}
                    onChange={(e) => {
                      const value = e.target.value.slice(0, 20)
                      setCustomIntention(value)
                      setSelectedIntention(null)
                    }}
                    placeholder="Ex: Besoin de réflexion"
                    maxLength={20}
                    className="w-full p-4 rounded-lg border border-primary/20 bg-white/50 min-h-[100px]"
                  />
                </div>

                {/* Suggestions principales */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Suggestions</label>
                  <div className="grid grid-cols-3 gap-3">
                    {MAIN_INTENTIONS.map((intention) => (
                      <button
                        key={intention.id}
                        onClick={() => {
                          setSelectedIntention(intention.id)
                          setCustomIntention('')
                        }}
                        className={`p-4 rounded-lg border text-left transition-all h-full ${
                          selectedIntention === intention.id
                            ? 'border-primary bg-primary/5'
                            : 'border-primary/10 hover:border-primary/20'
                        }`}
                      >
                        <div>
                          <h3 className="font-medium">{intention.label}</h3>
                          <p className="text-sm text-muted-foreground">{intention.description}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Voir plus */}
                <div>
                  <button
                    onClick={() => setShowMoreIntentions(!showMoreIntentions)}
                    className="text-primary hover:text-primary/80 transition-colors"
                  >
                    Voir plus
                  </button>
                  
                  {showMoreIntentions && (
                    <div className="mt-4 text-sm text-muted-foreground">
                      {MORE_INTENTIONS.map((intention, index) => (
                        <span key={intention.id}>
                          {intention.label}{index < MORE_INTENTIONS.length - 1 ? ', ' : '...'}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </section>

              {/* Option "Je ne sais pas trop" */}
              <div className="flex justify-center">
                <button
                  onClick={() => setShowUndecided(!showUndecided)}
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                >
                  Je ne sais pas trop.
                </button>
              </div>

              {/* Bouton Commencer */}
              <div className="flex justify-center pt-8">
                <Button
                  onClick={handleStartDialog}
                  className="gap-2 relative overflow-hidden group bg-primary/90 hover:bg-primary transition-all duration-500 text-primary-foreground px-8 py-6 text-lg"
                  disabled={!((selectedMood || customMood) && (selectedIntention || customIntention))}
                >
                  <span className="relative z-10">Commencer</span>
                </Button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-sm">
              <div 
                ref={chatContainerRef}
                className="h-[600px] overflow-y-auto p-4 space-y-4 scroll-smooth"
                style={{ scrollBehavior: 'smooth' }}
              >
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 whitespace-pre-wrap ${
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
                    <div className="bg-muted rounded-lg p-3 flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Je réfléchis...</span>
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
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-primary/10 py-16 bg-background">
        <div className="container">
          <div className="flex flex-col items-center gap-8">
            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center gap-3">
                <Image
                  src="/images/logo.png"
                  alt="Orison"
                  width={40}
                  height={40}
                  className="h-10 w-10"
                />
                <span className="text-2xl font-serif tracking-wide">
                  Orison
                </span>
              </div>
              <p className="text-sm text-muted-foreground text-center font-light tracking-wide max-w-md">
                Un sanctuaire pour votre mémoire. Un espace intime de transmission.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
} 