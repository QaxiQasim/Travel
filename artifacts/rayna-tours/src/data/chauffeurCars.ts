import imgCullinan from '@/assets/generated_images/cullinan.png';
import imgVClass from '@/assets/generated_images/vclass.png';
import imgLexus from '@/assets/generated_images/lexus_es300.png';
import imgLexusBack from '@/assets/generated_images/lexus_es300_back.png';
import imgLexusInterior from '@/assets/generated_images/lexus_es300_interior.png';
import imgKiaCarnival1 from '@/assets/generated_images/kia_carnival_1.png';
import imgKiaCarnival2 from '@/assets/generated_images/kia_carnival_2.png';
import imgKiaCarnival3 from '@/assets/generated_images/kia_carnival_3.png';
import imgKiaCarnival4 from '@/assets/generated_images/kia_carnival_4.png';
import imgAudiA6_1 from '@/assets/generated_images/audi_a6_1.png';
import imgAudiA6_2 from '@/assets/generated_images/audi_a6_2.png';
import imgVClass1 from '@/assets/generated_images/vclass_1.png';
import imgVClass2 from '@/assets/generated_images/vclass_2.png';
import imgVClass3 from '@/assets/generated_images/vclass_3.png';
import imgVClass4 from '@/assets/generated_images/vclass_4.png';
import imgGmc1 from '@/assets/generated_images/gmc_1.png';
import imgGmc2 from '@/assets/generated_images/gmc_2.jpg';
import imgGmc3 from '@/assets/generated_images/gmc_3.png';
import imgGmc4 from '@/assets/generated_images/gmc_4.png';
import imgGmc5 from '@/assets/generated_images/gmc_5.png';
import imgSprinter1 from '@/assets/generated_images/sprinter_1.jpg';
import imgSprinter2 from '@/assets/generated_images/sprinter_2.jpg';
import imgSprinter3 from '@/assets/generated_images/sprinter_3.jpg';
import imgSprinter4 from '@/assets/generated_images/sprinter_4.png';
import imgSprinter5 from '@/assets/generated_images/sprinter_5.jpg';
import imgS500_1 from '@/assets/generated_images/s500_1.png';
import imgS500_2 from '@/assets/generated_images/s500_2.jpg';
import imgS500_3 from '@/assets/generated_images/s500_3.jpg';
import imgEscalade1 from '@/assets/generated_images/escalade_1.png';
import imgEscalade2 from '@/assets/generated_images/escalade_2.png';
import imgEscalade3 from '@/assets/generated_images/escalade_3.png';
import imgEscalade4 from '@/assets/generated_images/escalade_4.png';
import imgGhost1 from '@/assets/generated_images/ghost_1.png';
import imgGhost2 from '@/assets/generated_images/ghost_2.png';
import imgGhost3 from '@/assets/generated_images/ghost_3.png';
import imgGhost4 from '@/assets/generated_images/ghost_4.jpg';
import imgGhost5 from '@/assets/generated_images/ghost_5.jpg';
import imgCullinan1 from '@/assets/generated_images/cullinan_1.png';
import imgCullinan2 from '@/assets/generated_images/cullinan_2.png';
import imgCullinan3 from '@/assets/generated_images/cullinan_3.png';
import imgCullinan4 from '@/assets/generated_images/cullinan_4.jpg';
import imgCullinan5 from '@/assets/generated_images/cullinan_5.png';
import imgBmw1 from '@/assets/generated_images/bmw7_1.png';
import imgBmw2 from '@/assets/generated_images/bmw7_2.png';
import imgBmw3 from '@/assets/generated_images/bmw7_3.png';
import imgBmw4 from '@/assets/generated_images/bmw7_4.jpg';
import imgBmw5 from '@/assets/generated_images/bmw7_5.jpg';
import imgHiace1 from '@/assets/generated_images/hiace_1.png';
import imgHiace2 from '@/assets/generated_images/hiace_2.png';
import imgHiace3 from '@/assets/generated_images/hiace_3.png';
import imgHiace4 from '@/assets/generated_images/hiace_4.png';
import imgHiace5 from '@/assets/generated_images/hiace_5.png';
import imgCoach35_1 from '@/assets/generated_images/coach35_1.png';
import imgCoach35_2 from '@/assets/generated_images/coach35_2.jpg';
import imgCoach35_3 from '@/assets/generated_images/coach35_3.jpg';
import imgCoach50_1 from '@/assets/generated_images/coach50_1.png';
import imgCoach50_2 from '@/assets/generated_images/coach50_2.jpg';
import { transferRates } from '@/data/transferRates';

