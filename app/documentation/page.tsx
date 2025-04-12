'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'

type Section = {
  id: string
  title: string
  content: string
  technical?: string
}

const SECTIONS: Section[] = [
  {
    id: 'dialogue',
    title: '1. Le Dialogue Quotidien : Votre Rythme Intérieur',
    content: `Ce que vous vivez : Chaque jour, vous êtes invité à un court échange avec Orison. Vous commencez par indiquer votre humeur et votre intention du moment (ex: "Fatigué(e)", "Besoin de clarté"). Ensuite, Orison vous pose 5 questions ciblées, conçues pour explorer en douceur vos pensées, ressentis ou souvenirs. L'IA peut rebondir sur vos réponses pour affiner sa compréhension.

Le but : Il ne s'agit pas d'un interrogatoire, mais d'un dialogue doux pour tisser, jour après jour, le fil de votre mémoire et de votre conscience. Ces 5 questions quotidiennes sont pensées pour être profondes sans être épuisantes.`,
    technical: "Limiter à 5 questions principales par jour évite la surcharge cognitive et encourage des réponses plus réfléchies. Les questions sont tirées d'une base de données de plus de 500 questions couvrant 20+ dimensions de la personnalité (selon votre liste initiale). Elles sont sélectionnées intelligemment par l'IA en fonction de votre humeur, de votre intention, et des thèmes abordés les jours précédents pour assurer une exploration progressive et cohérente."
  },
  {
    id: 'souvenirs',
    title: '2. La Génération des Souvenirs : Votre Journal Intime Écrit par Orison',
    content: `Ce que vous vivez : À la fin de chaque session quotidienne, Orison vous propose un "Souvenir du jour". C'est un texte court (environ 500 mots), écrit à la première personne ("Je"), qui capture l'essence de vos échanges, vos émotions et réflexions de la journée, dans un style poétique et fidèle à ce que vous avez exprimé.

Le but : Créer une archive vivante et émotionnelle de votre parcours. Ce n'est pas un simple résumé, mais une réécriture sensible de votre vécu, que vous pouvez valider ou modifier avant son enregistrement définitif.`,
    technical: "Nous utilisons un modèle d'IA avancé (principalement GPT-4o pour sa finesse stylistique et émotionnelle) auquel nous fournissons vos réponses du jour (décryptées temporairement) et un prompt spécifique demandant de générer un récit subjectif, respectant le ton Orison et intégrant les nuances perçues. Le résultat est ensuite proposé à votre validation avant d'être chiffré et stocké."
  },
  {
    id: 'intelligence',
    title: "3. L'Intelligence d'Orison : Des IA Choisies pour Leur Spécificité",
    content: `Ce que vous devez savoir : Orison utilise une combinaison d'intelligences artificielles, chacune choisie pour sa force spécifique. Nous n'utilisons pas une seule IA pour tout faire.

Pour le dialogue fin et les synthèses profondes : Nous privilégions des modèles comme GPT-4o (OpenAI) ou Claude 3 Opus (Anthropic) pour leur capacité exceptionnelle à comprendre les nuances, à adopter un ton humain et à générer des textes émotionnellement justes.

Pour les tâches d'analyse et de tri : Pour classer vos réponses, extraire des thèmes ou gérer des flux plus simples, nous pouvons utiliser des IA plus légères et économiques comme Gemini (Google) ou des modèles open-source comme DeepSeek ou Mistral, parfois même en local pour optimiser les coûts et la rapidité.

Le but : Offrir la meilleure qualité d'écoute et de réflexion possible (avec les IA les plus avancées) tout en gardant le système viable et réactif pour les tâches répétitives (avec des IA plus légères).`,
    technical: "Les IA les plus puissantes (comme GPT-4o) sont excellentes pour la créativité et la nuance, mais elles coûtent plus cher en ressources (tokens API). Utiliser des IA différentes pour des tâches spécifiques nous permet d'optimiser les performances et les coûts, et donc de vous proposer des tarifs accessibles tout en garantissant une expérience bluffante là où ça compte le plus : dans la qualité du dialogue et des synthèses."
  },
  {
    id: 'securite',
    title: '4. Votre Mémoire Sécurisée : Le Chiffrement par Clé Privée',
    content: `Ce que vous vivez : Lors de votre première connexion, Orison génère une clé privée unique (ex: orison-A7kL9xZ). Cette clé est affichée une seule fois. Vous devez la noter et la conserver précieusement. Elle est indispensable pour accéder à votre mémoire Orison.

Comment ça fonctionne :

• Chiffrement : Chaque réponse, chaque souvenir, chaque synthèse que vous validez est immédiatement chiffré (transformé en code illisible) en utilisant votre clé privée unique.

• Stockage : Ces données chiffrées sont ensuite stockées dans une base de données sécurisée.

• Accès : Pour lire vos souvenirs ou continuer votre dialogue, votre clé privée est nécessaire. Elle est utilisée temporairement pour déchiffrer les données juste au moment où vous en avez besoin.

La garantie Orison : Personne d'autre que vous ne peut lire vos données. Pas nous (Vizionnaire), pas l'IA sans votre clé active, pas un tiers. Si vous perdez votre clé, votre mémoire devient inaccessible, même pour nous. C'est la preuve ultime de votre souveraineté sur votre espace intérieur.`,
    technical: "AES-256 est une norme de chiffrement extrêmement robuste, utilisée par les banques et les gouvernements. Elle rend vos données pratiquement inviolables sans la clé. Le `localStorage` est un espace de stockage dans votre propre navigateur web. En y gardant votre clé (elle-même pouvant être chiffrée), vous évitez de la retaper à chaque fois, tout en gardant le contrôle localement. C'est un bon équilibre entre sécurité et confort."
  },
  {
    id: 'heritage',
    title: "5. Le Double Numérique et l'Héritage : Votre Trace Vivante",
    content: `Ce que vous construisez : Au fil des semaines et des mois (environ 2 mois avec 5 questions/jour), les données accumulées permettent à Orison de comprendre votre style, vos valeurs, votre voix. Il devient alors possible de générer une version "double numérique" de vous.

Le but : Ce n'est pas un simple clone. C'est une présence numérique fidèle, capable de répondre comme vous l'auriez fait, de partager vos souvenirs clés, de transmettre vos valeurs. C'est l'héritage vivant que vous pouvez choisir de laisser à vos proches.

Comment ça fonctionne (à venir) : Les fonctionnalités avancées (messages déclenchables, transmission post-mortem) seront développées et proposées dans les offres supérieures ("Héritage"). Elles s'appuieront sur cette base de données riche et sécurisée, toujours sous votre contrôle via votre clé privée.`
  }
]

