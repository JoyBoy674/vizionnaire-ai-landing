import React, { useState } from 'react';
import { ArrowLeft, Check, ChevronDown, Loader2, Save } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

const JournalInterface: React.FC = () => {
  const [mood, setMood] = useState('');
  const [purpose, setPurpose] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simuler une soumission
    setTimeout(() => {
      setIsLoading(false);
      // Ici, vous devriez soumettre les données à votre backend
    }, 2000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-primary/10 bg-background/80 sticky top-0 z-50">
        <div className="container flex items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span>Retour</span>
          </Link>
          <h1 className="text-xl font-serif">Votre journal intime</h1>
          <div className="w-20"></div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden">
        <div className="container max-w-2xl mx-auto py-8">
          <div className="space-y-8">
            {/* Question 1 */}
            <div className="space-y-4">
              <h2 className="text-lg font-medium">1. Quelle est la météo de ton monde intérieur aujourd'hui ?</h2>
              <p className="text-sm text-muted-foreground">Tu peux écrire ton humeur avec tes mots, ou choisir une proposition.</p>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 p-3 border rounded-lg hover:bg-muted/50 cursor-pointer">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Serein(e) - Je me sens tranquille, posé(e).</span>
                </div>
                <div className="flex items-center gap-2 p-3 border rounded-lg hover:bg-muted/50 cursor-pointer">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Fatigué(e) - Physiquement ou mentalement vidé(e).</span>
                </div>
                <div className="flex items-center gap-2 p-3 border rounded-lg hover:bg-muted/50 cursor-pointer">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Anxieux(se) - Le futur ou le présent me pèse.</span>
                </div>
                <div className="flex items-center gap-2 p-3 text-muted-foreground">
                  <ChevronDown className="h-4 w-4" />
                  <span>Voir plus : Triste, Énergique, En colère, Amoureux(se), Indéfini(e)...</span>
                </div>
              </div>

              <Textarea
                placeholder="Exemple : Je me sens flottant, confus mais calme."
                className="min-h-[100px]"
                value={mood}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setMood(e.target.value)}
              />
            </div>

            {/* Question 2 */}
            <div className="space-y-4">
              <h2 className="text-lg font-medium">2. Qu'est-ce qui t'amène ici aujourd'hui ?</h2>
              <p className="text-sm text-muted-foreground">Tu peux dire ce que tu veux faire ici aujourd'hui, ou bien choisir un mot qui te parle.</p>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 p-3 border rounded-lg hover:bg-muted/50 cursor-pointer">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Juste être là - Sans attente précise, mais en lien.</span>
                </div>
                <div className="flex items-center gap-2 p-3 border rounded-lg hover:bg-muted/50 cursor-pointer">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Me comprendre - Explorer un peu plus qui je suis.</span>
                </div>
                <div className="flex items-center gap-2 p-3 border rounded-lg hover:bg-muted/50 cursor-pointer">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Créer un souvenir - Garder une trace de cette journée.</span>
                </div>
                <div className="flex items-center gap-2 p-3 text-muted-foreground">
                  <ChevronDown className="h-4 w-4" />
                  <span>Voir plus : Déposer un ressenti, Guérir un peu, Trouver du sens, Rêver ou projeter...</span>
                </div>
              </div>

              <Textarea
                placeholder="Exemple : J'ai juste besoin d'un moment à moi."
                className="min-h-[100px]"
                value={purpose}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setPurpose(e.target.value)}
              />
            </div>

            {/* Option bonus */}
            <div className="flex items-center gap-2 p-3 border rounded-lg hover:bg-muted/50 cursor-pointer">
              <Check className="h-4 w-4 text-primary" />
              <span>Je ne sais pas trop.</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <div className="border-t border-primary/10 bg-background/80 sticky bottom-0">
        <div className="container max-w-2xl mx-auto py-4">
          <Button 
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Enregistrement...</span>
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                <span>Enregistrer</span>
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JournalInterface; 