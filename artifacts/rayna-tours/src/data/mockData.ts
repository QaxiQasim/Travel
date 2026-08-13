// Central data store for all tour packages and activities.
// Edit prices and content here to update the entire site.

export interface ActivityOption {
  name: string;
  priceAed: number;
  description?: string;
  longDescription?: string;
  inclusions?: string[];
  highlights?: string[];
  exclusions?: string[];
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface TourPackage {
  id: number;
  slug: string;
  title: string;
  category: string;
  shortDescription: string;
  description: string;
  priceAed: number;
  nights: number;
  days: number;
  imageUrl: string;
  galleryImages: string[];
  inclusions: string[];
  exclusions: string[];
  highlights: string[];
  isFeatured: boolean;
  rating: number;
  reviewCount: number;
  tags: string[];
}

export interface Activity {
  id: number;
  slug: string;
  title: string;
  category: string;
  shortDescription: string;
  description: string;
  priceAed: number;
  duration: string;
  imageUrl: string;
  galleryImages: string[];
  inclusions: string[];
  highlights?: string[];
  operatingHours?: string;
  importantInfo?: string[];
  howToRedeem?: string[];
  location?: { title: string; address: string; mapUrl?: string };
  options: ActivityOption[];
  faqs: FAQ[];
  relatedActivitySlugs: string[];
  rating: number;
  reviewCount: number;
}

export interface Testimonial {
  id: number;
  name: string;
  location: string;
  rating: number;
  review: string;
  avatarUrl: string | null;
}

export const packages: TourPackage[] = [
  {
    id: 1,
    slug: "dubai-budget-stopper",
    title: "Dubai Budget Stopper",
    category: "dubai-city",
    shortDescription: "Short stay, big savings — explore the essentials of Dubai.",
    description: "Perfect for travellers on a budget who want to experience Dubai without breaking the bank. This package covers the iconic sights and a city tour, with comfortable accommodation in a well-located hotel.",
    priceAed: 569,
    nights: 3,
    days: 4,
    imageUrl: "",
    galleryImages: [],
    inclusions: ["3 Nights hotel accommodation", "Airport transfers", "Dubai city tour", "Burj Khalifa (non-prime time)", "Daily breakfast"],
    exclusions: ["International flights", "Visa fees", "Personal expenses", "Meals not mentioned"],
    highlights: ["Burj Khalifa visit", "Dubai Mall", "Old Dubai & Gold Souk", "City sightseeing tour"],
    isFeatured: true,
    rating: 4.5,
    reviewCount: 312,
    tags: ["budget", "city", "short-break"],
  },
  {
    id: 2,
    slug: "discover-dubai-festive-bazaar",
    title: "Discover Dubai Festive Bazaar",
    category: "dubai-city",
    shortDescription: "Immerse in Dubai's vibrant festive atmosphere.",
    description: "Experience the magic of Dubai during its most colourful festival season. This package combines city highlights with exclusive festive experiences, shopping festivals, and cultural events.",
    priceAed: 875,
    nights: 4,
    days: 5,
    imageUrl: "",
    galleryImages: [],
    inclusions: ["4 Nights hotel accommodation", "Airport transfers", "Festive city tour", "Global Village entry", "Desert safari with BBQ dinner", "Daily breakfast"],
    exclusions: ["International flights", "Visa fees", "Personal expenses"],
    highlights: ["Global Village", "Desert Safari", "Shopping Festival", "Dubai Frame", "Fireworks viewing"],
    isFeatured: true,
    rating: 4.7,
    reviewCount: 428,
    tags: ["festive", "family", "city"],
  },
  {
    id: 3,
    slug: "dubai-city-highlights-tour",
    title: "Dubai City Highlights Tour",
    category: "dubai-city",
    shortDescription: "Discover Dubai's most iconic landmarks in one grand tour.",
    description: "A comprehensive city experience covering all of Dubai's must-see landmarks. From the towering Burj Khalifa to the historic creek and modern Marina, this tour gives you the full picture of this extraordinary city.",
    priceAed: 3500,
    nights: 5,
    days: 6,
    imageUrl: "",
    galleryImages: [],
    inclusions: ["5 Nights luxury hotel accommodation", "Airport transfers (private)", "Half-day city tour", "Burj Khalifa (prime time)", "Dhow Cruise Dinner", "Desert safari (premium)", "Daily breakfast"],
    exclusions: ["International flights", "Visa fees", "Personal expenses"],
    highlights: ["Burj Khalifa prime time", "Dubai Frame", "Palm Jumeirah", "Marina & JBR Walk", "Old Dubai Heritage Tour"],
    isFeatured: true,
    rating: 4.8,
    reviewCount: 567,
    tags: ["luxury", "highlights", "city"],
  },
  {
    id: 4,
    slug: "dubai-budget-explorer",
    title: "Dubai Budget Explorer with Dubai Halt",
    category: "dubai-city",
    shortDescription: "Explore Dubai's wonders on a modest budget.",
    description: "An affordable multi-day package that lets you explore Dubai's finest attractions without overspending. Ideal for solo travellers and couples looking for value.",
    priceAed: 575,
    nights: 3,
    days: 4,
    imageUrl: "",
    galleryImages: [],
    inclusions: ["3 Nights accommodation", "Airport transfers", "City tour", "Desert safari (standard)"],
    exclusions: ["International flights", "Visa fees", "Meals (except mentioned)"],
    highlights: ["Burj Khalifa", "Dubai Mall", "Desert Safari", "Gold & Spice Souks"],
    isFeatured: false,
    rating: 4.4,
    reviewCount: 198,
    tags: ["budget", "explorer", "value"],
  },
  {
    id: 5,
    slug: "dubai-complete-experience",
    title: "Dubai Complete Experience",
    category: "dubai-city",
    shortDescription: "The ultimate Dubai holiday — nothing left unseen.",
    description: "Designed for travellers who want it all. This premium package covers every major Dubai attraction, from sky-high thrills to desert adventures and waterfront dining.",
    priceAed: 1278,
    nights: 5,
    days: 6,
    imageUrl: "",
    galleryImages: [],
    inclusions: ["5 Nights 4-star hotel", "Airport transfers", "City tour", "Desert safari (VIP)", "Dhow cruise dinner", "Burj Khalifa (prime time)", "Aquaventure waterpark", "Dubai Frame"],
    exclusions: ["International flights", "Visa fees", "Personal shopping"],
    highlights: ["All major landmarks", "VIP desert safari", "Marina dhow cruise", "Theme park access"],
    isFeatured: true,
    rating: 4.9,
    reviewCount: 643,
    tags: ["complete", "luxury", "all-inclusive"],
  },
  {
    id: 6,
    slug: "dubai-serenity-honeymoon",
    title: "Dubai Serenity Honeymoon with Seasonal Wonders",
    category: "holiday",
    shortDescription: "Romance in the city of gold — a honeymoon to remember.",
    description: "A carefully curated honeymoon escape combining luxury accommodation, private experiences, and magical Dubai moments. Create memories that last a lifetime in one of the world's most romantic cities.",
    priceAed: 2800,
    nights: 5,
    days: 6,
    imageUrl: "",
    galleryImages: [],
    inclusions: ["5 Nights 5-star hotel (honeymoon suite)", "Private airport transfers", "Romantic dhow cruise dinner", "Private desert sunset experience", "Couples spa treatment", "Burj Khalifa (prime time)", "Daily breakfast"],
    exclusions: ["International flights", "Visa fees", "Personal expenses"],
    highlights: ["Luxury suite stay", "Private desert sunset", "Couples spa", "Marina cruise", "Burj Khalifa at dusk"],
    isFeatured: true,
    rating: 5.0,
    reviewCount: 234,
    tags: ["honeymoon", "romance", "luxury"],
  },
  {
    id: 7,
    slug: "dubai-tourist-experience-desert",
    title: "Dubai Tourist Experience — Desert Journey",
    category: "dubai-city",
    shortDescription: "Journey through the golden sands and the gleaming city.",
    description: "A perfect blend of urban exploration and desert adventure. Experience the contrasts that make Dubai so unique — from chrome skyscrapers to ancient Bedouin camps under the stars.",
    priceAed: 950,
    nights: 4,
    days: 5,
    imageUrl: "",
    galleryImages: [],
    inclusions: ["4 Nights hotel", "Airport transfers", "City tour", "Overnight desert safari", "Camel ride", "BBQ dinner", "Cultural show"],
    exclusions: ["International flights", "Visa fees", "Alcoholic beverages"],
    highlights: ["Overnight desert camp", "Dune bashing", "Camel caravan", "Bedouin cultural show", "Stargazing in the desert"],
    isFeatured: false,
    rating: 4.6,
    reviewCount: 382,
    tags: ["desert", "adventure", "cultural"],
  },
  {
    id: 8,
    slug: "dubai-perfection-memories",
    title: "Dubai Perfection Memories with Dubai Nights",
    category: "holiday",
    shortDescription: "Perfect moments, unforgettable nights in glittering Dubai.",
    description: "A luxurious package designed for those who seek perfection. Evenings in Dubai come alive with illuminated fountains, rooftop dining, and Marina cruises — this package captures it all.",
    priceAed: 1850,
    nights: 5,
    days: 6,
    imageUrl: "",
    galleryImages: [],
    inclusions: ["5 Nights hotel", "Private airport transfers", "Night city tour", "Rooftop dinner experience", "Desert safari", "Dubai Fountain show", "Burj Khalifa"],
    exclusions: ["International flights", "Visa fees", "Personal expenses"],
    highlights: ["Dubai Fountain", "Night city tour", "Rooftop dining", "Desert safari", "Palm Jumeirah"],
    isFeatured: false,
    rating: 4.7,
    reviewCount: 291,
    tags: ["nights", "luxury", "dining"],
  },
];

export const activities: Activity[] = [
  {
    id: 1,
    slug: "desert-safari",
    title: "Desert Safari Dubai",
    category: "adventure",
    shortDescription: "Dune bashing, BBQ dinner, camel rides — the classic Dubai adventure.",
    description: "The quintessential Dubai experience. Race over golden dunes in a 4x4, watch the sunset paint the desert in amber and rose, then settle into a traditional Bedouin camp for a lavish BBQ dinner under a canopy of stars. With live entertainment, camel rides, henna painting, and shisha, a desert safari is the memory you'll carry home from Dubai.",
    priceAed: 150,
    duration: "6-7 hours (evening: 3pm–10pm)",
    imageUrl: "/images/dune-bashing-premium.png",
    galleryImages: [
      "/images/dune-bashing-premium.png",
      "/images/camel-ride-premium.png",
      "/images/quad-bike-premium.png",
      "/images/vip-seating-premium.png",
      "/images/live-bbq-premium.png",
      "/images/tanoura-dance-premium.png",
      "/images/sandboarding-premium.png",
      "/images/morning-safari-premium.png"
    ],
    inclusions: ["Hotel pickup & drop-off", "Dune bashing in 4x4", "Camel ride", "Sandboarding", "Sunset photography", "BBQ dinner (veg & non-veg)", "Live entertainment (Tanoura & fire show)", "Henna painting", "Shisha"],
    options: [
      { 
        name: "Classic Desert Safari", 
        priceAed: 200, 
        description: "Duration: 6h | Start: 03:00 PM | Guide: Hindi, Arabic, English, Urdu", 
        longDescription: "Cherish an unforgettable Evening Desert Safari, with 4X4 off-road thrilling Dune bashing experience of Rich dunes with wow!! sunset views. Experience and Enjoy Arabian culture and heritage along the trip like of Riding camel, Experiencing Shisha smoking, Quad Biking & Buggy Riding experience, pose for souvenir pictures in traditional Emirati dress, and Arabian henna tattoos designs. Lavish BBQ dinner that comes with vegetarian and non-vegetarian dishes and unlimited Buffet. Relax and enjoy live shows like Folk Dance, Fire Show, Belly Dance & Tanura dance.",
        highlights: ["Ages 3 and above.", "Duration: 6h", "Start time: 03:00 PM (TBA)", "Pick Up : Hotel within Dubai City Limit & Sharjah City Limit.", "Live guide: Hindi, Arabic, English, Urdu"],
        inclusions: ["4x4 Pickup & Drop-off Transfer", "Dune Bashing, Camel Ride", "Live Shows: Fire, Tanura & Belly Dance & Arabic Folk Dance.", "BBQ Dinner (Veg & Non-Veg)", "Arabic Traditional Costume Photography, Heena Tattoos", "Refreshment (Coffee, Juice, Tea, Soft Drinks, Water)"],
        exclusions: ["Vip Sitting Area (Pre-booking with additional cost)", "Quad Biking & Buggy Riding (Pre-Booking with additional cost)", "Sandboarding (Subject to availability)"]
      },
      { 
        name: "Desert Safari Premium", 
        priceAed: 550, 
        description: "Duration: 6h | Start: 03:00 PM | Guide: Hindi, Arabic, English, Urdu", 
        longDescription: "Cherish an unforgettable Evening Desert Safari, with 4X4 off-road thrilling Dune bashing experience of Rich dunes with wow!! sunset views. Experience and Enjoy Arabian culture and heritage along the trip like of Riding camel, Experiencing Shisha smoking, Quad Biking & Buggy Riding experience, pose for souvenir pictures in traditional Emirati dress, and Arabian henna tattoos designs. Lavish BBQ dinner that comes with vegetarian and non-vegetarian dishes and unlimited Buffet. Relax and enjoy live shows like Folk Dance, Fire Show, Belly Dance & Tanura dance.",
        highlights: ["Ages 3 and above.", "Duration: 6h", "Start time: 03:00 PM (TBA)", "Safari guide: Hindi, Arabic, English, Urdu"],
        inclusions: ["4x4 Pickup & Drop-off Transfer", "Dune Bashing, Camel Ride", "Live Shows: Fire, Tanura & Belly Dance & Arabic Folk Dance.", "Live BBQ Dinner (Veg & Non-Veg)", "Arabic Traditional Costume Photography, Heena Tattoos", "VIP seating Area.", "Live BBQ Station.", "Refreshment (Coffee, Juice, Tea, Soft Drinks, Water)"],
        exclusions: ["Quad Biking & Buggy Riding (Pre-Booking with additional cost)", "Sandboarding (Pre-Booking with additional cost)"]
      },
      { 
        name: "Desert Safari With Quad Bike", 
        priceAed: 650, 
        description: "Duration: 6h | Start: 03:00 PM | Ages: 18+ | Guide: Hindi, Arabic, English, Urdu", 
        longDescription: "Cherish an unforgettable Evening Desert Safari, with 4X4 off-road thrilling Dune bashing experience of Rich dunes with wow!! sunset views. Experience and Enjoy Arabian culture and heritage along the trip like of Riding camel, Experiencing Shisha smoking, Quad Biking & Buggy Riding experience, pose for souvenir pictures in traditional Emirati dress, and Arabian henna tattoos designs. Lavish BBQ dinner that comes with vegetarian and non-vegetarian dishes and unlimited Buffet. Relax and enjoy live shows like Folk Dance, Fire Show, Belly Dance & Tanura dance.",
        highlights: ["Ages 18 and above.", "Duration: 6h", "Start time: 03:00 PM (TBA)", "Safari guide: Hindi, Arabic, English, Urdu"],
        inclusions: ["4x4 Pickup & Drop-off Transfer", "Dune Bashing, Camel Ride", "Live Shows: Fire, Tanura & Belly Dance & Arabic Folk Dance.", "Live BBQ Dinner (Veg & Non-Veg)", "Arabic Traditional Costume Photography, Heena Tattoos", "VIP seating Area.", "Live BBQ Station.", "Refreshment (Coffee, Juice, Tea, Soft Drinks, Water)", "25 minutes Quad Bike riding."],
        exclusions: ["Sandboarding (pre-booking with additional cost)"]
      },
      { 
        name: "Morning Desert Safari", 
        priceAed: 500, 
        description: "Duration: 4h | Start: 08:00 AM | Guide: English, Hindi, Arabic", 
        longDescription: "Enjoy 4-hour Morning safari tour lets you experience a complete desert adventure. Start with a roller coaster drive in the desert by 4X4 WD vehicle. Follow this with a modern desert adventure as you skid down the high sand dunes and continue onwards to a friendly Bedouin desert Camp, Experience the captivating charm and serenity of the Arabian Desert by the first rays of dawn with splendid view for memorable pictures. At camp, join your Bedouin guides and take a camel ride through the dunes. Travel on the ships of the desert, just as nomads have done for thousands of years. You will head back to your hotel after your camel ride, arriving in the city by noon.",
        highlights: ["Ages 3 and above.", "Duration: 4h", "Start time: 08:00 AM (TBA)", "Safari guide: English Hindi, Arabic"],
        inclusions: ["4x4 Pickup & Drop-off Transfer", "Dune Bashing, Camel Ride", "Refreshment (Juice, Soft Drinks, Water)"],
        exclusions: ["Quad Biking & Buggy Riding (Pre-Booking with additional cost)", "Sandboarding (Pre-Booking with additional cost)"]
      },
    ],
    faqs: [
      { question: "What should I wear for the desert safari?", answer: "Wear comfortable, loose-fitting clothing. Light cotton is ideal. Closed shoes are recommended for dune bashing. A light jacket or shawl is useful for the evening when temperatures drop." },
      { question: "Is dune bashing safe?", answer: "Yes, all our drivers are professionally trained and experienced. Our vehicles are fully insured and maintained to the highest standards. Seat belts must be worn at all times during dune bashing." },
      { question: "Is the BBQ dinner included?", answer: "Yes, a generous BBQ buffet dinner with vegetarian and non-vegetarian options is included in all safari packages. Soft drinks are included; alcoholic beverages are available at an extra charge." },
      { question: "What time does the safari start and end?", answer: "Evening safaris typically start with hotel pickup between 3:00–3:30 PM and return by 10:00–10:30 PM. Morning safaris depart at 6:00 AM and return by noon." },
      { question: "Can children join the desert safari?", answer: "Yes, children are welcome. However, dune bashing is not recommended for infants under 3 years, pregnant women, or people with back/neck problems. These guests can wait comfortably at the camp." },
    ],
    relatedActivitySlugs: ["dhow-cruise", "skydiving", "city-tour"],
    rating: 4.8,
    reviewCount: 1243,
  },
  {
    id: 2,
    slug: "water-activities",
    title: "Water Activities Dubai",
    category: "water-sports",
    shortDescription: "Jet ski, parasailing, banana boat, and yacht — thrill meets the Arabian Gulf.",
    description: "Dubai's warm turquoise waters are the perfect playground. Whether you crave the rush of a jet ski, the bird's-eye view of parasailing over the Palm, or a leisurely cruise on a private yacht, our water sports packages deliver pure aquatic exhilaration with safety as our top priority.",
    priceAed: 200,
    duration: "1-3 hours (depending on activity)",
    imageUrl: "",
    galleryImages: [],
    inclusions: ["Life jackets & safety equipment", "Trained instructor", "Hotel transfers (yacht packages)", "Fuel & gear"],
    options: [
      { name: "Jet Ski (30 minutes)", priceAed: 200, description: "Ride the waves on a powerful jet ski along JBR or Marina", inclusions: ["30 min ride", "Life jacket", "Safety briefing", "Instructor on standby"] },
      { name: "Parasailing", priceAed: 350, description: "Soar 150m above the Arabian Gulf with panoramic Dubai views", inclusions: ["Full flight (15-20 min)", "Life jacket", "Boat ride", "GoPro video"] },
      { name: "Banana Boat (per person)", priceAed: 100, description: "Fun group ride — hold on tight!", inclusions: ["15-min ride", "Life jacket", "Safety briefing"] },
      { name: "Private Yacht (2 hours)", priceAed: 1800, description: "Cruise Dubai's Marina on a luxury private yacht", inclusions: ["2-hr private yacht", "Captain & crew", "Soft drinks", "Snorkeling gear", "Swimming stop"] },
    ],
    faqs: [
      { question: "Do I need to know how to swim?", answer: "Swimming ability is recommended but not mandatory for jet ski or parasailing as life jackets are always provided. For snorkeling and swimming from yachts, basic swimming ability is helpful." },
      { question: "What is the minimum age?", answer: "Jet ski requires a minimum age of 16 (or accompanied by an adult). Parasailing and banana boat: 8 years and above. Yacht charters: all ages welcome." },
      { question: "What should I bring?", answer: "Wear your swimwear under your clothes. Bring sunscreen (reef-safe preferred), a towel, sunglasses, and a change of clothes. Waterproof bags are available to store valuables." },
    ],
    relatedActivitySlugs: ["desert-safari", "skydiving", "dhow-cruise"],
    rating: 4.7,
    reviewCount: 876,
  },
  {
    id: 3,
    slug: "skydiving",
    title: "Skydiving Dubai",
    category: "extreme",
    shortDescription: "Freefall over the Palm Jumeirah or the open desert — Dubai from 13,000 feet.",
    description: "There is no view in the world quite like Dubai from 13,000 feet — and no feeling like freefall. Choose between the legendary Palm Drop Zone for iconic coastal views or the vast Desert Drop Zone for a pure skydiving experience over endless golden dunes. Tandem jumps with certified USPA instructors make this the safest way to experience the ultimate thrill.",
    priceAed: 2299,
    duration: "4-5 hours (including briefing, training, and jump)",
    imageUrl: "",
    galleryImages: [],
    inclusions: ["Tandem jump with certified instructor", "Full safety briefing & training", "Jump suit & equipment", "Certificate of completion"],
    options: [
      { name: "Palm Drop Zone — Tandem Jump", priceAed: 2299, description: "Freefall over the iconic Palm Jumeirah with views of Dubai Marina", inclusions: ["Tandem jump", "Equipment", "Certificate"] },
      { name: "Palm Drop Zone + Video", priceAed: 2899, description: "Same jump with professional video & photos of your experience", inclusions: ["Tandem jump", "Equipment", "Certificate", "HD video", "Photos (USB)"] },
      { name: "Desert Drop Zone — Tandem Jump", priceAed: 1899, description: "Jump over Dubai's dramatic desert landscape from 13,000 ft", inclusions: ["Tandem jump", "Equipment", "Certificate"] },
    ],
    faqs: [
      { question: "Do I need prior experience?", answer: "No experience needed. All our jumps are tandem — you are harnessed to a certified USPA instructor who handles all technical aspects. You just need to enjoy the ride." },
      { question: "What are the physical requirements?", answer: "You must be at least 18 years old and weigh less than 100 kg (220 lbs). You should be in general good health, free from heart conditions, recent surgeries, or serious musculoskeletal issues. A medical disclaimer must be signed." },
      { question: "What if the weather is bad?", answer: "Skydiving is weather-dependent. Jumps may be rescheduled due to high winds or cloud cover. We will notify you as early as possible and offer a free reschedule or full refund." },
      { question: "How long does the actual freefall last?", answer: "Freefall from 13,000 feet lasts approximately 60 seconds at speeds up to 200 km/h. The parachute canopy ride adds another 5-7 minutes of scenic flight back to the drop zone." },
    ],
    relatedActivitySlugs: ["desert-safari", "water-activities", "burj-khalifa"],
    rating: 4.9,
    reviewCount: 542,
  },
  {
    id: 4,
    slug: "car-rental",
    title: "Car Rental Dubai",
    category: "transport",
    shortDescription: "Economy to supercar — explore Dubai at your own pace.",
    description: "Freedom to explore Dubai on your own schedule. Our fleet ranges from practical economy cars for budget-conscious explorers to exotic supercars and luxury SUVs for those who want to arrive in style. All vehicles are fully insured, well-maintained, and come with 24/7 roadside assistance.",
    priceAed: 120,
    duration: "Daily / Weekly",
    imageUrl: "",
    galleryImages: [],
    inclusions: ["Fully comprehensive insurance", "24/7 roadside assistance", "Unlimited mileage (most categories)", "Airport delivery & collection"],
    options: [
      { name: "Economy Car (Daily)", priceAed: 120, description: "Toyota Yaris, Nissan Micra, or similar — perfect for city driving", inclusions: ["Insurance", "24/7 support", "Unlimited mileage"] },
      { name: "Mid-Range Sedan (Daily)", priceAed: 180, description: "Toyota Camry, Hyundai Sonata, or similar — comfort meets value", inclusions: ["Insurance", "24/7 support", "Unlimited mileage", "GPS"] },
      { name: "Luxury Car (Daily)", priceAed: 450, description: "Mercedes E-Class, BMW 5 Series, or similar — travel in style", inclusions: ["Insurance", "24/7 support", "Unlimited mileage", "GPS", "Priority service"] },
      { name: "Luxury SUV (Daily)", priceAed: 650, description: "Range Rover, Audi Q7, or similar — commanding presence", inclusions: ["Insurance", "24/7 support", "Unlimited mileage", "GPS", "Priority service"] },
      { name: "Supercar (Daily)", priceAed: 1800, description: "Ferrari, Lamborghini, Porsche — make Dubai your racetrack", inclusions: ["Insurance", "24/7 support", "150 km/day included", "GPS"] },
    ],
    faqs: [
      { question: "What documents do I need to rent a car?", answer: "You need a valid passport, valid driving licence (international driving permit recommended for non-GCC nationals), and a credit card for the security deposit." },
      { question: "What is the minimum rental period?", answer: "The minimum rental period is 24 hours (1 day). Weekly and monthly rates offer significant discounts." },
      { question: "Can I drive to Abu Dhabi or other Emirates?", answer: "Yes, inter-emirate driving is permitted for most vehicles. Some luxury and exotic cars may have restrictions. Please confirm when booking." },
    ],
    relatedActivitySlugs: ["city-tour", "desert-safari", "theme-parks"],
    rating: 4.6,
    reviewCount: 734,
  },
  {
    id: 5,
    slug: "city-tour",
    title: "Dubai City Tour",
    category: "sightseeing",
    shortDescription: "Old meets new — a comprehensive tour of Dubai's iconic landmarks.",
    description: "Explore both Old Dubai and modern Dubai on a thrilling city tour. Begin with the historic heart of the city at Al Fahidi Historical Neighbourhood, where traditional wind-tower houses and heritage architecture reveal Dubai's roots. Continue to Dubai Creek and experience the atmosphere of the city's historic trading district, with time to explore the traditional Gold Souk and Spice Souk. Marvel at Zabeel Palace’s grandeur, admire the sail-shaped Burj Al Arab, stop at Al Qasr, and capture the magnificence of the largest-of-its-kind Dubai Frame and Atlantis The Palm.",
    priceAed: 200,
    duration: "Half day (4-5 hours) or Full day (7-8 hours)",
    imageUrl: "/images/city-tour-dubai.jpg",
    galleryImages: [
      "/images/city-tour-dubai.jpg",
      "/images/burj-khalifa-view.jpg",
      "/images/hero-dhow-cruise.jpg",
      "/images/water-sports-dubai.jpg",
      "/images/hero-desert-safari.jpg"
    ],
    highlights: [
      "Explore historic Al Fahidi Neighbourhood & Al Bastakiya Quarter",
      "Traditional Abra Boat Ride across Dubai Creek",
      "Browse world-famous Gold Souk & Spice Souk",
      "Iconic Photo stops: Burj Al Arab, Atlantis The Palm, Museum of the Future & Dubai Frame",
      "Visit Blue Mosque (Farooq Omar Bin Khatib Mosque)",
      "Explore Dubai Mall, Aquarium & Fountain show area"
    ],
    inclusions: [
      "Hotel pickup & drop-off (SIC sharing transfer or Private Luxury Car)",
      "Air-conditioned vehicle with professional guide / driver",
      "Abra ride crossing to Gold Souk & Spice Souk",
      "Photo stops at Zabeel Palace, Dubai Frame, Burj Al Arab & Atlantis",
      "Visit to Al Bastakiya Quarter & Old Houses",
      "Complimentary Mineral Water"
    ],
    howToRedeem: [
      "Shortly after the completion of booking, you'll receive your tour confirmation voucher in your email.",
      "Make sure that you check your spam / junk folder or notify us in case you don't find it in your inbox.",
      "Show this voucher on your phone or print it to redeem."
    ],
    importantInfo: [
      "Please arrive at your hotel lobby 15 minutes prior to scheduled pickup time.",
      "Modest dress code is recommended when visiting historic sites and mosques.",
      "Entry tickets for attractions (Burj Khalifa, Dubai Frame interior, etc.) are not included unless specified."
    ],
    options: [
      {
        name: "Dubai City Tour (Half day) SIC",
        priceAed: 200,
        description: "Duration: 5h | Start: 09:00 AM (TBA) | Guide: Hindi, Arabic, English, Urdu",
        longDescription: "Explore both Old Dubai and modern Dubai city tour. Begin with the historic heart of the city at Al Fahidi Historical Neighbourhood, where traditional wind-tower houses and heritage architecture reveal Dubai's roots. Continue to Dubai Creek and experience the atmosphere of the city's historic trading district, with time to explore the traditional Gold Souk and Spice Souk.\n\nMarvel at Zabeel Palace’s grandeur, admire the sail-shaped Burj Al Arab, stop at Al Qasr, and capture the magnificence of the largest-of-its-kind Dubai Frame And Atlantis the palm.",
        highlights: [
          "Ages 1 and above.",
          "Duration: 5 hours",
          "Start time: 09:00 AM (TBA)",
          "Safari guide: Hindi, Arabic, English, Urdu"
        ],
        inclusions: [
          "Sharing Transfer to tour departure from your hotel",
          "Photo stops at Zabeel Palace, Dubai Frame, Burj Al Arab, Atlantis, The Palm, and The Pointe",
          "Visit to Dubai Museum and Bastakiya and old houses",
          "Abra Ride crossing to Gold Souk",
          "Jumeirah Mosque / Driver Etihad Museum / Dubai Frame",
          "Photo stop at Burj Al Arab and Jumeirah Beach and Atlantis",
          "Passing Via Dubai Mall",
          "Mineral Water"
        ],
        exclusions: [
          "Entry Tickets for all Attractions",
          "Private Transfers"
        ]
      },
      {
        name: "Dubai City Tour (Full day) SIC",
        priceAed: 400,
        description: "Duration: 7/8h | Start: 01:00 PM (TBA) | Guide: Hindi, Arabic, English, Urdu",
        longDescription: "Explore both Old Dubai and modern Dubai city tour. Begin with the historic heart of the city at Al Fahidi Historical Neighbourhood, where traditional wind-tower houses and heritage architecture reveal Dubai's roots. Continue to Dubai Creek and experience the atmosphere of the city's historic trading district, with time to explore the traditional Gold Souk and Spice Souk.\n\nMarvel at Zabeel Palace’s grandeur, admire the sail-shaped Burj Al Arab, stop at Al Qasr, and capture the magnificence of the largest-of-its-kind Dubai Frame And Atlantis the palm.\n\nWhether you want to explore Old Dubai, see the modern Downtown skyline, visit the famous Burj Al Arab, discover Dubai Marina or experience the city's most iconic attractions, this full-day Sharing Dubai sightseeing tour provides a convenient and comprehensive way to experience the best of Dubai along with multicultural travellers along the way.",
        highlights: [
          "Ages 1 and above.",
          "Duration: 7/8 H",
          "Start time: 1:00 PM (TBA)",
          "Safari guide: Hindi, Arabic, English, Urdu"
        ],
        inclusions: [
          "Shuttle pickup from hotel",
          "Photo stop at Dubai Frame",
          "Visit Al Bastakiya Quarter",
          "Abra Ride",
          "Visit to Gold Souq and Spice Souq",
          "Photo stop at the Museum of the Future",
          "Visit Farooq Omar Bin Khatib Mosque – Blue Mosque",
          "Photo stop at Burj Al Arab",
          "Photo stop at Zabeel Saray Hotel",
          "Monorail ride to Atlantis, the Palm",
          "Visit Dubai Mall, including Walking past Dubai Mall Aquarium, waterfall, and visit fountain show area",
          "Shuttle drop-off back to hotel",
          "Mineral Water"
        ],
        exclusions: [
          "Entry Tickets for all Attractions",
          "Private Transfers"
        ]
      },
      {
        name: "Dubai City Tour with Private Car (Half Day)",
        priceAed: 500,
        description: "Duration: 4/5h | Start: Customized Time (TBA) | Guide: Hindi, Arabic, English, Urdu",
        longDescription: "Explore both Old Dubai and modern Dubai city tour with a private luxury car. Begin with the historic heart of the city at Al Fahidi Historical Neighbourhood, where traditional wind-tower houses and heritage architecture reveal Dubai's roots. Continue to Dubai Creek and experience the atmosphere of the city's historic trading district, with time to explore the traditional Gold Souk and Spice Souk.\n\nMarvel at Zabeel Palace’s grandeur, admire the sail-shaped Burj Al Arab, stop at Al Qasr, and capture the magnificence of the largest-of-its-kind Dubai Frame And Atlantis the palm.",
        highlights: [
          "Ages 1 and above.",
          "Duration: 4/5 hours",
          "Start time: Customized Time (TBA)",
          "Safari guide: Hindi, Arabic, English, Urdu"
        ],
        inclusions: [
          "Pickup and drop-off from your Hotel accommodation",
          "Visit to Spice Souk",
          "Visit to Gold Souk",
          "Visit to Dubai Creek",
          "Dubai Museum (Optional)",
          "Dubai Frame (Photo stop)",
          "Visit to Jumeirah Mosque (Photo stop)",
          "Visit to Jumeirah Beach",
          "Burj Al Arab (Photo stop)",
          "Madinat Jumeirah",
          "Palm Jumeirah",
          "Atlantis Hotel",
          "Passing New Dubai",
          "Dubai Marina",
          "Burj Khalifa (Photo stop)",
          "Dubai Mall",
          "Za'abeel Palace (Optional)"
        ],
        exclusions: [
          "Entry Tickets for Attractions",
          "Lunch / Dinner",
          "Additional Hour (Charges apply)"
        ]
      },
      {
        name: "Dubai City Tour with Private Car (Full Day)",
        priceAed: 800,
        description: "Duration: 8h | Start: 01:00 PM (TBA) | Guide: Hindi, Arabic, English, Urdu",
        longDescription: "Visit and Explore with Private Luxury Car both Old Dubai and modern Dubai city tour. Begin with the historic heart of the city at Al Fahidi Historical Neighbourhood, where traditional wind-tower houses and heritage architecture reveal Dubai's roots. Continue to Dubai Creek and experience the atmosphere of the city's historic trading district, with time to explore the traditional Gold Souk and Spice Souk.\n\nMarvel at Zabeel Palace’s grandeur, admire the sail-shaped Burj Al Arab, stop at Al Qasr, and capture the magnificence of the largest-of-its-kind Dubai Frame And Atlantis the palm.\n\nWhether you want to explore Old Dubai, see the modern Downtown skyline, visit the famous Burj Al Arab, discover Dubai Marina or experience the city's most iconic attractions, this full-day tour provides a convenient and comprehensive private way to experience the best of Dubai along with multicultural travellers along the way.",
        highlights: [
          "Ages 1 and above.",
          "Duration: 8 Hours",
          "Start time: 1:00 PM (TBA)",
          "Safari guide: Hindi, Arabic, English, Urdu"
        ],
        inclusions: [
          "Shuttle / Private pickup from hotel",
          "Photo stop at Dubai Frame",
          "Visit Al Bastakiya Quarter",
          "Abra Ride",
          "Visit to Gold Souq and Spice Souq",
          "Photo stop at the Museum of the Future",
          "Visit Farooq Omar Bin Khatib Mosque – Blue Mosque",
          "Photo stop at Burj Al Arab",
          "Photo stop at Zabeel Saray Hotel",
          "Monorail ride to Atlantis, the Palm",
          "Visit Dubai Mall, including Walking past Dubai Mall Aquarium, waterfall, and visit fountain show area",
          "Shuttle / Private drop-off back to hotel",
          "Mineral Water"
        ],
        exclusions: [
          "Entry Tickets for all Attractions",
          "Private Transfers (if not selected)"
        ]
      }
    ],
    faqs: [
      { question: "Is the Burj Khalifa included in the city tour?", answer: "The exterior of Burj Khalifa is included as a photo stop. Entry tickets to the observation deck can be added as an upgrade." },
      { question: "Is the tour private or shared?", answer: "We offer both shared (SIC) and private luxury car tours. Private tours allow customized pickup times and flexible itineraries." },
      { question: "What should I wear during the city tour?", answer: "Modest, comfortable clothing is recommended. Shoulders and knees should be covered when visiting religious sites like Blue Mosque." },
      { question: "What is included in the Abra ride?", answer: "The traditional wooden Abra boat ride across Dubai Creek to access the Gold and Spice Souks is included in all city tour packages." }
    ],
    relatedActivitySlugs: ["burj-khalifa", "dhow-cruise", "desert-safari"],
    rating: 4.8,
    reviewCount: 1087,
  },
  {
    id: 6,
    slug: "burj-khalifa",
    title: "Burj Khalifa — At The Top",
    category: "attractions",
    shortDescription: "Ascend the world's tallest tower — Dubai from the sky.",
    description: "Standing at 828 metres, the Burj Khalifa is the world's tallest building and Dubai's defining icon. The 'At The Top' experience takes you to the 124th and 125th floor observation decks, with a 360-degree panorama stretching from the desert to the sea. Upgrade to Sky for the 148th floor — the highest observation deck in the world.",
    priceAed: 149,
    duration: "1.5-2 hours",
    imageUrl: "",
    galleryImages: [],
    inclusions: ["High-speed elevator ride", "Access to observation decks", "Multimedia experience in the lobby"],
    options: [
      { name: "At The Top — Non-Prime (124th & 125th Floor)", priceAed: 149, description: "Daytime visit (9 AM–4 PM) with panoramic views", inclusions: ["124th & 125th floor access", "Multimedia lobby experience"] },
      { name: "At The Top — Prime Time (Sunset/Evening)", priceAed: 379, description: "Golden hour and evening visits — the most spectacular time", inclusions: ["124th & 125th floor access", "Prime time slot", "Multimedia lobby experience"] },
      { name: "At The Top Sky — 148th Floor", priceAed: 619, description: "World's highest outdoor observation deck — exclusive experience", inclusions: ["148th floor access", "Welcome drink", "Dedicated concierge", "Souvenir"] },
    ],
    faqs: [
      { question: "How high are the observation decks?", answer: "The At The Top experience covers levels 124 and 125 at approximately 452 and 456 metres. The At The Top Sky experience takes you to level 148 at approximately 555 metres — the highest observation deck in the world." },
      { question: "How long does the experience take?", answer: "Plan for 1.5 to 2 hours including the lobby multimedia experience and time on the observation deck. The high-speed elevator takes approximately 60 seconds to reach the top." },
      { question: "Do I need to book in advance?", answer: "Booking in advance is strongly recommended as time slots sell out quickly, especially for prime-time (sunset) visits. Walk-in tickets are subject to availability and are priced higher." },
    ],
    relatedActivitySlugs: ["city-tour", "dhow-cruise", "theme-parks"],
    rating: 4.9,
    reviewCount: 2134,
  },
  {
    id: 7,
    slug: "dhow-cruise",
    title: "Dhow Cruise",
    category: "dining-cruise",
    shortDescription: "Romantic dinner cruise on a traditional wooden dhow — Marina or Creek.",
    description: "Drift along Dubai's shimmering waterways on a beautifully decorated traditional wooden dhow while enjoying a lavish international buffet dinner, live entertainment, and breathtaking views of the illuminated skyline. Choose between the glamorous Dubai Marina or the historic Dubai Creek.",
    priceAed: 55,
    duration: "2 hours (8:00 PM – 10:00 PM)",
    operatingHours: "08:00 AM to 08:00 PM",
    imageUrl: "/images/ultra-luxury-private-yacht.png",
    galleryImages: [
      "/images/ultra-luxury-private-yacht.png",
      "/images/dhow-cruise-creek-premium.png",
      "/images/mega-yacht-lotus-premium.png",
      "/images/premium-marina-dinner-yacht.png",
      "/images/dhow-cruise-marina-premium.png"
    ],
    highlights: [
      "Discover one of the region's most historic spots, the way it is meant to be with our Dhow Cruise Creek.",
      "Sail aboard a traditional wooden dhow which once played a vital part in boosting the region's economy.",
      "Treat yourself to the most compelling and contrasting city skyline views as you cruise down the creek in a relaxing pace for about 90 minutes.",
      "See the region's age-old structures, intricate modern architecture, and atmospheric settings all from the open-air upper deck.",
      "Dine national buffet dinner with a choice of vegetarian and non-vegetarian dishes.",
      "Enjoy much-loved buffet style dining (with vegetarian and non-vegetarian delicacies) during the Dhow Cruise Dubai Creek.",
      "Be in awe at the dazzling performance of the brilliant Tanoura artist onboard."
    ],
    inclusions: [
      "90 minutes cruising near to Bur Dubai and Deira Creek area.",
      "Welcome drinks, Water, Tea & Coffee.",
      "International buffet dinner with a choice of vegetarian and non-vegetarian dishes.",
      "Access to fully air conditioned lower deck and open air upper deck.",
      "Separate washroom facilities for men and women.",
      "Tanoura show and soft background music.",
      "Transfer (If selected)",
      "NOTE: Please check Option wise Inclusions for every product before booking"
    ],
    howToRedeem: [
      "Shortly after the completion of booking, you'll receive your tour confirmation voucher in your email.",
      "Make sure that you check your spam / junk folder or notify us in case you don't find it in your inbox.",
      "Show this voucher on your phone or print it to redeem."
    ],
    importantInfo: [
      "Please arrive at the boarding point 30 minutes prior to departure.",
      "Subject to availability and weather conditions."
    ],
    location: {
      title: "Al Seef Street - Dubai - United Arab Emirates",
      address: "Al Seef St - Dubai - United Arab Emirates",
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3608.243553258813!2d55.30906231501062!3d25.26239198386629!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f433994c6ec07%3A0xe5a363f721e069c9!2sAl%20Seef%20St%20-%20Dubai%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2s!4v1680000000000!5m2!1sen!2s"
    },
    options: [
      { 
        name: "Traditional Dhow Cruise at Old Dubai ( Al Seef )", 
        priceAed: 55, 
        description: "Duration: 2h | Start: 08:00 PM (TBA)", 
        longDescription: "Eperience about the history of the dhow, a traditional wooden boat that has been used for centuries in the Arabian Gulf, Enjoy the stunning views of Dubai's historic landmarks and experience a slice of Dubai's maritime heritage on a traditional wooden Dhow. Enjoy a buffet dinner on a traditional dhow boat as you cruise along the creek and entertained by live music, traditional dance performances, and (puppet show - Selective days) Capture the glittering skyline of Dubai with the city lights at sunset and view of Old Souk and water taxis.",
        highlights: ["Ages infant and above.", "Duration: 2h", "Start time: 08:00 PM (TBA)"],
        inclusions: ["Dhow cruise Ride 02 Hours", "Open international Buffet dinner (Includes Veg & Non-Veg)", "Unlimited Water & Soft Drinks on Board", "Live entertainment Shows", "Alcoholic drinks (Option Available with extra Cost)", "Hotel Transportation (Option Available with Extra Cost)", "VIP table Upper Deck (Option available with Extra Cost )"],
        exclusions: ["Hotel Transportation", "Alcoholic Drinks", "VIP Table Upper Deck"]
      },
      { 
        name: "Traditional Dhow Cruise at Dubai Marina", 
        priceAed: 120, 
        description: "Duration: 2h | Start: 08:00 PM (TBA)", 
        longDescription: "Cruise along Modern Dubai Marina on a Dinner boat cruise. cheer on stunning views of the city's modern architecture of iconic skyscrapers, luxury hotels and mind blowing illuminated colourful lights at the go. Hop on a traditional Arabian dhow boat, offering a comfortable and stylish setting to enjoy the sights seeing while dinning. Enjoy gourmet dining options of Veg & Non-Veg Savors of international cuisine while watching live entertainment such as music, dance performances, or cultural shows. Enjoy numerous photo opportunities along the way, especially against the backdrop of the Arabian Gulf and capture the memorable moments.",
        highlights: ["Ages infant and above.", "Duration: 2h", "Start time: 08:00 PM (TBA)"],
        inclusions: ["Dhow cruise Ride 02 Hours", "Open international Buffet dinner (Includes Veg & Non-Veg)", "Unlimited Water & Soft Drinks on Board", "Live entertainment Shows", "Alcoholic drinks (Option Available with extra Cost)", "Hotel Transportation (Option Available with Extra Cost)", "VIP table Upper Deck (Option available with Extra Cost )"],
        exclusions: ["Hotel Transportation", "Alcoholic Drinks", "VIP Table Upper Deck"]
      },
      { 
        name: "Mega Yacht Dinner Cruise ( The Lotus )", 
        priceAed: 500, 
        description: "Duration: 2h | Start: 06:45 PM (TBA)", 
        longDescription: "Experience the Cruise liner feeling on a Mega Yacht at Dubai Marina (Lotus) Explore the largest mega yacht and sail past the iconic sights of Dubai Marina skyline and passing via Palm Jumeirah and Atlantis the palm. Departing from the Dubai Marina canal and cruise across Jumeirah Beach Residence, Ain Dubai panoramic wheel towards Atlantis Hotel situated on the outer crown of the famous Palm Jumeirah. Enjoy varieties of canapes, international buffet and live cooking stations. Discover multiple decks and experience the dining areas, enjoy a wide selection of local and international Buffet dishes and cocktails. Live performance shows, aerial feats, traditional dances and DJ music will keep you entertained throughout the cruise.",
        highlights: ["Ages infant and above.", "Duration: 2h", "Start time: 06:45 PM (TBA)"],
        inclusions: ["Professional captain and crew", "Unique Designed Yacht", "Safety equipment", "Live entertainment, in-house DJ", "Top observation deck access (Standard ticket option- no table or seating)", "International buffet dishes in the main saloon or live station (open for all)", "Soft drinks, juices, water", "Bar tenders and buffet service staff", "Access to a reserved table in the separate sky-deck (VIP ticket option)", "Canapés are served directly at the table (VIP ticket option)", "Self-service buffet in the main saloon (VIP ticket option)", "Priority check-in lounge (VIP ticket option)", "Welcome soft drinks (VIP ticket option)", "Hotel pick up and drop off (Option available)"],
        exclusions: ["WiFi", "Paid parking", "Hotel Transportation (Option Available with VIP Package)", "Alcoholic Drinks (Available with VIP package)", "VIP Table Reservation Upper Deck (Available with VIP Package)"]
      },
      { 
        name: "Marina Dinner Cruise (Exclusive Yacht )", 
        priceAed: 700, 
        description: "Duration: 1h 30m | Start: 08:00 PM | Guide: English", 
        longDescription: "Experience the Cruise liner feeling on a Mega Yacht at Dubai Marina (Lotus) Explore the largest mega yacht and sail past the iconic sights of Dubai Marina skyline and passing via Palm Jumeirah and Atlantis the palm. Departing from the Dubai Marina canal and cruise across Jumeirah Beach Residence, Ain Dubai panoramic wheel towards Atlantis Hotel situated on the outer crown of the famous Palm Jumeirah. Enjoy varieties of canapes, international buffet and live cooking stations. Discover multiple decks and experience the dining areas, enjoy a wide selection of local and international Buffet dishes and cocktails. Live performance shows, aerial feats, traditional dances and DJ music will keep you entertained throughout the cruise.",
        highlights: ["Ages 1 and above", "Duration: 1h 30m", "Start time: 08:00 PM", "Live guide: English"],
        inclusions: ["International Buffet dinner", "Private seating ( Premium Ticket only )", "Unlimited Beers, wines and spirits (Premium Ticket only )", "Live Pasta cooking stations", "Unlimited juices, bottled water, tea & coffee", "Live Music"],
        exclusions: ["Hotel pickup and drop-off (Option available prebooking)", "VIP Package ( Option Available )"]
      },
      { 
        name: "Yacht Tour - Boat Trip for Private event", 
        priceAed: 700, 
        description: "Capacity: 10 to 150 Pax | Duration: 1–5 Hours | Captain: English Speaking", 
        longDescription: "Enjoy the best luxury yacht charter (Boat trip) in Dubai and see the city from a unique perspective. Whether you’re seeking a relaxing day at sea or an extravagant event, this luxury boat trip experience offers a chance to enjoy the city's luxury and splendor from the water. (Price is per Hour for 40ft/50ft/60ft/70ft/90ft Yachts)",
        highlights: ["Ages 1 and above", "Capacity Per Yacht – 10 Pax to 150Pax", "Duration: Minimum 1 – 5 Hours", "Start time: As per time slot.", "Captain : English Speaking", "Enjoy your private tour with friends and family.", "Explore Dubai Marina skyline, Dubai Canal and JBR Beach", "See the Burj Al Arab and the Blue Water Island.", "Cruise around the Palm Jumeirah and see the iconic Atlantis the Palm."],
        inclusions: ["Luxury yacht charter", "Views of Dubai’s iconic landmarks", "Meet and greet", "Free Wi-Fi", "Free Soft drinks", "Free fresh towel", "Life jackets", "Music system", "BBQ Grill (Additional Charges applicable)", "Disposable cutlery and dishes", "Food and premium drinks (guest are allowed to bring food and drinks onboard)", "Transportation to and from the yacht ( Additional Charges Applicable )", "The 1-hour trip is only for the Marina Canal and JBR area"],
        exclusions: ["Swimming is not allowed.", "Any form of shoes, flipflop are not allowed onboard", "Hotel Transportation (Option Available with additional cost for pre-booking)", "Food & Beverage (Option Available for Pre Booking)", "Birthday Cakes & Party arrangement (Option Available for Pre Booking)."]
      }
    ],
    faqs: [
      { question: "What type of food is served?", answer: "An extensive international buffet featuring Arabic, Indian, continental, and live cooking stations. Vegetarian options are always available. Halal food is guaranteed." },
      { question: "Is alcohol served on board?", answer: "Standard packages serve non-alcoholic beverages including soft drinks, juices, and water. Alcoholic beverages are not included but may be available on premium packages." },
      { question: "Where do we board the dhow?", answer: "Marina Dhow: Dubai Marina Walk, near the Marina Mall. Creek Dhow: Baniyas Road, near the Heritage Village. Hotel transfers are available." },
    ],
    relatedActivitySlugs: ["city-tour", "burj-khalifa", "desert-safari"],
    rating: 4.7,
    reviewCount: 1532,
  },
  {
    id: 8,
    slug: "theme-parks",
    title: "Theme Parks & Attractions",
    category: "entertainment",
    shortDescription: "Thrills for every age — Dubai's world-class theme parks and attractions.",
    description: "Dubai is home to some of the world's most spectacular theme parks and attraction complexes. From the aquatic thrills of Atlantis Aquaventure to the cinematic world of IMG Worlds and the record-breaking rides of Ferrari World, we have tickets and packages for every thrill-seeker.",
    priceAed: 350,
    duration: "Full day (9am–7pm)",
    imageUrl: "",
    galleryImages: [],
    inclusions: ["Entry tickets", "Hotel transfers (select packages)", "Locker rental", "Park map & guide"],
    options: [
      { name: "Aquaventure Waterpark — Atlantis", priceAed: 350, description: "16 hectares of water slides, a private beach, and record-breaking rides", inclusions: ["Full-day entry", "Private beach access", "Lazy river"] },
      { name: "IMG Worlds of Adventure", priceAed: 375, description: "World's largest indoor theme park — Marvel, Cartoon Network, Jurassic & more", inclusions: ["Full-day entry", "All rides", "4D cinema"] },
      { name: "Ferrari World Abu Dhabi (Day Trip)", priceAed: 450, description: "Home to the world's fastest roller coaster — Formula Rossa", inclusions: ["Return transfer Abu Dhabi", "Full-day entry", "All rides"] },
      { name: "Dubai Frame + Museum of the Future", priceAed: 280, description: "Two of Dubai's most iconic modern attractions in one day", inclusions: ["Dubai Frame ticket", "Museum of the Future ticket", "Transfers"] },
    ],
    faqs: [
      { question: "Are theme parks suitable for young children?", answer: "Yes, all parks have attractions suitable for all age groups. Children under a certain height have designated rides. Please check individual park height restrictions when booking." },
      { question: "What should we wear to the waterpark?", answer: "Swimwear is required for Aquaventure. Modest swimwear guidelines apply. Sunscreen, hats, and sunglasses are highly recommended. Lockers are available to store valuables." },
    ],
    relatedActivitySlugs: ["city-tour", "burj-khalifa", "water-activities"],
    rating: 4.8,
    reviewCount: 967,
  },
  {
    id: 9,
    slug: "premium-desert-safari",
    title: "Premium Desert Safari",
    category: "adventure",
    shortDescription: "Exclusive premium desert experience.",
    description: "Upgrade your desert adventure with premium seating, exclusive dining, and thrilling 4x4 dune bashing.",
    priceAed: 200,
    duration: "6 Hours",
    imageUrl: "/images/premium_desert_safari.png",
    galleryImages: [],
    inclusions: ["Pickup/drop", "Dune bashing", "Camel ride", "Premium BBQ dinner"],
    options: [],
    faqs: [],
    relatedActivitySlugs: ["desert-safari"],
    rating: 4.9,
    reviewCount: 520,
  },
  {
    id: 10,
    slug: "helicopter-tour-dubai",
    title: "Helicopter Tour Dubai",
    category: "adventure",
    shortDescription: "See Dubai from the sky.",
    description: "Take to the skies and witness the spectacular Dubai skyline, Palm Jumeirah, and Burj Al Arab from above.",
    priceAed: 800,
    duration: "15-20 Mins",
    imageUrl: "/images/helicopter_tour_dubai.png",
    galleryImages: [],
    inclusions: ["Helicopter flight", "Safety briefing"],
    options: [],
    faqs: [],
    relatedActivitySlugs: ["skydiving", "city-tour"],
    rating: 5.0,
    reviewCount: 890,
  },
  {
    id: 11,
    slug: "hot-air-balloon",
    title: "Hot Air Balloon Dubai",
    category: "adventure",
    shortDescription: "Float over the Dubai desert at sunrise.",
    description: "A magical hot air balloon ride over the pristine Dubai desert conservation reserve at sunrise.",
    priceAed: 1000,
    duration: "4 Hours",
    imageUrl: "/images/hot_air_balloon.png",
    galleryImages: [],
    inclusions: ["Balloon flight", "Breakfast", "Falconry show"],
    options: [],
    faqs: [],
    relatedActivitySlugs: ["desert-safari"],
    rating: 4.9,
    reviewCount: 412,
  },
  {
    id: 12,
    slug: "global-village",
    title: "Global Village Dubai",
    category: "entertainment",
    shortDescription: "Explore the world in one place.",
    description: "Dubai's most popular cultural, entertainment, and shopping destination.",
    priceAed: 15,
    duration: "Full Day",
    imageUrl: "/images/global_village.png",
    galleryImages: [],
    inclusions: ["Entry ticket", "Access to cultural pavilions"],
    options: [],
    faqs: [],
    relatedActivitySlugs: ["miracle-garden", "theme-parks"],
    rating: 4.7,
    reviewCount: 2310,
  },
  {
    id: 13,
    slug: "miracle-garden",
    title: "Dubai Miracle Garden",
    category: "entertainment",
    shortDescription: "The world's largest natural flower garden.",
    description: "Stroll through millions of blooming flowers arranged in stunning shapes and structures.",
    priceAed: 55,
    duration: "2-3 Hours",
    imageUrl: "/images/miracle_garden.png",
    galleryImages: [],
    inclusions: ["Entry ticket"],
    options: [],
    faqs: [],
    relatedActivitySlugs: ["global-village", "city-tour"],
    rating: 4.8,
    reviewCount: 1850,
  },
  {
    id: 14,
    slug: "museum-of-the-future",
    title: "Museum of the Future",
    category: "city-tours",
    shortDescription: "Journey to 2071 in the most beautiful building on Earth.",
    description: "Explore the future of space travel, climate change, and human ecology in this stunning architectural marvel.",
    priceAed: 149,
    duration: "2 Hours",
    imageUrl: "/images/museum_future.png",
    galleryImages: [],
    inclusions: ["Entry ticket"],
    options: [],
    faqs: [],
    relatedActivitySlugs: ["burj-khalifa", "dubai-frame"],
    rating: 4.9,
    reviewCount: 3102,
  },
  {
    id: 15,
    slug: "dubai-frame",
    title: "Dubai Frame",
    category: "city-tours",
    shortDescription: "The biggest picture frame on the planet.",
    description: "Walk the glass bridge connecting Old and New Dubai and take in the magnificent panoramic views.",
    priceAed: 50,
    duration: "1.5 Hours",
    imageUrl: "/images/dubai_frame.png",
    galleryImages: [],
    inclusions: ["Entry ticket", "Gallery access"],
    options: [],
    faqs: [],
    relatedActivitySlugs: ["city-tour", "museum-of-the-future"],
    rating: 4.6,
    reviewCount: 1420,
  },
  {
    id: 16,
    slug: "jet-ski",
    title: "Jet Ski Dubai",
    category: "water-activities",
    shortDescription: "Thrilling water adventure near the Burj Al Arab.",
    description: "Ride the waves on a high-speed jet ski with breathtaking views of the Dubai coastline.",
    priceAed: 350,
    duration: "30-60 Mins",
    imageUrl: "/images/jet_ski.png",
    galleryImages: [],
    inclusions: ["Jet ski rental", "Life jacket", "Briefing"],
    options: [],
    faqs: [],
    relatedActivitySlugs: ["water-activities", "dhow-cruise"],
    rating: 4.8,
    reviewCount: 856,
  },
  {
    id: 17,
    slug: "atlantis-aquaventure",
    title: "Atlantis Aquaventure",
    category: "entertainment",
    shortDescription: "World's largest waterpark.",
    description: "Experience record-breaking slides and close encounters with marine life at this iconic waterpark.",
    priceAed: 299,
    duration: "Full Day",
    imageUrl: "/images/atlantis_waterpark.png",
    galleryImages: [],
    inclusions: ["Park entry", "Private beach access"],
    options: [],
    faqs: [],
    relatedActivitySlugs: ["theme-parks", "water-activities"],
    rating: 4.9,
    reviewCount: 4231,
  },
  {
    id: 18,
    slug: "ain-dubai",
    title: "Ain Dubai",
    category: "city-tours",
    shortDescription: "The world's highest observation wheel.",
    description: "Soar to new heights and enjoy 360-degree views of the Dubai Marina and coastline.",
    priceAed: 130,
    duration: "40 Mins",
    imageUrl: "/images/ain_dubai.png",
    galleryImages: [],
    inclusions: ["Standard ticket", "One rotation"],
    options: [],
    faqs: [],
    relatedActivitySlugs: ["city-tour", "dhow-cruise"],
    rating: 4.7,
    reviewCount: 1560,
  }
];

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah M.",
    location: "London, UK",
    rating: 5,
    review: "Donnvay Tours made our Dubai honeymoon absolutely magical. The desert safari was the highlight — watching the sunset over the dunes with my husband before a candlelit dinner under the stars. Impeccable service from start to finish.",
    avatarUrl: null,
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    location: "Mumbai, India",
    rating: 5,
    review: "Booked the Dubai Complete Experience package for a family of 5. Everything was perfectly coordinated — transfers, timings, tickets. The Burj Khalifa at sunset was worth every dirham. Donnvay Tours exceeded every expectation.",
    avatarUrl: null,
  },
  {
    id: 3,
    name: "James & Emma T.",
    location: "Sydney, Australia",
    rating: 5,
    review: "We chose Donnvay Tours on recommendation from a colleague and they delivered brilliantly. The dhow cruise dinner along the Marina was breathtaking — the food, the entertainment, the views. We will absolutely book again.",
    avatarUrl: null,
  },
  {
    id: 4,
    name: "Fatima Al-Hassan",
    location: "Riyadh, Saudi Arabia",
    rating: 5,
    review: "Outstanding service throughout our stay. The VIP desert safari was an unforgettable experience for our family. Professional guides, delicious food, and beautifully arranged camp. Donnvay Tours sets the gold standard.",
    avatarUrl: null,
  },
  {
    id: 5,
    name: "Michael Chen",
    location: "Singapore",
    rating: 4,
    review: "Smooth booking process, punctual transfers, and excellent value. The skydiving over Palm Jumeirah was the most exhilarating experience of my life. Well organised and very professional team.",
    avatarUrl: null,
  },
  {
    id: 6,
    name: "Priya Sharma",
    location: "Delhi, India",
    rating: 5,
    review: "From the moment we landed to our departure, Donnvay Tours looked after us impeccably. The Dubai holiday package covered everything we wanted to see. No stress, no confusion — just pure enjoyment. Highly recommended!",
    avatarUrl: null,
  },
];
