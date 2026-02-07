import { Alert, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';

export default function DisclaimerBanner() {
  return (
    <Alert className="border-muted-foreground/20 bg-muted/30">
      <Info className="h-4 w-4" />
      <AlertDescription className="text-sm">
        Demo sign-in experience. This is not affiliated with or endorsed by Microsoft Corporation.
      </AlertDescription>
    </Alert>
  );
}
