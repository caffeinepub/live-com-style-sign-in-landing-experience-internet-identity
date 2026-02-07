import { useNavigate, useParams } from '@tanstack/react-router';
import { useEffect } from 'react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import SignedInHeader from '../components/SignedInHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { tiles } from '../app/tiles';

export default function TilePlaceholderPage() {
  const { tileId } = useParams({ strict: false });
  const navigate = useNavigate();
  const { identity, isInitializing } = useInternetIdentity();

  useEffect(() => {
    if (!isInitializing && (!identity || identity.getPrincipal().isAnonymous())) {
      navigate({ to: '/' });
    }
  }, [identity, isInitializing, navigate]);

  const tile = tiles.find(t => t.id === tileId);

  if (!tile) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-muted-foreground">App not found</p>
      </div>
    );
  }

  const handleBack = () => {
    navigate({ to: '/launcher' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <SignedInHeader />
      
      <main className="container mx-auto px-6 py-8">
        <Button 
          variant="ghost" 
          onClick={handleBack}
          className="mb-6 gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to launcher
        </Button>

        <div className="mx-auto max-w-2xl">
          <Card className="border-border/50 shadow-lg">
            <CardHeader className="space-y-4">
              <CardTitle className="text-3xl font-light">{tile.name}</CardTitle>
              <CardDescription className="text-base">
                {tile.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                This is a placeholder page for the {tile.name} app. In a full implementation, 
                this would contain the actual application interface and functionality.
              </p>
              <div className="rounded-lg bg-muted/50 p-6 text-center">
                <p className="text-sm text-muted-foreground">
                  App content would appear here
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
