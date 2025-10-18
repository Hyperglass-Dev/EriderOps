
export type ScooterModel = {
  id: string;
  name: string;
  brand: string;
  batteryCapacityWh: number;
  efficiencyWhKm: number;
};

export const scooterModels: ScooterModel[] = [
  // InMotion
  { id: 'inmotion-s1', name: 'S1', brand: 'InMotion', batteryCapacityWh: 675, efficiencyWhKm: 7.1 },
  { id: 'inmotion-air', name: 'Air', brand: 'InMotion', batteryCapacityWh: 374, efficiencyWhKm: 9.4 },
  { id: 'inmotion-air-pro', name: 'Air Pro', brand: 'InMotion', batteryCapacityWh: 460, efficiencyWhKm: 9.2 },
  { id: 'inmotion-climber', name: 'Climber', brand: 'InMotion', batteryCapacityWh: 533, efficiencyWhKm: 9.5 },
  { id: 'inmotion-rs-lite-offroad', name: 'RS Lite (Off-Road)', brand: 'InMotion', batteryCapacityWh: 2160, efficiencyWhKm: 18.0 },
  { id: 'inmotion-rs-lite-street', name: 'RS Lite (Street)', brand: 'InMotion', batteryCapacityWh: 2160, efficiencyWhKm: 16.0 },
  { id: 'inmotion-rs-street', name: 'RS (Street)', brand: 'InMotion', batteryCapacityWh: 2880, efficiencyWhKm: 17.0 },

  // Segway
  { id: 'segway-max-g2', name: 'Ninebot Max G2', brand: 'Segway', batteryCapacityWh: 551, efficiencyWhKm: 7.9 },
  { id: 'segway-max-g3', name: 'Ninebot Max G3', brand: 'Segway', batteryCapacityWh: 597, efficiencyWhKm: 8.0 },
  { id: 'segway-c2-pro', name: 'C2 Pro', brand: 'Segway', batteryCapacityWh: 130, efficiencyWhKm: 8.7 },
  { id: 'segway-f2-plus', name: 'F2 Plus', brand: 'Segway', batteryCapacityWh: 275, efficiencyWhKm: 8.6 },
  { id: 'segway-f2-pro', name: 'F2 Pro', brand: 'Segway', batteryCapacityWh: 367, efficiencyWhKm: 8.4 },
  { id: 'segway-f3-pro', name: 'F3 Pro', brand: 'Segway', batteryCapacityWh: 460, efficiencyWhKm: 8.5 },
  { id: 'segway-zt3-pro', name: 'ZT3 Pro', brand: 'Segway', batteryCapacityWh: 551, efficiencyWhKm: 8.0 },
  { id: 'segway-gt3', name: 'GT3', brand: 'Segway', batteryCapacityWh: 1512, efficiencyWhKm: 15.1 },
  { id: 'segway-gt3-pro', name: 'GT3 Pro', brand: 'Segway', batteryCapacityWh: 2160, efficiencyWhKm: 15.6 },

  // Kaabo
  { id: 'kaabo-mantis-10-plus-v2', name: 'Mantis 10 Plus V2 (2025)', brand: 'Kaabo', batteryCapacityWh: 1470, efficiencyWhKm: 16.3 },
  { id: 'kaabo-mantis-10-lite', name: 'Mantis 10 Lite', brand: 'Kaabo', batteryCapacityWh: 1008, efficiencyWhKm: 14.4 },
  { id: 'kaabo-mantis-king-gt', name: 'Mantis King GT', brand: 'Kaabo', batteryCapacityWh: 1440, efficiencyWhKm: 16.0 },
  { id: 'kaabo-wolf-king-gtr', name: 'Wolf King GTR', brand: 'Kaabo', batteryCapacityWh: 2419, efficiencyWhKm: 20.2 },
  { id: 'kaabo-skywalker-8s', name: 'Skywalker 8S', brand: 'Kaabo', batteryCapacityWh: 624, efficiencyWhKm: 13.0 },

  // Evada
  { id: 'evada-dash-150', name: 'Dash 150', brand: 'Evada', batteryCapacityWh: 108, efficiencyWhKm: 7.2 },
  { id: 'evada-cruise-250', name: 'Cruise 250', brand: 'Evada', batteryCapacityWh: 187, efficiencyWhKm: 7.5 },
  { id: 'evada-trail-1200-pro', name: 'Trail 1200 Pro', brand: 'Evada', batteryCapacityWh: 1200, efficiencyWhKm: 15.0 },

  // Minimotors (Dualtron)
  { id: 'dualtron-popular', name: 'Dualtron Popular', brand: 'Minimotors', batteryCapacityWh: 728, efficiencyWhKm: 13.0 },
  { id: 'dualtron-togo', name: 'Dualtron Togo', brand: 'Minimotors', batteryCapacityWh: 576, efficiencyWhKm: 11.5 },
  { id: 'dualtron-mini', name: 'Dualtron Mini', brand: 'Minimotors', batteryCapacityWh: 811, efficiencyWhKm: 12.8 },

  // NIU
  { id: 'niu-kqi2-pro', name: 'KQi2 Pro', brand: 'NIU', batteryCapacityWh: 365, efficiencyWhKm: 9.1 },
  { id: 'niu-kqi3-max', name: 'KQi3 Max', brand: 'NIU', batteryCapacityWh: 608, efficiencyWhKm: 9.5 },
  { id: 'niu-kqi3-pro', name: 'KQi3 Pro', brand: 'NIU', batteryCapacityWh: 487, efficiencyWhKm: 9.3 },

  // Pure
  { id: 'pure-air-5', name: 'Air 5', brand: 'Pure', batteryCapacityWh: 345, efficiencyWhKm: 8.6 },
  { id: 'pure-air-5-pro', name: 'Air 5 Pro', brand: 'Pure', batteryCapacityWh: 460, efficiencyWhKm: 8.8 },

  // Kimi
  { id: 'kimi-kids-2025', name: 'Kids Scooter (2025)', brand: 'Kimi', batteryCapacityWh: 108, efficiencyWhKm: 7.2 },
];
