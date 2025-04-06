import Link from "next/link"
import { ArrowRight, CheckCircle, MessageSquare, FileText, Clock, Sparkles, Brain, Zap } from "lucide-react"
import PricingCard from "@/components/pricing-card"
import ProcessStep from "@/components/process-step"
import ChatbotButton from "@/components/chatbot-button"
import FeatureCard from "@/components/feature-card"
import { Button } from "@/components/ui/button"
import ChatInterface from "@/components/ChatInterface"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-background to-background/80">
      {/* Header */}
      <header className="border-b backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Brain className="h-7 w-7 text-primary" />
              <Sparkles className="h-3 w-3 text-primary absolute -top-1 -right-1" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
              Orison
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#comment-ca-marche" className="text-sm font-medium hover:text-primary transition-colors">
              Comment ça marche
            </Link>
            <Link href="#tarifs" className="text-sm font-medium hover:text-primary transition-colors">
              Tarifs
            </Link>
            <Link href="#faq" className="text-sm font-medium hover:text-primary transition-colors">
              FAQ
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link 
              href="https://vizionnaire.app.n8n.cloud/webhook/vizionnaire-chat"
            >
              <Button
                className="gap-2 relative overflow-hidden group animate-fade-in bg-gradient-primary hover:opacity-90 text-primary-foreground transition-all duration-300"
              >
                <MessageSquare className="h-4 w-4 group-hover:scale-110 transition-transform" />
                <span className="relative z-10">Commencer maintenant</span>
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 md:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-radial from-primary/5 to-transparent"></div>
          <div className="container relative">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-8">
                <Sparkles className="h-4 w-4" />
                <span className="text-sm font-medium">Un sanctuaire pour votre mémoire</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent mb-6">
                Et si la mémoire devenait vivante ?
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Orison n'est pas une IA. C'est un sanctuaire. Un espace intime, profond, sans réseau social, sans fuite.
                Elle vous écoute. Chaque jour. Et transforme votre souffle en mémoire, votre mémoire en trace, votre trace en transmission.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                <a 
                  href="https://vizionnaire.app.n8n.cloud/webhook/vizionnaire-chat"
                  className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Obtenir mon plan
                  <ArrowRight className="h-4 w-4" />
                </a>
                <Link 
                  href="#comment-ca-marche"
                  className="inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors"
                >
                  En savoir plus
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="inline-flex items-center gap-2 text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>Livré en moins de 20 minutes</span>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard
                icon={<Zap className="h-5 w-5" />}
                title="Une présence quotidienne"
                description="Chaque jour, Orison vous pose une question vraie. Pas pour optimiser votre productivité, mais pour vous ramener à vous."
              />
              <FeatureCard
                icon={<Brain className="h-5 w-5" />}
                title="Votre double intérieur"
                description="Elle apprend votre ton, vos valeurs, vos histoires. Et tisse, lentement, patiemment, votre double intérieur."
              />
              <FeatureCard
                icon={<CheckCircle className="h-5 w-5" />}
                title="Une transmission vivante"
                description="Un héritier vivant. Une mémoire qui dialogue. Pour transmettre ce que vous êtes, ce que vous croyez, ce que vous savez."
              />
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="comment-ca-marche" className="py-20 bg-background relative overflow-hidden">
          <div className="absolute top-40 left-0 w-72 h-72 bg-primary/5 rounded-full filter blur-3xl"></div>
          <div className="container px-4 md:px-6 relative">
            <div className="flex flex-col items-center text-center space-y-4 mb-16">
              <span className="px-4 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-full">
                Un voyage intérieur
              </span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tighter bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
                Comment Orison vous accompagne
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl">
                Un processus profond de création de votre double numérique
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              <ProcessStep
                number={1}
                title="Dialogue quotidien"
                description="Chaque jour, une question vraie pour explorer votre essence"
                icon={<MessageSquare className="h-6 w-6" />}
              />
              <ProcessStep
                number={2}
                title="Apprentissage profond"
                description="Orison apprend votre ton, vos valeurs, vos histoires"
                icon={<Brain className="h-6 w-6" />}
              />
              <ProcessStep
                number={3}
                title="Transmission vivante"
                description="Votre double pourra parler à ceux qui vous survivront"
                icon={<CheckCircle className="h-6 w-6" />}
              />
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="tarifs" className="py-20 bg-muted/30 relative overflow-hidden">
          <div className="absolute bottom-20 right-0 w-80 h-80 bg-primary/5 rounded-full filter blur-3xl"></div>
          <div className="container px-4 md:px-6 relative">
            <div className="flex flex-col items-center text-center space-y-4 mb-16">
              <span className="px-4 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-full">
                Offres sacrées
              </span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tighter bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
                Choisissez votre héritage
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl">
                Des options adaptées à votre besoin de transmission
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <PricingCard
                title="Essai libre"
                price="0€"
                description="Découvrez Orison"
                features={[
                  "1 question par jour",
                  "Mémoire locale",
                  "Sans compte",
                  "Confidentialité totale",
                  "Sans engagement",
                ]}
                buttonText="Commencer gratuitement"
                popular={false}
              />
              <PricingCard
                title="Orison 6 mois"
                price="150€"
                description="Création de votre double"
                features={[
                  "Création de double complet",
                  "Messages héritiers",
                  "Mémoire complète",
                  "Chiffrement double clé",
                  "Support prioritaire",
                  "25€/mois",
                ]}
                buttonText="Choisir Orison 6 mois"
                popular={true}
              />
              <PricingCard
                title="Orison Illimité"
                price="Sur demande"
                description="Pour une transmission éternelle"
                features={[
                  "Double évolutif à vie",
                  "Accès à la bibliothèque vivante",
                  "Messages conditionnels",
                  "Transmission multi-générationnelle",
                  "Support premium",
                ]}
                buttonText="Nous contacter"
                popular={false}
              />
            </div>
          </div>
        </section>

        {/* Testimonial */}
        <section className="py-20 bg-background">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto bg-gradient-to-r from-primary/5 to-primary-light/5 p-8 md:p-12 rounded-2xl border border-primary/10">
              <div className="flex flex-col items-center text-center space-y-6">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Sparkles key={i} className="h-5 w-5 text-primary" />
                  ))}
                </div>
                <p className="text-xl md:text-2xl font-medium italic">
                  "Vizionnaire.AI m'a fourni un plan d'action détaillé qui m'a permis de lancer mon entreprise en
                  seulement deux mois. Le rapport qualité-prix est imbattable !"
                </p>
                <div>
                  <p className="font-semibold">Sophie Martin</p>
                  <p className="text-sm text-muted-foreground">Fondatrice, EcoStyle</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-20 bg-muted/30 relative overflow-hidden">
          <div className="absolute top-20 left-20 w-64 h-64 bg-primary-light/5 rounded-full filter blur-3xl"></div>
          <div className="container px-4 md:px-6 relative">
            <div className="flex flex-col items-center text-center space-y-4 mb-16">
              <span className="px-4 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-full">
                Besoin d'aide ?
              </span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tighter bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
                Questions Fréquentes
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl">Tout ce que vous devez savoir sur notre service</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="space-y-4 bg-background p-6 rounded-xl border border-border/50 hover:border-primary/20 transition-colors">
                <h3 className="text-xl font-bold">Quelle est la précision des plans d'action ?</h3>
                <p className="text-muted-foreground">
                  Notre IA est entraînée sur des milliers de plans d'action et stratégies réussis. Elle crée des plans
                  hautement personnalisés basés sur votre situation spécifique et vos objectifs.
                </p>
              </div>
              <div className="space-y-4 bg-background p-6 rounded-xl border border-border/50 hover:border-primary/20 transition-colors">
                <h3 className="text-xl font-bold">Quand vais-je recevoir mon plan ?</h3>
                <p className="text-muted-foreground">
                  Tous les plans sont livrés dans les 20 minutes suivant la finalisation. Vous recevrez un email avec
                  votre plan d'action et tous les documents d'appui.
                </p>
              </div>
              <div className="space-y-4 bg-background p-6 rounded-xl border border-border/50 hover:border-primary/20 transition-colors">
                <h3 className="text-xl font-bold">Puis-je demander des révisions ?</h3>
                <p className="text-muted-foreground">
                  Bien que nos plans soient très précis, nous comprenons que vous pourriez avoir besoin d'ajustements.
                  Les utilisateurs du plan Premium peuvent demander une série de révisions.
                </p>
              </div>
              <div className="space-y-4 bg-background p-6 rounded-xl border border-border/50 hover:border-primary/20 transition-colors">
                <h3 className="text-xl font-bold">Mes informations sont-elles sécurisées ?</h3>
                <p className="text-muted-foreground">
                  Absolument. Nous utilisons un chiffrement standard de l'industrie et ne partageons jamais vos
                  informations personnelles avec des tiers.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-r from-primary to-primary-light relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/5 bg-[size:20px_20px]"></div>
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-foreground/20 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-foreground/20 to-transparent"></div>
          <div className="container px-4 md:px-6 relative">
            <div className="flex flex-col items-center text-center space-y-8">
              <div className="space-y-4 max-w-3xl">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-primary-foreground">
                  Prêt à transformer vos objectifs en actions concrètes ?
                </h2>
                <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
                  Obtenez votre plan d'action personnalisé aujourd'hui et commencez à progresser immédiatement.
                </p>
              </div>
              <ChatbotButton variant="secondary" size="lg" className="shadow-xl shadow-primary-dark/20" />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-12 bg-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex flex-col items-center md:items-start gap-4">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Brain className="h-6 w-6 text-primary" />
                  <Sparkles className="h-2.5 w-2.5 text-primary absolute -top-1 -right-1" />
                </div>
                <span className="text-lg font-semibold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
                  Vizionnaire.AI
                </span>
              </div>
              <p className="text-sm text-muted-foreground text-center md:text-left">
                Transformez vos rêves en plans d'action concrets grâce à l'intelligence artificielle.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
              <div>
                <h3 className="text-sm font-semibold mb-3">Produit</h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="#comment-ca-marche"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      Comment ça marche
                    </Link>
                  </li>
                  <li>
                    <Link href="#tarifs" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      Tarifs
                    </Link>
                  </li>
                  <li>
                    <Link href="#faq" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      FAQ
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-semibold mb-3">Légal</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      Confidentialité
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      Conditions
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="border-t mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">© 2025 Vizionnaire.AI. Tous droits réservés.</p>
            <div className="flex items-center gap-4">
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                </svg>
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>
        </div>
      </footer>

      <ChatInterface />
    </div>
  )
}