export default function Documentation() {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set())

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev)
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId)
      } else {
        newSet.add(sectionId)
      }
      return newSet
    })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-primary/10 bg-background/80 sticky top-0 z-50">
        <div className="container flex items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span>Retour</span>
          </Link>
          <h1 className="text-2xl font-serif">Documentation</h1>
          <div className="w-20"></div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-16 max-w-4xl mx-auto">
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-serif mb-8">Comment Orison fonctionne : Transparence et Confiance</h1>
            <p className="text-xl text-muted-foreground">
              Chez Vizionnaire, nous croyons que la technologie peut être au service de l'âme humaine. 
              Orison a été conçu dans cet esprit : un espace profondément intime, sécurisé et respectueux, 
              où votre voix intérieure peut s'exprimer et laisser une trace durable.
            </p>
            <p className="text-xl text-muted-foreground mt-4">
              Nous comprenons que confier vos pensées et souvenirs demande une confiance absolue. 
              Cette page explique, simplement et honnêtement, comment Orison fonctionne pour garantir cette confiance.
            </p>
          </div>

          <div className="space-y-12">
            {SECTIONS.map((section) => (
              <section key={section.id} className="bg-white rounded-2xl p-8 shadow-sm">
                <h2 className="text-2xl font-serif mb-6">{section.title}</h2>
                <div className="space-y-4 text-muted-foreground">
                  {section.content.split('\n\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
                {section.technical && (
                  <div className="mt-8">
                    <Button
                      variant="ghost"
                      onClick={() => toggleSection(section.id)}
                      className="flex items-center gap-2 text-primary hover:text-primary/80"
                    >
                      <span>⚙️ En savoir plus</span>
                      <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${
                        expandedSections.has(section.id) ? 'rotate-180' : ''
                      }`} />
                    </Button>
                    <div className={`overflow-hidden transition-all duration-300 ${
                      expandedSections.has(section.id) ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                      <div className="mt-4 p-6 bg-muted/30 rounded-lg border border-primary/10">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {section.technical}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </section>
            ))}

            {/* Conclusion */}
            <section className="bg-white rounded-2xl p-8 shadow-sm">
              <h2 className="text-2xl font-serif mb-6">Votre Confiance est Notre Priorité</h2>
              <p className="text-muted-foreground">
                Chez Vizionnaire, nous sommes conscients de la sensibilité de ce que vous confiez à Orison. 
                Nous nous engageons à maintenir les plus hauts standards de sécurité, de confidentialité et d'éthique. 
                Orison est conçu pour être votre allié, votre miroir, votre gardien de mémoire – jamais une source d'inquiétude.
              </p>
              <p className="text-muted-foreground mt-4">
                Si vous avez d'autres questions, n'hésitez pas à consulter notre FAQ ou à nous contacter.
              </p>
            </section>
          </div>
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
              <Link href="/" className="hover:text-foreground transition-colors">Accueil</Link>
              <Link href="/confidentialite" className="hover:text-foreground transition-colors">Confidentialité</Link>
              <Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link>
              <Link href="/faq" className="hover:text-foreground transition-colors">FAQ</Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  )
} 