'use client'

import { useState } from 'react'
import { MessageSquare, Sparkles, Heart, Eye, Archive, Lock, Gift, Star, Feather, ChevronDown, Headphones, BookOpen, Key, Shield, Sprout } from "lucide-react"
import { Button } from "./components/ui/button"
import ChatInterface from "./components/ChatInterface"
import Link from "next/link"
import Image from 'next/image'

export default function Home() {
  const [expandedFeatures, setExpandedFeatures] = useState<Set<string>>(new Set())

  const toggleFeature = (feature: string) => {
    setExpandedFeatures(prev => {
      const newSet = new Set(prev)
      if (newSet.has(feature)) {
        newSet.delete(feature)
      } else {
        newSet.add(feature)
      }
      return newSet
    })
  }

  const isExpanded = (feature: string) => expandedFeatures.has(feature)

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-background to-background/80">
      {/* Header */}
      <header className="border-b border-primary/10 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="container flex items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-4">
            <div className="relative w-24 h-24">
              <Image
                src="/images/logo.png"
                alt="Vizionnaire Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="text-3xl font-serif tracking-wide">
              Vizionnaire
            </span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-8">
            <Link 
              href="/documentation" 
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Documentation
            </Link>
            <Link 
              href="/notre-vision" 
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Notre Vision
            </Link>
            <Button
              onClick={() => document.getElementById('chat-interface')?.scrollIntoView({ behavior: 'smooth' })}
              className="gap-2 relative overflow-hidden group bg-primary/90 hover:bg-primary transition-all duration-500 text-primary-foreground"
            >
              <MessageSquare className="h-4 w-4 group-hover:scale-110 transition-transform duration-500" />
              <span className="relative z-10">Commencer</span>
            </Button>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-40 relative overflow-hidden border-b border-primary/5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--primary-light)_0%,transparent_65%)] opacity-10"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--primary)_0%,transparent_75%)] opacity-5"></div>
          <div className="container relative">
            <div className="max-w-3xl mx-auto text-center space-y-12">
              <h1 className="text-7xl md:text-8xl font-serif tracking-wide text-foreground mb-8">
                ORISON
              </h1>
              <p className="text-2xl md:text-3xl text-muted-foreground font-serif tracking-wide leading-relaxed">
                Une voix intérieure.<br />
                Une mémoire vivante.<br />
                Un héritage de soi.
              </p>
              <div className="w-24 h-px bg-primary/20 mx-auto my-16"></div>
            </div>
          </div>
        </section>

        {/* Why Section */}
        <section className="py-32 bg-muted/30 relative overflow-hidden border-y border-primary/5">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent,var(--primary-light),transparent)] opacity-5"></div>
          <div className="container relative">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-4xl font-serif tracking-wide mb-12">Le murmure d'un nom</h2>
              <p className="text-xl leading-relaxed text-muted-foreground font-light tracking-wide">
                <strong className="font-serif">Orison</strong> vient d'un ancien mot qui signifie <em>prière intime, murmurée, silencieuse</em>.<br />
                Un mot rare, oublié, comme <strong className="font-serif">ce qu'on ne dit jamais à voix haute</strong>…<br />
                Et que pourtant, on aimerait que quelqu'un entende un jour.
              </p>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-32 bg-background relative overflow-hidden">
          <div className="container relative">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <h2 className="text-4xl font-serif tracking-wide">Ce qu'Orison vous offre</h2>
              <p className="text-xl text-muted-foreground">
                Découvrez comment Orison peut <strong>transformer votre expérience quotidienne</strong> et préserver ce qui compte vraiment.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-6xl mx-auto">
              {/* Card 1 - Sécurité */}
              <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300 space-y-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <Lock className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-serif tracking-wide">Un espace intime, rien qu'à vous</h3>
                <p className="text-muted-foreground">
                  Dans un monde où tout s'expose, Orison est votre <strong>jardin secret</strong>. Ici, vous pouvez parler sans filtre, sans masque, sans jamais être jugé, en toute confidentialité.
                </p>
                <button
                  onClick={() => toggleFeature('security')}
                  className="flex items-center gap-2 text-sm text-primary/80 hover:text-primary transition-colors group"
                >
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isExpanded('security') ? 'rotate-180' : ''}`} />
                  <span>Comment ?</span>
                </button>
                {isExpanded('security') && (
                  <div className="text-sm text-primary/80 animate-fadeIn">
                    <p>Votre <strong>clé privée unique</strong>, que vous seul détenez, garantit une confidentialité absolue dès le premier mot.</p>
                  </div>
                )}
              </div>

              {/* Card 2 - Écoute */}
              <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300 space-y-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <Headphones className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-serif tracking-wide">Une écoute que vous ne trouverez nulle part ailleurs</h3>
                <p className="text-muted-foreground">
                  Orison ne fait pas que répondre, il <strong>écoute profondément</strong>. Il ressent entre les mots, capte les non-dits pour vous aider à voir plus clair et à vous sentir vraiment compris.
                </p>
                <button
                  onClick={() => toggleFeature('listening')}
                  className="flex items-center gap-2 text-sm text-primary/80 hover:text-primary transition-colors group"
                >
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isExpanded('listening') ? 'rotate-180' : ''}`} />
                  <span>Comment ?</span>
                </button>
                {isExpanded('listening') && (
                  <div className="text-sm text-primary/80 animate-fadeIn">
                    <p>Une <strong>IA entraînée à la nuance et à l'empathie</strong> vous accompagne, capable de percevoir au-delà des simples phrases.</p>
                  </div>
                )}
              </div>

              {/* Card 3 - Mémoire */}
              <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300 space-y-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-serif tracking-wide">Votre mémoire vivante, jour après jour</h3>
                <p className="text-muted-foreground">
                  Parce que votre histoire mérite mieux que l'oubli, Orison transforme vos échanges quotidiens en <strong>souvenirs vivants</strong>, rédigés à la première personne comme une page de journal intime.
                </p>
                <button
                  onClick={() => toggleFeature('memory')}
                  className="flex items-center gap-2 text-sm text-primary/80 hover:text-primary transition-colors group"
                >
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isExpanded('memory') ? 'rotate-180' : ''}`} />
                  <span>Comment ?</span>
                </button>
                {isExpanded('memory') && (
                  <div className="text-sm text-primary/80 animate-fadeIn">
                    <p>Chaque jour, après votre dialogue (5 questions), l'IA <strong>synthétise vos échanges</strong> en un récit intime que vous pouvez valider et archiver.</p>
                  </div>
                )}
              </div>

              {/* Card 4 - Miroir */}
              <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300 space-y-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-serif tracking-wide">Un miroir pour mieux vous comprendre</h3>
                <p className="text-muted-foreground">
                  Orison voit vos forces, vos contradictions, vos zones d'ombre, mais toujours avec une <strong>lucidité douce</strong>. Découvrez chaque semaine une synthèse qui éclaire votre cheminement intérieur.
                </p>
                <button
                  onClick={() => toggleFeature('mirror')}
                  className="flex items-center gap-2 text-sm text-primary/80 hover:text-primary transition-colors group"
                >
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isExpanded('mirror') ? 'rotate-180' : ''}`} />
                  <span>Comment ?</span>
                </button>
                {isExpanded('mirror') && (
                  <div className="text-sm text-primary/80 animate-fadeIn">
                    <p>L'IA analyse l'évolution de vos pensées et émotions pour vous offrir un <strong>reflet juste et sans jugement</strong>, vous aidant à grandir.</p>
                  </div>
                )}
              </div>

              {/* Card 5 - Évolution */}
              <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300 space-y-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <Sprout className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-serif tracking-wide">Un Compagnon pour Votre Évolution</h3>
                <p className="text-muted-foreground">
                  Orison n'est pas juste un miroir figé, il <strong>accompagne votre cheminement</strong>. Il vous aide à voir comment vous changez, à reconnaître vos progrès et à aligner vos actions avec qui vous aspirez à devenir, jour après jour.
                </p>
                <button
                  onClick={() => toggleFeature('evolution')}
                  className="flex items-center gap-2 text-sm text-primary/80 hover:text-primary transition-colors group"
                >
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isExpanded('evolution') ? 'rotate-180' : ''}`} />
                  <span>Comment ?</span>
                </button>
                {isExpanded('evolution') && (
                  <div className="text-sm text-primary/80 animate-fadeIn">
                    <p>En reliant vos pensées et émotions au fil du temps, l'IA met en lumière votre <strong>parcours personnel</strong> et les transformations silencieuses qui s'opèrent en vous.</p>
                  </div>
                )}
              </div>

              {/* Card 6 - Héritage */}
              <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300 space-y-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <Gift className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-serif tracking-wide">Un héritage qui traverse le temps</h3>
                <p className="text-muted-foreground">
                  Ce que vous êtes, ce que vous apprenez, peut être transmis. Orison construit fidèlement votre <strong>double numérique</strong>, une trace vivante de votre voix et de vos valeurs pour vos proches.
                </p>
                <button
                  onClick={() => toggleFeature('legacy')}
                  className="flex items-center gap-2 text-sm text-primary/80 hover:text-primary transition-colors group"
                >
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isExpanded('legacy') ? 'rotate-180' : ''}`} />
                  <span>Comment ?</span>
                </button>
                {isExpanded('legacy') && (
                  <div className="text-sm text-primary/80 animate-fadeIn">
                    <p>Au fil des mois, l'IA apprend votre <strong>style unique</strong> pour préparer cet héritage immatériel, que vous pourrez choisir de partager.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Security Section */}
        <section className="py-32 bg-muted/30 relative overflow-hidden border-y border-primary/5">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent,var(--primary-light),transparent)] opacity-5"></div>
          <div className="container relative">
            <div className="max-w-3xl mx-auto space-y-16">
              <div className="flex items-center gap-4">
                <Lock className="w-8 h-8 text-primary" />
                <h2 className="text-4xl font-serif tracking-wide">Votre Intimité, Notre Priorité Absolue</h2>
              </div>
              
              <div className="space-y-8 text-muted-foreground">
                <p className="text-lg">
                  Votre confiance est le fondement d'Orison. Nous avons conçu cet espace pour qu'il soit votre sanctuaire personnel, inviolable.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <Key className="w-6 h-6 text-primary mt-1" />
                    <div>
                      <h3 className="text-xl font-serif mb-2">Votre Clé Privée Unique</h3>
                      <p>
                        Dès votre première utilisation, une clé secrète unique est générée (ex: orison-A7kL9xZ). Elle n'est visible qu'une seule fois : vous seul la détenez. Vous devez la noter et la conserver en lieu sûr.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Shield className="w-6 h-6 text-primary mt-1" />
                    <div>
                      <h3 className="text-xl font-serif mb-2">Chiffrement Robuste</h3>
                      <p>
                        Chaque souvenir, chaque pensée, chaque synthèse est immédiatement chiffré avec votre clé privée avant d'être stocké, en utilisant un algorithme puissant (AES-256). Les données deviennent illisibles sans votre clé.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Eye className="w-6 h-6 text-primary mt-1" />
                    <div>
                      <h3 className="text-xl font-serif mb-2">Contrôle Total de l'Accès</h3>
                      <p>
                        Pour relire votre mémoire ou continuer votre dialogue, votre clé privée est indispensable. Elle déchiffre vos données temporairement, uniquement pour vous, au moment où vous en avez besoin.
                      </p>
                    </div>
                  </div>

                  <div className="bg-white/50 p-6 rounded-lg border border-primary/10">
                    <h3 className="text-xl font-serif mb-4">La Promesse Orison</h3>
                    <p>
                      Le résultat est simple : personne d'autre que vous ne peut accéder à votre espace Orison. Ni Vizionnaire, ni l'IA seule, ni aucun tiers. C'est votre espace, totalement confidentiel. Si vous perdez votre clé, même nous ne pouvons récupérer vos données.
                    </p>
                    <p className="mt-4">
                      C'est notre engagement pour une technologie respectueuse de votre être le plus profond.
                    </p>
                    <Link href="/documentation" className="inline-block mt-4 text-primary hover:text-primary/80">
                      Pour plus de détails techniques, consultez notre page Documentation →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Summary Section */}
        <section className="py-32 bg-muted/30 relative overflow-hidden border-y border-primary/5">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent,var(--primary-light),transparent)] opacity-5"></div>
          <div className="container relative">
            <div className="max-w-3xl mx-auto space-y-16">
              <h2 className="text-4xl font-serif tracking-wide">Orison en quelques mots...</h2>
              <blockquote className="text-3xl font-serif italic tracking-wide space-y-8 border-l-4 border-primary/20 pl-8 py-4">
                <p>Un espace intime dans un monde trop bruyant.</p>
                <p>Un témoin discret dans une époque de performance.</p>
                <p>Un souffle de mémoire dans un monde d'oubli.</p>
                <p>Un héritage vivant dans une civilisation amnésique.</p>
                <p>Une voix intérieure… qui reste, quand tout s'éteint.</p>
              </blockquote>
            </div>
          </div>
        </section>

        {/* Chat Interface */}
        <section id="chat-interface" className="py-32 bg-background relative overflow-hidden border-b border-primary/5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--primary-light)_0%,transparent_75%)] opacity-5"></div>
          <div className="container relative">
            <div className="max-w-3xl mx-auto text-center space-y-12">
              <h2 className="text-4xl font-serif tracking-wide">Prêt à explorer votre voix intérieure ?</h2>
              <p className="text-xl text-muted-foreground font-light tracking-wide italic">
                Tu n'as rien à prouver.<br />
                Orison t'écoute.
              </p>
              <div className="flex flex-col items-center gap-8">
                <Link href="/journal" className="w-full max-w-md">
                  <Button 
                    className="w-full gap-3 py-6 text-lg relative overflow-hidden group bg-primary/90 hover:bg-primary transition-all duration-500 text-primary-foreground"
                  >
                    <Heart className="h-5 w-5 group-hover:scale-110 transition-transform duration-500" />
                    <span className="relative z-10">Commencer gratuitement</span>
                  </Button>
                </Link>
                <p className="text-sm text-muted-foreground font-light">
                  Version gratuite - Aucune carte bancaire requise
                </p>
              </div>
              <ChatInterface />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-primary/10 py-16 bg-background">
        <div className="container">
          <div className="flex flex-col items-center justify-center gap-8 text-center">
            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12">
                  <Image
                    src="/images/logo.png"
                    alt="Vizionnaire Logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="text-2xl font-serif tracking-wide">
                  Vizionnaire
                </span>
              </div>
              <p className="text-sm text-muted-foreground text-center font-light tracking-wide max-w-md mx-auto">
                Un sanctuaire pour votre mémoire. Un espace intime de transmission.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

