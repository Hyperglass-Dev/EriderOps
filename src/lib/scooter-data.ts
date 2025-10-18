
export type ScooterModel = {
  id: string;
  name: string;
  brand: string;
  batteryCapacityWh: number; // Watt-hours
  efficiencyWhKm: number; // Watt-hours per kilometer
};

// NOTE: Battery capacity and efficiency are estimates for simulation purposes.
export const scooterModels: ScooterModel[] = [
  // Evada
  { id: 'evada-kupter-x8', name: 'Kupter X8', brand: 'Evada', batteryCapacityWh: 550, efficiencyWhKm: 15 },
  { id: 'evada-kabbo-wolf', name: 'Kabbo Wolf', brand: 'Evada', batteryCapacityWh: 1500, efficiencyWhKm: 25 },
  { id: 'evada-mantiz', name: 'Mantiz', brand: 'Evada', batteryCapacityWh: 1200, efficiencyWhKm: 22 },

  // InMotion
  { id: 'inmotion-s1', name: 'S1', brand: 'InMotion', batteryCapacityWh: 675, efficiencyWhKm: 18 },
  { id: 'inmotion-climber', name: 'Climber', brand: 'InMotion', batteryCapacityWh: 533, efficiencyWhKm: 20 },
  { id: 'inmotion-rs', name: 'RS', brand: 'InMotion', batteryCapacityWh: 2000, efficiencyWhKm: 28 },
  { id: 'inmotion-v11', name: 'V11 (EUC)', brand: 'InMotion', batteryCapacityWh: 1500, efficiencyWhKm: 22 },
  { id: 'inmotion-challenger', name: 'Challenger (V13)', brand: 'InMotion', batteryCapacityWh: 2520, efficiencyWhKm: 30 },

  // Kaabo
  { id: 'kaabo-mantis-king-gt', name: 'Mantis King GT', brand: 'Kaabo', batteryCapacityWh: 1440, efficiencyWhKm: 24 },
  { id: 'kaabo-wolf-warrior-x-gt', name: 'Wolf Warrior X GT', brand: 'Kaabo', batteryCapacityWh: 1260, efficiencyWhKm: 26 },
  { id: 'kaabo-wolf-king-gt', name: 'Wolf King GT', brand: 'Kaabo', batteryCapacityWh: 2520, efficiencyWhKm: 30 },
  { id: 'kaabo-mantis-8', name: 'Mantis 8', brand: 'Kaabo', batteryCapacityWh: 800, efficiencyWhKm: 19 },
  { id: 'kaabo-skywalker-8s', name: 'Skywalker 8S', brand: 'Kaabo', batteryCapacityWh: 624, efficiencyWhKm: 17 },

  // Dualtron
  { id: 'dualtron-thunder-3', name: 'Thunder 3', brand: 'Dualtron', batteryCapacityWh: 2880, efficiencyWhKm: 32 },
  { id: 'dualtron-storm', name: 'Storm', brand: 'Dualtron', batteryCapacityWh: 2268, efficiencyWhKm: 28 },
  { id: 'dualtron-x-limited', name: 'X Limited', brand: 'Dualtron', batteryCapacityWh: 4920, efficiencyWhKm: 35 },
  { id: 'dualtron-mini', name: 'Mini', brand: 'Dualtron', batteryCapacityWh: 624, efficiencyWhKm: 16 },
  { id: 'dualtron-spider-2', name: 'Spider 2', brand: 'Dualtron', batteryCapacityWh: 1800, efficiencyWhKm: 25 },
  { id: 'dualtron-victor', name: 'Victor', brand: 'Dualtron', batteryCapacityWh: 1800, efficiencyWhKm: 26 },

  // Pure Electric
  { id: 'pure-air-pro-lr', name: 'Air Pro LR', brand: 'Pure Electric', batteryCapacityWh: 518, efficiencyWhKm: 14 },
  { id: 'pure-advance-flex', name: 'Advance Flex', brand: 'Pure Electric', batteryCapacityWh: 345, efficiencyWhKm: 12 },
  { id: 'pure-air-go', name: 'Air Go', brand: 'Pure Electric', batteryCapacityWh: 245, efficiencyWhKm: 10 },
  { id: 'pure-air-pro-2nd-gen', name: 'Air Pro (2nd Gen)', brand: 'Pure Electric', batteryCapacityWh: 345, efficiencyWhKm: 13 },
  
  // Inokim
  { id: 'inokim-ox-super', name: 'OX Super', brand: 'Inokim', batteryCapacityWh: 1260, efficiencyWhKm: 21 },
  { id: 'inokim-quick-4-super', name: 'Quick 4 Super', brand: 'Inokim', batteryCapacityWh: 1040, efficiencyWhKm: 18 },
  { id: 'inokim-light-2', name: 'Light 2', brand: 'Inokim', batteryCapacityWh: 374, efficiencyWhKm: 13 },
  { id: 'inokim-oxo', name: 'OXO', brand: 'Inokim', batteryCapacityWh: 1536, efficiencyWhKm: 25 },
  
  // Segway
  { id: 'segway-max-g30', name: 'Ninebot Max G30', brand: 'Segway', batteryCapacityWh: 551, efficiencyWhKm: 15 },
  { id: 'segway-gt2', name: 'GT2', brand: 'Segway', batteryCapacityWh: 1512, efficiencyWhKm: 25 },
  { id: 'segway-p100s', name: 'P100S', brand: 'Segway', batteryCapacityWh: 1086, efficiencyWhKm: 20 },
  { id: 'segway-f40', name: 'Ninebot F40', brand: 'Segway', batteryCapacityWh: 367, efficiencyWhKm: 14 },
  { id: 'segway-max-g2', name: 'Ninebot Max G2', brand: 'Segway', batteryCapacityWh: 551, efficiencyWhKm: 16 },
  { id: 'segway-gt1', name: 'GT1', brand: 'Segway', batteryCapacityWh: 1008, efficiencyWhKm: 22 },
  
  // NIU
  { id: 'niu-kqi3-max', name: 'KQi3 Max', brand: 'NIU', batteryCapacityWh: 608, efficiencyWhKm: 16 },
  { id: 'niu-kqi2-pro', name: 'KQi2 Pro', brand: 'NIU', batteryCapacityWh: 365, efficiencyWhKm: 14 },
  { id: 'niu-kqi1-sport', name: 'KQi1 Sport', brand: 'NIU', batteryCapacityWh: 243, efficiencyWhKm: 11 },
  { id: 'niu-kqi3-pro', name: 'KQi3 Pro', brand: 'NIU', batteryCapacityWh: 486, efficiencyWhKm: 15 },
  
  // Navee
  { id: 'navee-n65', name: 'N65', brand: 'Navee', batteryCapacityWh: 600, efficiencyWhKm: 17 },
  { id: 'navee-s65', name: 'S65', brand: 'Navee', batteryCapacityWh: 597, efficiencyWhKm: 18 },
  { id: 'navee-v50', name: 'V50', brand: 'Navee', batteryCapacityWh: 441, efficiencyWhKm: 15 },
  { id: 'navee-s40', name: 'S40', brand: 'Navee', batteryCapacityWh: 350, efficiencyWhKm: 14 },
  
  // Other popular models for variety
  { id: 'xiaomi-pro-2', name: 'Mi Pro 2', brand: 'Xiaomi', batteryCapacityWh: 474, efficiencyWhKm: 16 },
  { id: 'apollo-ghost', name: 'Ghost', brand: 'Apollo', batteryCapacityWh: 1060, efficiencyWhKm: 22 },
  { id: 'hiboy-s2', name: 'S2', brand: 'Hiboy', batteryCapacityWh: 270, efficiencyWhKm: 12 },
  { id: 'gotrax-gxl-v2', name: 'GXL V2', brand: 'Gotrax', batteryCapacityWh: 187, efficiencyWhKm: 10 },
];
