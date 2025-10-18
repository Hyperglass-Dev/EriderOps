import { Speedometer } from './Speedometer';
import { RideStats } from './RideStats';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { LogOut, Zap } from 'lucide-react';

type HeaderProps = {
  speed: number;
  distance: number;
  time: number;
  elevation: number;
};

export function Header({ speed, distance, time, elevation }: HeaderProps) {
  const { logout } = useAuth();

  return (
    <header className="p-4 bg-transparent">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Zap className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-headline font-bold">E-RiderOps</h1>
        </div>
        <Button variant="ghost" size="sm" onClick={() => logout()}>
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <Speedometer speed={speed} />
        </div>
        <div className="lg:col-span-3">
          <RideStats distance={distance} time={time} elevation={elevation} />
        </div>
      </div>
    </header>
  );
}
