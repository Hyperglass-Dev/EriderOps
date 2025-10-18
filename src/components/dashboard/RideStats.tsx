import { Clock, Milestone, Mountain } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type RideStatsProps = {
  distance: number;
  time: number;
  elevation: number;
};

export function RideStats({ distance, time, elevation }: RideStatsProps) {
  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const s = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <StatCard icon={<Milestone />} title="Distance" value={`${distance.toFixed(2)} km`} />
      <StatCard icon={<Clock />} title="Time" value={formatTime(time)} />
      <StatCard icon={<Mountain />} title="Elevation" value={`${elevation.toFixed(1)} m`} />
    </div>
  );
}

function StatCard({ icon, title, value }: { icon: React.ReactNode; title: string; value: string }) {
  return (
    <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <div className="h-4 w-4 text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold font-headline">{value}</div>
      </CardContent>
    </Card>
  );
}
