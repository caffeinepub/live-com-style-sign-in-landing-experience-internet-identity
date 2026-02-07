import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';
import { queryClient } from '../queryClient';

export default function SignedInHeader() {
  const { identity, clear } = useInternetIdentity();
  const navigate = useNavigate();

  const handleSignOut = () => {
    queryClient.clear();
    clear();
    navigate({ to: '/' });
  };

  const principal = identity?.getPrincipal().toString();
  const shortPrincipal = principal ? `${principal.slice(0, 8)}...${principal.slice(-6)}` : '';

  return (
    <header className="border-b border-border/40 bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <img 
            src="/assets/generated/app-mark.dim_512x512.png" 
            alt="App" 
            className="h-8 w-8"
          />
          <span className="text-sm text-muted-foreground">{shortPrincipal}</span>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleSignOut}
          className="gap-2"
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </Button>
      </div>
    </header>
  );
}
