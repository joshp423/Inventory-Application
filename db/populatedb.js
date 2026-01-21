require('dotenv').config();
const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS stock (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title VARCHAR(200),
    description VARCHAR(500),
    price INT,
    quantity INT,
    brand VARCHAR(25),
    category VARCHAR(30)
);

CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    category VARCHAR
);

INSERT INTO stock (title, description, price, quantity, brand, category) 
VALUES
    ('American Ultra Luxe Vintage 60s Stratocaster', 'Heirloom™ Nitrocellulose Lacquer finish
    Pure Vintage 61 Strat® Single-Coil Pickups, Advanced Electronics and S-1™ Switching
    Stainless Steel Frets', 5799, 50, 'Fender', 'Electric Guitars'),
    ('Vintera® II 50s Jazzmaster', 'Alder Body 7.25" Radius Rosewood Fingerboard with Vintage Tall Frets
    Late-50s C-Shape Neck', 2500, 150, 'Fender', 'Electric Guitars'),
    ('Les Paul Special', 'Mahogany Body 12 inch Radius Rosewood Fingerboard with Medium Jumbo Frets
    50s Vintage Neck P90s', 3499, 100, 'Gibson', 'Electric Guitars'),
    ('J-45 Standard Electric Acoustic Dreadnought', 'Mahogany Body 12 inch Radius Mahogany Fingerboard with Standard Frets
    SlimTaper Neck', 5999, 30, 'Gibson', 'Acoustic Guitars'),
    ('324CE Baritone-8 Limited Edition', 'Mahogany Body, West African Crelicam Ebony Fingerboard', 
    5999, 15, 'Taylor', 'Acoustic Guitars'),
    ('Dealer Exclusive Player Precision 4 String Bass', 'Alder Body, Pau Ferro 9.5 inch Fingerboard with Modern C neck', 
    2499, 150, 'Fender', 'Bass Guitars'),
    ('USA classic maple 4pc Drumkit 12X8MT 14X14FT 18X14BD 14X5SD', '7-ply Cross-Laminated North American Maple.', 
    6999, 30, 'Ludwig', 'Drums')

INSERT INTO categories (category)
  VALUES
  ('Electric Guitars'),
  ('Acoustic Guitars'),
  ('Bass Guitars'),
  ('Drums')
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();