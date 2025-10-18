import { Gauge } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type SpeedometerProps = {
  speed: number;
};

export function Speedometer({ speed }: SpeedometerProps) {
  return (
    <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">Speed</CardTitle>
        <Gauge className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-5xl font-bold font-headline text-primary-foreground">
          {speed.toFixed(1)} <span className="text-xl font-body text-muted-foreground">km/h</span>
        </div>
      </CardContent>
    </Card>
  );
}
