export interface Event {
  id: number;
  name: string;
  dayPattern: string;
  time: string;
  price: string;
  capacity?: string;
  description: string;
  image: string;
}

const PEXELS = (id: number) => `/images/pexels-${id}.webp`;

export const events: Event[] = [
  {
    id: 1,
    name: "Open Mic Night",
    dayPattern: "Every Friday",
    time: "7:00 PM – 10:00 PM",
    price: "Free Entry",
    description:
      "A rotating cast of musicians, poets, and storytellers take the mic. Drinks flow, the lights go low. All are welcome — performers and listeners alike.",
    image: PEXELS(1840320),
  },
  {
    id: 2,
    name: "Saturday Coffee Tasting",
    dayPattern: "Every Saturday",
    time: "10:00 AM – 12:00 PM",
    price: "£12 per person",
    capacity: "12 guests max",
    description:
      "Guided by our head roaster. Explore three single-origins side by side, learn cupping technique, and develop your palate. No experience needed, curiosity required.",
    image: PEXELS(34505585),
  },
  {
    id: 3,
    name: "Barista Masterclass",
    dayPattern: "First Sunday of each month",
    time: "2:00 PM – 4:30 PM",
    price: "£25 per person",
    capacity: "8 guests max",
    description:
      "Pull your first espresso, steam milk to velvet, and dial in a pour-over. Leave with a recipe card and a new appreciation for every cup you order.",
    image: PEXELS(1307698),
  },
];
