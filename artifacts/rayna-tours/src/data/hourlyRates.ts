export type HourlyPackage = {
  "Full Day Dubai 10 HRS": number;
  "Full Day Other Emirates 10 HRS": number;
  "Half Day Dubai 5 HRS": number;
  "EXTRA HOURS": number;
};

export const hourlyRates: Record<string, HourlyPackage> = {
  "Lexus ES300": {
    "Full Day Dubai 10 HRS": 850,
    "Full Day Other Emirates 10 HRS": 900,
    "Half Day Dubai 5 HRS": 500,
    "EXTRA HOURS": 100
  },
  "Kia Carnival": {
    "Full Day Dubai 10 HRS": 850,
    "Full Day Other Emirates 10 HRS": 900,
    "Half Day Dubai 5 HRS": 500,
    "EXTRA HOURS": 100
  },
  "Audi A6": {
    "Full Day Dubai 10 HRS": 1200,
    "Full Day Other Emirates 10 HRS": 1300,
    "Half Day Dubai 5 HRS": 700,
    "EXTRA HOURS": 150
  },
  "Mercedes V Class 250": {
    "Full Day Dubai 10 HRS": 1400,
    "Full Day Other Emirates 10 HRS": 1600,
    "Half Day Dubai 5 HRS": 1000,
    "EXTRA HOURS": 150
  },
  "GMC SUV / Suburban": {
    "Full Day Dubai 10 HRS": 1400,
    "Full Day Other Emirates 10 HRS": 1600,
    "Half Day Dubai 5 HRS": 1000,
    "EXTRA HOURS": 150
  },
  "Mercedes Sprinter 16/19 Pax": {
    "Full Day Dubai 10 HRS": 1800,
    "Full Day Other Emirates 10 HRS": 1900,
    "Half Day Dubai 5 HRS": 1100,
    "EXTRA HOURS": 175
  },
  "Mercedes S 500": {
    "Full Day Dubai 10 HRS": 2400,
    "Full Day Other Emirates 10 HRS": 2800,
    "Half Day Dubai 5 HRS": 1300,
    "EXTRA HOURS": 250
  },
  "Cadillac Escalade": {
    "Full Day Dubai 10 HRS": 2400,
    "Full Day Other Emirates 10 HRS": 2800,
    "Half Day Dubai 5 HRS": 1300,
    "EXTRA HOURS": 250
  },
  "Rolls Royce Ghost": {
    "Full Day Dubai 10 HRS": 4500,
    "Full Day Other Emirates 10 HRS": 5500,
    "Half Day Dubai 5 HRS": 3500,
    "EXTRA HOURS": 500
  },
  "Rolls Royce Cullinan": {
    "Full Day Dubai 10 HRS": 5500,
    "Full Day Other Emirates 10 HRS": 6000,
    "Half Day Dubai 5 HRS": 4500,
    "EXTRA HOURS": 550
  },
  "BMW 7 Series": {
    "Full Day Dubai 10 HRS": 2400,
    "Full Day Other Emirates 10 HRS": 2800,
    "Half Day Dubai 5 HRS": 1300,
    "EXTRA HOURS": 250
  },
  "Toyota Hiace 14 Seater": {
    "Full Day Dubai 10 HRS": 900,
    "Full Day Other Emirates 10 HRS": 1000,
    "Half Day Dubai 5 HRS": 600,
    "EXTRA HOURS": 100
  },
  "35 Seater Luxury Coach": {
    "Full Day Dubai 10 HRS": 1100,
    "Full Day Other Emirates 10 HRS": 1300,
    "Half Day Dubai 5 HRS": 900,
    "EXTRA HOURS": 125
  },
  "50 Seater Luxury Coach": {
    "Full Day Dubai 10 HRS": 1400,
    "Full Day Other Emirates 10 HRS": 1600,
    "Half Day Dubai 5 HRS": 1100,
    "EXTRA HOURS": 150
  }
};

export const hourlyPackages = [
  "Full Day Dubai 10 HRS",
  "Full Day Other Emirates 10 HRS",
  "Half Day Dubai 5 HRS"
];
