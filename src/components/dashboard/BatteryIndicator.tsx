import { Battery, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

type BatteryIndicatorProps = {
  batteryLevel: number;
  estimatedRange: number;
};

export function BatteryIndicator({ batteryLevel, estimatedRange }: BatteryIndicatorProps) {
  const isLowBattery = batteryLevel < 20;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg">Battery</CardTitle>
        <Battery className={`h-6 w-6 ${isLowBattery ? 'text-destructive' : 'text-primary'}`} />
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4">
          <div className="text-3xl font-bold font-headline">{batteryLevel.toFixed(0)}%</div>
          <Progress value={batteryLevel} className={isLowBattery ? '[&>div]:bg-destructive' : '[&>div]:bg-primary'} />
        </div>
        <p className="text-sm text-muted-foreground mt-2">Estimated Range: {estimatedRange.toFixed(1)} km</p>
        {isLowBattery && (
          <div className="mt-4 flex items-center gap-2 text-destructive p-2 rounded-md bg-destructive/10">
            <AlertTriangle className="h-5 w-5" />
            <p className="text-sm font-semibold">Low Battery Alert!</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
