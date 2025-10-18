'use client'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { scooterModels } from '@/lib/scooter-data';
import { useMemo } from 'react';
import { Label } from '@/components/ui/label';

export function ScooterSelector({ onSelectScooter, selectedScooter } : { onSelectScooter: (id: string) => void, selectedScooter: string }) {
  const brands = useMemo(() => {
    return [...new Set(scooterModels.map(model => model.brand))];
  }, []);

  return (
    <div className="space-y-2">
      <Label>Scooter Model</Label>
      <Select onValueChange={onSelectScooter} value={selectedScooter}>
        <SelectTrigger>
          <SelectValue placeholder="Select scooter model" />
        </SelectTrigger>
        <SelectContent>
          {brands.map(brand => (
            <div key={brand}>
              <div className="px-2 py-1.5 text-sm font-semibold text-muted-foreground">{brand}</div>
              {scooterModels.filter(model => model.brand === brand).map((model) => (
                <SelectItem key={model.id} value={model.id}>
                  {model.name}
                </SelectItem>
              ))}
            </div>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
