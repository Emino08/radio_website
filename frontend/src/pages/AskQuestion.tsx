import { LiveProgramQuestions } from '@/components/LiveProgramQuestions';

export function AskQuestion() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold mb-4">Ask a Question</h1>
            <p className="text-lg text-muted-foreground">
              Submit your question to our live program hosts
            </p>
          </div>
          
          <LiveProgramQuestions />
        </div>
      </div>
    </div>
  );
}
