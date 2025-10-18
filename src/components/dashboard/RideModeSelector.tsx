'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Zap, Sparkles } from 'lucide-react';

export type RideMode = 'directions' | 'just-ride' | 'ai-pick';

type RideModeSelectorProps = {
  selectedMode: RideMode;
  onSelectMode: (mode: RideMode) => void;
  disabled?: boolean;
};

export function RideModeSelector({ selectedMode, onSelectMode, disabled }: RideModeSelectorProps) {
  const modes = [
    {
      id: 'directions' as RideMode,
      label: 'Directions',
      description: 'Navigate to a destination',
      icon: MapPin,
    },
    {
      id: 'just-ride' as RideMode,
      label: 'Just Ride',
      description: 'Free-ride mode',
      icon: Zap,
    },
    {
      id: 'ai-pick' as RideMode,
      label: 'AI Pick Destination',
      description: 'Let AI choose your route',
      icon: Sparkles,
    },
  ];

  return (
    <Card>
      <CardContent className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {modes.map((mode) => (
            <Button
              key={mode.id}
              variant={selectedMode === mode.id ? 'default' : 'outline'}
              className="h-auto flex flex-col items-center gap-2 p-4"
              onClick={() => onSelectMode(mode.id)}
              disabled={disabled}
            >
              <mode.icon className="h-6 w-6" />
              <div className="text-center">
                <div className="font-semibold">{mode.label}</div>
                <div className="text-xs text-muted-foreground">{mode.description}</div>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
