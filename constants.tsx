
import { Review, MenuItem } from './types';

export const REVIEWS: Review[] = [
  {
    id: '1',
    author: 'paulw',
    location: 'Alabama',
    date: '07/24/2025',
    content: "Love this place. Friendly folks and great BBQ. I have never had a bad meal from here. Looking forward to going back since we haven't been in a while.",
    rating: 5,
    source: 'TripAdvisor'
  },
  {
    id: '2',
    author: 'David R (Davey L. Rich)',
    location: 'Best Burgers in America Association',
    date: '05/03/2024',
    title: 'Second Time is a Charm',
    content: "I went back to re-rate their burger and they have an awesome burger. They scored a 10. Glad I went back when their original cook was there and what a great burger and job. Fresh, never Frozen, fresh toppings, and great bun.",
    rating: 5,
    source: 'TripAdvisor'
  },
  {
    id: '3',
    author: 'Linda G',
    location: 'Gadsden, Alabama',
    date: '02/05/2020',
    title: 'Great cheeseburgers!',
    content: "Merill's is not fancy, but it is clean and the employees are so nice. The cheeseburgers are outstanding!!! Be prepared to wait about 15 to 20 minutes because they are made fresh, and they are well worth the wait.",
    rating: 5,
    source: 'TripAdvisor'
  },
  {
    id: '4',
    author: 'mkimball',
    location: 'Annandale, Virginia',
    date: '08/05/2018',
    title: 'Excellent BBQ',
    content: "For those traveling I-59 this is a welcome respite. Offering only counter service with tables in a screened-in dining area this qualifies as no-frills. But attentive, polite service and delicious, filling food made the place a star.",
    rating: 5,
    source: 'TripAdvisor'
  },
  {
    id: '5',
    author: 'Sarah J.',
    location: 'Birmingham, AL',
    date: '01/15/2025',
    content: "The smoked chicken is absolutely to die for! Moist, flavorful, and that white sauce is liquid gold. Best BBQ stop in North Alabama hands down.",
    rating: 5,
    source: 'Google'
  },
  {
    id: '6',
    author: 'Mike & Jenny',
    location: 'Local Regulars',
    date: '12/20/2024',
    content: "We come every Friday for the Rib Plate. Consistency is key here - it's always perfect. The staff treats you like family.",
    rating: 5,
    source: 'Yelp'
  }
];

export const MENU: MenuItem[] = [
  {
    id: 'm1',
    name: 'Smoky Rib Plate',
    description: 'Slow-smoked St. Louis style ribs, dry-rubbed and glazed with our secret sauce. Served with two sides and cornbread.',
    price: '$14.99',
    category: 'BBQ Plates',
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'm2',
    name: 'Tender Brisket Plate',
    description: '12-hour hickory-smoked beef brisket, sliced thin to preserve the moisture and smoke ring.',
    price: '$16.50',
    category: 'BBQ Plates',
    imageUrl: 'https://images.unsplash.com/photo-1588347785102-2944272ce66e?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'm3',
    name: 'Savory Pulled Pork',
    description: 'Hickory smoked pork shoulder, hand-pulled and piled high. Perfect with our tangy vinegar-based slaw.',
    price: '$12.99',
    category: 'BBQ Plates',
    imageUrl: 'https://images.unsplash.com/photo-1616669944447-d65d41a222bd?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'm4',
    name: 'Old-Fashioned Burger',
    description: 'Fresh, never frozen beef patty, hand-pressed on the griddle for that perfect crust. Rated 10/10 by the experts!',
    price: '$8.99',
    category: 'Burgers',
    imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'm5',
    name: 'Signature Cheeseburger',
    description: 'Our award-winning burger topped with melted American cheese, crisp lettuce, and vine-ripened tomatoes.',
    price: '$9.75',
    category: 'Burgers',
    imageUrl: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'm6',
    name: 'Pit-Smoked Chicken',
    description: 'Half a chicken, seasoned with our signature rub and smoked until tender and juicy.',
    price: '$11.50',
    category: 'BBQ Plates',
    imageUrl: 'https://images.unsplash.com/photo-1626645738196-c2a7c8d38f58?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'm7',
    name: 'Classic Baked Beans',
    description: 'Slow-cooked with brown sugar, bacon, and a hint of smoke.',
    price: '$2.99',
    category: 'Sides',
    imageUrl: 'https://images.unsplash.com/photo-1594911773413-5683287046e7?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'm8',
    name: 'Homemade Coleslaw',
    description: 'Creamy, tangy, and made fresh daily in our kitchen.',
    price: '$2.99',
    category: 'Sides',
    imageUrl: 'https://images.unsplash.com/photo-1625938146369-adc83368bda7?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'm9',
    name: 'Smoked Sausage Plate',
    description: 'Local Conecuh sausage, smoked to perfection and served with our spicy mustard sauce.',
    price: '$13.50',
    category: 'BBQ Plates',
    imageUrl: 'https://images.unsplash.com/photo-1595486514757-b12749445100?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'm10',
    name: 'Loaded BBQ Potato',
    description: 'Giant baker stuffed with butter, sour cream, cheese, and your choice of pork or chicken.',
    price: '$10.99',
    category: 'Sides',
    imageUrl: 'https://images.unsplash.com/photo-1623653387945-2fd25214f8fc?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'm11',
    name: "Nana's Banana Pudding",
    description: 'Layers of vanilla wafers, fresh bananas, and homemade vanilla pudding. A Southern classic.',
    price: '$4.50',
    category: 'Sides',
    imageUrl: 'https://images.unsplash.com/photo-1533519896263-95388c387b32?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'm12',
    name: 'Southern Sweet Tea',
    description: 'The house wine of the South. Brewed fresh daily and sweetened with pure cane sugar.',
    price: '$2.50',
    category: 'Sides',
    imageUrl: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=800&auto=format&fit=crop'
  }
];

export const GALLERY_IMAGES = [
  {
    url: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?q=80&w=1000',
    description: 'Our signature slow-smoked ribs glistened with glaze.'
  },
  {
    url: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1000',
    description: 'Fresh burgers being hand-pressed on our classic griddle.'
  },
  {
    url: 'https://images.unsplash.com/photo-1588347785102-2944272ce66e?q=80&w=1000',
    description: 'Juicy brisket sliced thin with a beautiful smoke ring.'
  },
  {
    url: 'https://images.unsplash.com/photo-1616669944447-d65d41a222bd?q=80&w=1000',
    description: 'Tender pulled pork ready for the bun.'
  },
  {
    url: 'https://images.unsplash.com/photo-1534127395081-e85b848048f7?q=80&w=1000',
    description: 'Our rustic dining area, clean and welcoming.'
  },
  {
    url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1000',
    description: 'A feast of Alabama BBQ and Southern sides.'
  }
];
