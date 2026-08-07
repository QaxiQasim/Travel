const fs = require('fs');
const { Client } = require('pg');

const envStr = fs.readFileSync('C:\\Users\\Innovation Factory\\Desktop\\Dubai-Classic-Travel\\.env', 'utf8').split('\n').find(l => l.startsWith('DATABASE_URL='));
let env = envStr.split('=')[1].trim();
if (env.startsWith('"') && env.endsWith('"')) {
  env = env.substring(1, env.length - 1);
}

const { transferRates } = require('C:\\Users\\Innovation Factory\\Desktop\\Dubai-Classic-Travel\\artifacts\\rayna-tours\\src\\data\\transferRates.ts');

const cars = [
  { slug: "lexus-kia-byd", id: 1, name: "Lexus ES300", pax: 3, luggage: 3, doors: 4, transmission: "Auto", price: 120,   type: "Luxury Sedan" },
  { slug: "muv-7-seater", id: 2, name: "Kia Carnival", pax: 6, luggage: 5, doors: 5, transmission: "Auto", price: 120,   type: "MUV" },
  { slug: "audi-bmw-byd", id: 3, name: "Audi A6", pax: 3, luggage: 3, doors: 4, transmission: "Auto", price: 150,   type: "Premium Sedan" },
  { slug: "mercedes-v-class", id: 4, name: "Mercedes V Class 250", pax: 7, luggage: 6, doors: 5, transmission: "Auto", price: 250,   type: "Luxury Van" },
  { slug: "gmc-suv", id: 5, name: "GMC SUV / Suburban", pax: 7, luggage: 6, doors: 5, transmission: "Auto", price: 250,   type: "Premium SUV" },
  { slug: "mercedes-sprinter", id: 6, name: "Mercedes Sprinter 16/19 Pax", pax: 19, luggage: 15, doors: 4, transmission: "Auto", price: 600,   type: "Luxury Minibus" },
  { slug: "mercedes-s500", id: 7, name: "Mercedes S 500", pax: 3, luggage: 3, doors: 4, transmission: "Auto", price: 450,   type: "Ultra Luxury" },
  { slug: "cadillac-escalade", id: 8, name: "Cadillac Escalade", pax: 7, luggage: 6, doors: 5, transmission: "Auto", price: 450,   type: "VIP SUV" },
  { slug: "rolls-royce-ghost", id: 9, name: "Rolls Royce Ghost", pax: 3, luggage: 3, doors: 4, transmission: "Auto", price: 2100,   type: "Elite Luxury" },
  { slug: "rolls-royce-cullinan", id: 10, name: "Rolls Royce Cullinan", pax: 4, luggage: 4, doors: 4, transmission: "Auto", price: 2500,   type: "Elite SUV" },
  { slug: "bmw-7-series", id: 11, name: "BMW 7 Series", pax: 3, luggage: 3, doors: 4, transmission: "Auto", price: 450,   type: "Ultra Luxury" },
  { slug: "toyota-hiace", id: 12, name: "Toyota Hiace 14 Seater", pax: 14, luggage: 10, doors: 4, transmission: "Auto", price: 200,   type: "Commuter Van" },
  { slug: "35-seater-coach", id: 13, name: "35 Seater Luxury Coach", pax: 35, luggage: 30, doors: 2, transmission: "Auto", price: 450,   type: "Luxury Coach" },
  { slug: "50-seater-coach", id: 14, name: "50 Seater Luxury Coach", pax: 50, luggage: 50, doors: 2, transmission: "Auto", price: 550,   type: "Luxury Coach" }
];

const client = new Client({ connectionString: env }); 

client.connect().then(async () => { 
  console.log('Seeding...');
  await client.query('DELETE FROM chauffeur_pricing;');
  await client.query('DELETE FROM chauffeur_locations;');
  await client.query('DELETE FROM chauffeur_vehicles;');

  const carIdMap = {};
  for (const car of cars) {
    const res = await client.query('INSERT INTO chauffeur_vehicles(vehicle_type, image_url) VALUES($1, $2) RETURNING id', [car.name, null]);
    carIdMap[car.name] = res.rows[0].id;
  }

  const locs = new Set();
  for (const from of Object.keys(transferRates)) {
    locs.add(from);
    for (const to of Object.keys(transferRates[from])) {
      locs.add(to);
    }
  }

  const locIdMap = {};
  for (const loc of locs) {
    const res = await client.query('INSERT INTO chauffeur_locations(location_name) VALUES($1) RETURNING id', [loc]);
    locIdMap[loc] = res.rows[0].id;
  }

  for (const from of Object.keys(transferRates)) {
    for (const to of Object.keys(transferRates[from])) {
      for (const carName of Object.keys(transferRates[from][to])) {
        const price = transferRates[from][to][carName];
        const vId = carIdMap[carName];
        if (vId) {
          await client.query('INSERT INTO chauffeur_pricing(vehicle_id, from_location_id, to_location_id, price) VALUES($1, $2, $3, $4)', [vId, locIdMap[from], locIdMap[to], price]);
        }
      }
    }
  }

  console.log('Seeded successfully!'); 
  client.end(); 
}).catch(e => { console.error(e); client.end(); });
