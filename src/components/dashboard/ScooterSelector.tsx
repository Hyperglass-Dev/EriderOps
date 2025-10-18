'use client'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const scooterModels = [
  { id: 'xiaomi-pro-2', name: 'Xiaomi Mi Pro 2' },
  { id: 'segway-max', name: 'Segway Ninebot Max' },
  { id: 'pure-air-pro', name: 'Pure Air Pro' },
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
