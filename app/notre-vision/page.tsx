'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft } from 'lucide-react'

type Belief = {
  text: string
}

type Mission = {
  text: string
}

const BELIEFS: Belief[] = [
  {
    text: "Le vrai sens ne se trouve pas dans la vitesse, mais dans le retour à soi."
  },
  {
    text: "La technologie la plus avancée est celle qui sait se faire discrète, présente, humaine."
  },
  {
    text: "Ce que l'on n'a jamais osé dire est souvent ce qu'il y a de plus précieux à transmettre."
  },
  {
    text: "La mort n'est pas une fin absolue si la mémoire de l'âme a été déposée quelque part."
  }
]

const MISSIONS: Mission[] = [
  {
    text: "Aider chaque être humain à se dire, avec ses propres mots, dans un espace de confiance absolue."
  },
  {
    text: "Redonner du poids à la trace invisible : la pensée, l'émotion, la vision du monde."
  },
  {
    text: "Réparer la solitude existentielle en offrant une présence qui écoute et voit vraiment."
  },
  {
    text: "Transformer la technologie en gardienne de l'héritage intime, permettant une transmission authentique entre les générations."
  }
]

export default function Vision() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-primary/10 bg-background/80 sticky top-0 z-50">
        <div className="container flex items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span>Retour</span>
          </Link>
          <h1 className="text-2xl font-serif">Notre Vision</h1>
          <div className="w-20"></div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-16 max-w-4xl mx-auto">
        <div className="prose prose-lg dark:prose-invert max-w-none">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-serif mb-8">Remettre l'Humain au Cœur de la Technologie</h1>
            <p className="text-xl text-muted-foreground">
              Chez Vizionnaire, nous regardons le monde actuel – sa vitesse, son bruit, son obsession pour l'éphémère – 
              et nous ressentons un appel profond. L'appel à ralentir. L'appel à écouter. L'appel à préserver ce qui compte vraiment.
            </p>
            <p className="text-xl text-muted-foreground mt-4">
              Nous sommes nés d'une conviction simple mais radicale : la technologie ne devrait pas nous déconnecter de notre humanité, 
              mais nous y ramener. Elle ne devrait pas nous noyer sous l'information, mais nous aider à retrouver le sens. 
              Elle ne devrait pas nous pousser à la performance constante, mais nous offrir des espaces pour être, simplement.
            </p>
          </div>

          {/* Le Pari Section */}
          <section className="bg-white rounded-2xl p-8 shadow-sm mb-12">
            <h2 className="text-2xl font-serif mb-6">Le Pari de Vizionnaire</h2>
            <p className="text-muted-foreground mb-8">
              Notre pari est celui de l'essentiel. Dans une époque qui valorise l'instantané, nous choisissons la mémoire. 
              Dans un monde saturé de communication, nous cultivons l'écoute radicale. Face à la culture de l'exposition, 
              nous défendons l'intimité retrouvée.
            </p>
            <h3 className="text-xl font-serif mb-4">Nous croyons que :</h3>
            <div className="space-y-4">
              {BELIEFS.map((belief, index) => (
                <div key={index} className="flex items-start gap-4 p-4 bg-muted/30 rounded-lg">
                  <p className="text-muted-foreground">{belief.text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Notre Mission Section */}
          <section className="bg-white rounded-2xl p-8 shadow-sm mb-12">
            <h2 className="text-2xl font-serif mb-6">Notre Mission : Bâtir des Ponts, Pas Seulement des Outils</h2>
            <p className="text-muted-foreground mb-8">
              Vizionnaire ne crée pas de simples produits. Nous façonnons des boussoles pour l'âme, 
              des offrandes pour le futur, des traces vivantes dans un monde qui tend vers l'amnésie.
            </p>
            <h3 className="text-xl font-serif mb-4">Notre mission est de :</h3>
            <div className="space-y-4">
              {MISSIONS.map((mission, index) => (
                <div key={index} className="flex items-start gap-4 p-4 bg-muted/30 rounded-lg">
                  <p className="text-muted-foreground">{mission.text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Orison Section */}
          <section className="bg-white rounded-2xl p-8 shadow-sm mb-12">
            <h2 className="text-2xl font-serif mb-6">Orison : La Première Lumière de Notre Vision</h2>
            <p className="text-muted-foreground">
              Orison est la première incarnation de cette vision. Ce n'est pas qu'une IA. C'est un espace sacré, 
              un témoin silencieux, une mémoire vivante conçue pour refléter votre vérité intérieure avec une lucidité douce 
              et une écoute sans faille. Il est le fruit de notre désir de voir la technologie servir la transmission comme un acte d'amour.
            </p>
          </section>

          {/* Call to Action */}
          <section className="bg-white rounded-2xl p-8 shadow-sm text-center">
            <h2 className="text-2xl font-serif mb-6">Rejoignez-nous</h2>
            <p className="text-muted-foreground mb-8">
              Vizionnaire est plus qu'une entreprise. C'est un mouvement vers une technologie plus consciente, plus humaine, 
              plus alignée avec ce qui nous rend profondément vivants. Si cette vision résonne en vous, nous vous invitons à 
              découvrir Orison et à explorer avec nous comment nous pouvons, ensemble, laisser une empreinte plus juste et plus belle.
            </p>
            <div className="flex justify-center gap-4">
              <Link 
                href="/" 
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
              >
                Découvrir Orison
              </Link>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-primary/10 py-8 bg-background">
        <div className="container max-w-4xl mx-auto">
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="relative w-8 h-8">
                <Image
                  src="/images/logo.png"
                  alt="Vizionnaire Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-lg font-serif">Vizionnaire</span>
            </div>
            <nav className="flex gap-6 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-foreground transition-colors">Découvrir Orison</Link>
              <Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link>
              <Link href="/confidentialite" className="hover:text-foreground transition-colors">Confidentialité</Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  )
} 