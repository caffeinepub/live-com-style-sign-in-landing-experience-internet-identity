import { useState } from 'react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import DisclaimerBanner from '../components/DisclaimerBanner';
import { Loader2 } from 'lucide-react';

export default function LandingPage() {
  const { login, isLoggingIn, isLoginError, loginError } = useInternetIdentity();
  const [inputValue, setInputValue] = useState('');

  const handleNext = () => {
    login();
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: 'url(/assets/generated/signin-bg.dim_1920x1080.png)' }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background/90" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-md px-6">
        <div className="mb-8 flex flex-col items-center gap-4">
          <img 
            src="/assets/generated/app-mark.dim_512x512.png" 
            alt="App Logo" 
            className="h-16 w-16"
          />
          <h1 className="text-2xl font-light tracking-wide text-foreground">Sign in</h1>
        </div>

        <Card className="border-border/50 shadow-lg backdrop-blur-sm">
          <CardHeader className="space-y-4 pb-4">
            <DisclaimerBanner />
          </CardHeader>
          <CardContent className="space-y-6 pt-2">
            <div className="space-y-2">
              <Input
                type="text"
                placeholder="Email, phone, or Skype"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={isLoggingIn}
                className="h-12 text-base"
              />
            </div>

            {isLoginError && (
              <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                {loginError?.message || 'Sign in failed. Please try again.'}
              </div>
            )}

            <div className="space-y-3">
              <Button 
                onClick={handleNext}
                disabled={isLoggingIn}
                className="h-12 w-full text-base font-medium"
              >
                {isLoggingIn ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  'Next'
                )}
              </Button>
              
              <Button 
                variant="ghost" 
                className="h-12 w-full text-base"
                disabled={isLoggingIn}
              >
                Sign-in options
              </Button>
            </div>

            <div className="space-y-4 pt-4 text-center text-sm text-muted-foreground">
              <a href="#" className="block hover:underline">
                Can't access your account?
              </a>
              <div className="flex items-center justify-center gap-4">
                <a href="#" className="hover:underline">Terms of use</a>
                <span>·</span>
                <a href="#" className="hover:underline">Privacy</a>
              </div>
            </div>
          </CardContent>
        </Card>

        <footer className="mt-8 text-center text-xs text-muted-foreground">
          © 2026. Built with love using{' '}
          <a 
            href="https://caffeine.ai" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:underline"
          >
            caffeine.ai
          </a>
        </footer>
      </div>
    </div>
  );
}