export const chauffeurCars = [
  { slug: "lexus-kia-byd", id: 1, name: "Lexus ES300", pax: 3, luggage: 3, doors: 4, transmission: "Auto", price: 120, image: imgLexus, extraImages: [imgLexusBack, imgLexusInterior], type: "Luxury Sedan" },
  { slug: "muv-7-seater", id: 2, name: "Kia Carnival", pax: 6, luggage: 5, doors: 5, transmission: "Auto", price: 120, image: imgKiaCarnival1, extraImages: [imgKiaCarnival2, imgKiaCarnival3, imgKiaCarnival4], type: "MUV" },
  { slug: "audi-bmw-byd", id: 3, name: "Audi A6", pax: 3, luggage: 3, doors: 4, transmission: "Auto", price: 150, image: imgAudiA6_1, extraImages: [imgAudiA6_2], type: "Premium Sedan" },
  { slug: "mercedes-v-class", id: 4, name: "Mercedes V Class 250", pax: 7, luggage: 6, doors: 5, transmission: "Auto", price: 250, image: imgVClass1, extraImages: [imgVClass2, imgVClass3, imgVClass4], type: "Luxury Van" },
  { slug: "gmc-suv", id: 5, name: "GMC SUV / Suburban", pax: 7, luggage: 6, doors: 5, transmission: "Auto", price: 250, image: imgGmc1, extraImages: [imgGmc2, imgGmc3, imgGmc4, imgGmc5], type: "Premium SUV" },
  { slug: "mercedes-sprinter", id: 6, name: "Mercedes Sprinter 16/19 Pax", pax: 19, luggage: 15, doors: 4, transmission: "Auto", price: 600, image: imgSprinter1, extraImages: [imgSprinter2, imgSprinter3, imgSprinter4, imgSprinter5], type: "Luxury Minibus" },
  { slug: "mercedes-s500", id: 7, name: "Mercedes S 500", pax: 3, luggage: 3, doors: 4, transmission: "Auto", price: 450, image: imgS500_1, extraImages: [imgS500_2, imgS500_3], type: "Ultra Luxury" },
  { slug: "cadillac-escalade", id: 8, name: "Cadillac Escalade", pax: 7, luggage: 6, doors: 5, transmission: "Auto", price: 450, image: imgEscalade1, extraImages: [imgEscalade2, imgEscalade3, imgEscalade4], type: "VIP SUV" },
  { slug: "rolls-royce-ghost", id: 9, name: "Rolls Royce Ghost", pax: 3, luggage: 3, doors: 4, transmission: "Auto", price: 2100, image: imgGhost1, extraImages: [imgGhost2, imgGhost3, imgGhost4, imgGhost5], type: "Elite Luxury" },
  { slug: "rolls-royce-cullinan", id: 10, name: "Rolls Royce Cullinan", pax: 4, luggage: 4, doors: 4, transmission: "Auto", price: 2500, image: imgCullinan1, extraImages: [imgCullinan2, imgCullinan3, imgCullinan4, imgCullinan5], type: "Elite SUV" },
  { slug: "bmw-7-series", id: 11, name: "BMW 7 Series", pax: 3, luggage: 3, doors: 4, transmission: "Auto", price: 450, image: imgBmw1, extraImages: [imgBmw2, imgBmw3, imgBmw4, imgBmw5], type: "Ultra Luxury" },
  { slug: "toyota-hiace", id: 12, name: "Toyota Hiace 14 Seater", pax: 14, luggage: 10, doors: 4, transmission: "Auto", price: 200, image: imgHiace1, extraImages: [imgHiace2, imgHiace3, imgHiace4, imgHiace5], type: "Commuter Van" },
  { slug: "35-seater-coach", id: 13, name: "35 Seater Luxury Coach", pax: 35, luggage: 30, doors: 2, transmission: "Auto", price: 450, image: imgCoach35_1, extraImages: [imgCoach35_2, imgCoach35_3], type: "Luxury Coach" },
  { slug: "50-seater-coach", id: 14, name: "50 Seater Luxury Coach", pax: 50, luggage: 50, doors: 2, transmission: "Auto", price: 550, image: imgCoach50_1, extraImages: [imgCoach50_2], type: "Luxury Coach" },
];

export const fromLocations = Object.keys(transferRates);
export const toLocations = Object.keys(transferRates["Dubai Airport"] || {});
