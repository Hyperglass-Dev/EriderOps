import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

export function CrashDetectionModal({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) {
  const handleEmergencyCall = () => {
    window.location.href = "tel:000";
    onOpenChange(false);
  };
  
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-destructive font-headline text-2xl">Crash Detected!</AlertDialogTitle>
          <AlertDialogDescription>
            We've detected a potential crash. Are you okay? An emergency call will be initiated automatically if you don't respond.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>I'm OK</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button onClick={handleEmergencyCall} className="bg-destructive hover:bg-destructive/80">
              Call Emergency Services
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
