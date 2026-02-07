import { useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import SignedInHeader from '../components/SignedInHeader';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Search } from 'lucide-react';
import { tiles } from '../app/tiles';
import { useUserRecord } from '../queries/userQueries';
import { useAuthRefresh } from '../hooks/useAuthRefresh';

export default function LauncherPage() {
  const { identity, isInitializing } = useInternetIdentity();
  const navigate = useNavigate();
  const { data: userRecord, isLoading } = useUserRecord();
  
  useAuthRefresh();

  useEffect(() => {
    if (!isInitializing && (!identity || identity.getPrincipal().isAnonymous())) {
      navigate({ to: '/' });
    }
  }, [identity, isInitializing, navigate]);

  const handleTileClick = (tileId: string) => {
    navigate({ to: '/app/$tileId', params: { tileId } });
  };

  const formatDate = (timestamp: bigint) => {
    const date = new Date(Number(timestamp) / 1_000_000);
    return date.toLocaleString('en-US', { 
      dateStyle: 'medium', 
      timeStyle: 'short' 
    });
  };

  if (isInitializing) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <SignedInHeader />
      
      <main className="container mx-auto px-6 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative mx-auto max-w-2xl">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search apps and services"
              className="h-14 pl-12 text-base shadow-sm"
            />
          </div>
        </div>

        {/* User Info */}
        {!isLoading && userRecord && (
          <div className="mb-6 text-center text-sm text-muted-foreground">
            Last login: {formatDate(userRecord[1])}
          </div>
        )}

        {/* App Grid */}
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-6 text-xl font-light text-foreground">Your apps</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
            {tiles.map((tile, index) => {
              const iconSize = 512 / 4;
              const row = Math.floor(index / 4);
              const col = index % 4;
              const bgPosition = `-${col * iconSize}px -${row * iconSize}px`;

              return (
                <Card
                  key={tile.id}
                  className="group cursor-pointer border-border/50 transition-all hover:scale-105 hover:shadow-lg"
                  onClick={() => handleTileClick(tile.id)}
                >
                  <CardContent className="flex flex-col items-center gap-3 p-6">
                    <div 
                      className="h-16 w-16 opacity-70 transition-opacity group-hover:opacity-100"
                      style={{
                        backgroundImage: 'url(/assets/generated/tile-icons.dim_512x512.png)',
                        backgroundPosition: bgPosition,
                        backgroundSize: '512px 512px'
                      }}
                    />
                    <span className="text-center text-sm font-medium text-foreground">
                      {tile.name}
                    </span>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
