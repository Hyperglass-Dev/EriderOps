'use client'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const scooterModels = [
  // Evada
  { id: 'evada-kupter-x8', name: 'Evada Kupter X8' },
  // InMotion
  { id: 'inmotion-s1', name: 'InMotion S1' },
  { id: 'inmotion-climber', name: 'InMotion Climber' },
  // Kaabo
  { id: 'kaabo-mantis-king-gt', name: 'Kaabo Mantis King GT' },
  { id: 'kaabo-wolf-warrior-x-gt', name: 'Kaabo Wolf Warrior X GT' },
  // Dualtron
  { id: 'dualtron-thunder-3', name: 'Dualtron Thunder 3' },
  { id: 'dualtron-storm', name: 'Dualtron Storm' },
  // Pure Electric
  { id: 'pure-air-pro-lr', name: 'Pure Air Pro LR' },
  { id: 'pure-advance-flex', name: 'Pure Advance Flex' },
  // Inokim
  { id: 'inokim-ox-super', name: 'Inokim OX Super' },
  { id: 'inokim-quick-4-super', name: 'Inokim Quick 4 Super' },
  // Segway (already had one, adding more)
  { id: 'segway-max', name: 'Segway Ninebot Max G30' },
  { id: 'segway-gt2', name: 'Segway GT2' },
  { id: 'segway-p100s', name: 'Segway P100S' },
  // NIU
  { id: 'niu-kqi3-max', name: 'NIU KQi3 Max' },
  { id: 'niu-kqi2-pro', name: 'NIU KQi2 Pro' },
  // Navee
  { id: 'navee-n65', name: 'Navee N65' },
  { id: 'navee-s65', name: 'Navee S65' },
  // Keeping originals
  { id: 'xiaomi-pro-2', name: 'Xiaomi Mi Pro 2' },
  { id: 'apollo-ghost', name: 'Apollo Ghost' },
];

export function ScooterSelector({ onSelectScooter, selectedScooter } : { onSelectScooter: (id: string) => void, selectedScooter: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Scooter Model</CardTitle>
      </CardHeader>
      <CardContent>
        <Select onValueChange={onSelectScooter} value={selectedScooter}>
          <SelectTrigger>
            <SelectValue placeholder="Select scooter model" />
          </SelectTrigger>
          <SelectContent>
            {scooterModels.map((model) => (
              <SelectItem key={model.id} value={model.id}>
                {model.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardContent>
    </Card>
  );
}
