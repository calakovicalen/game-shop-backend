const OrderStatus = {
  Open: 'OPEN',
  Approved: 'APPROVED',
  Confirmed: 'CONFIRMED',
  Sent: 'SENT',
  Completed: 'COMPLETED',
  Cancelled: 'CANCELLED',
};

export const products = [
  {
    description: 'Stealth game full of history',
    id: '0dc22571-881a-411d-b20e-71c5c7b68c3c',
    price: 69.99,
    title: `Assassin's creed`,
  },
  {
    description: 'Game for real gangsters',
    id: 'c05725f9-613c-4e8b-b465-5636eeab1223',
    price: 39.99,
    title: `Grand Theft Auto`,
  },
  {
    description: 'Game for those who want to forget about life',
    id: '6e514e91-ae3c-4a8b-85f5-c51c047bf549',
    price: 99.99,
    title: `World of Warcraft`,
  },
  {
    description: 'Best FPS game',
    id: '65998305-5c73-49f7-8fad-e7190574185f',
    price: 19.99,
    title: `Counter Strike`,
  },
];

export const availableProducts = products.map((product, index) => ({
  ...product,
  count: index + 1,
}));

export const cart = [
  {
    product: {
      description: 'Stealth game full of history',
      id: '0dc22571-881a-411d-b20e-71c5c7b68c3c',
      price: 69.99,
      title: `Assassin's creed`,
    },
    count: 2,
  },
  {
    product: {
      description: 'Best FPS game',
      id: '65998305-5c73-49f7-8fad-e7190574185f',
      price: 19.99,
      title: `Counter Strike`,
    },
    count: 3,
  },
];

export const orders = [
  {
    id: '1',
    address: {
      address: 'East Blue',
      firstName: 'Monkey D',
      lastName: 'Luffy',
      comment: 'I love the adventure',
    },
    items: [
      { productId: '0dc22571-881a-411d-b20e-71c5c7b68c3c', count: 2 },
      { productId: '65998305-5c73-49f7-8fad-e7190574185f', count: 3 },
    ],
    statusHistory: [
      { status: OrderStatus.Open, timestamp: Date.now(), comment: 'New order' },
    ],
  },
  {
    id: '2',
    address: {
      address: 'North Blue',
      firstName: 'Sanji',
      lastName: 'Vinsmoke',
      comment: 'I like how ladies look in game',
    },
    items: [{ productId: 'c05725f9-613c-4e8b-b465-5636eeab1223', count: 10 }],
    statusHistory: [
      {
        status: OrderStatus.Sent,
        timestamp: Date.now(),
        comment: 'Fancy order',
      },
    ],
  },
];
