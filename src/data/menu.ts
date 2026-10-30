/**
 * Menu data — structured so a manager can edit items/prices without touching markup.
 *
 * STATUS: recovered from the previous site's backup and reformatted.
 * Spellings were corrected where the source had obvious errors
 * (e.g. "Cheddermelt" → Cheddar Melt, "Chivase" → Chivas Regal,
 * "Bombay Saphire" → Bombay Sapphire, "Absolute" → Absolut).
 * Prices are PLACEHOLDERS pending the owner's confirmed menu — do not publish.
 * The source backup ended mid-way through "Wine & Bubbles", so that list
 * is incomplete by definition.
 */

export type FoodItem = {
  name: string;
  description?: string;
  price: number;
};

export type SpiritItem = {
  name: string;
  shot?: number; // per shot / glass
  bottle?: number; // per bottle
};

export type MenuGroup<T> = {
  label: string;
  items: T[];
};

export const foodMenu: MenuGroup<FoodItem>[] = [
  {
    label: "Appetizers",
    items: [
      { name: "Mini Beef Burgers", description: "Three sliders, caramelised onion, house sauce", price: 9 },
      { name: "Chicken Lollipops", description: "Frenched wings, chilli-garlic glaze", price: 8 },
      { name: "Tempura Prawns", description: "Crisp batter, lime aioli", price: 11 },
      { name: "Cheese Fries", description: "Skin-on fries, melted cheddar, spring onion", price: 6 },
    ],
  },
  {
    label: "Big Meals",
    items: [
      { name: "BBQ Pork Ribs", description: "Slow-glazed, slaw, fries", price: 16 },
      { name: "Goat Choma", description: "Charcoal-grilled, kachumbari, ugali or fries", price: 15 },
      { name: "Nile Tilapia", description: "Whole fried, chilli-lime, sides for one", price: 17 },
      { name: "Chicken Curry", description: "Coconut-tomato curry, rice or chapati", price: 12 },
    ],
  },
  {
    label: "Burgers & More",
    items: [
      { name: "JC Classic Burger", description: "Beef patty, lettuce, tomato, house sauce", price: 10 },
      { name: "Cheddar Melt Burger", description: "Double cheddar, pickles, brioche bun", price: 12 },
      { name: "Grilled Chicken Burger", description: "Peri-peri chicken, garlic mayo", price: 11 },
      { name: "Beef Shawarma Plate", description: "Flatbread, garlic sauce, pickles", price: 9 },
    ],
  },
  {
    label: "Pizza",
    items: [
      { name: "Margherita", description: "Tomato, mozzarella, basil", price: 10 },
      { name: "Chicken BBQ", description: "Smoked chicken, red onion, BBQ drizzle", price: 13 },
      { name: "Meat Feast", description: "Beef, sausage, pepperoni", price: 14 },
      { name: "Veggie", description: "Peppers, mushroom, olives, red onion", price: 11 },
    ],
  },
  {
    label: "Platters",
    items: [
      { name: "JC Mixed Platter", description: "Choma, ribs, wings, fries — for the table", price: 34 },
      { name: "Choma Platter", description: "Goat & beef choma, kachumbari — serves 3–4", price: 30 },
      { name: "Wings Platter", description: "Twenty wings, three sauces", price: 22 },
    ],
  },
  {
    label: "Extras",
    items: [
      { name: "Skin-on Fries", price: 4 },
      { name: "Kachumbari", price: 3 },
      { name: "Extra Sauces", description: "Chilli, garlic mayo, BBQ", price: 1.5 },
    ],
  },
];

export const spiritsMenu: MenuGroup<SpiritItem>[] = [
  {
    label: "Whiskey",
    items: [
      { name: "Jameson", shot: 5, bottle: 55 },
      { name: "Jack Daniel's", shot: 6, bottle: 65 },
      { name: "Johnnie Walker Black Label", shot: 7, bottle: 80 },
      { name: "Johnnie Walker Red Label", shot: 5, bottle: 50 },
      { name: "Chivas Regal 12", shot: 7, bottle: 85 },
      { name: "Glenfiddich 12", shot: 8, bottle: 95 },
    ],
  },
  {
    label: "Tequila",
    items: [
      { name: "Olmeca Reposado", shot: 6, bottle: 60 },
      { name: "Olmeca Gold", shot: 5, bottle: 55 },
      { name: "José Cuervo Especial", shot: 5, bottle: 50 },
    ],
  },
  {
    label: "Gin",
    items: [
      { name: "Bombay Sapphire", shot: 5, bottle: 60 },
      { name: "Tanqueray", shot: 5, bottle: 58 },
      { name: "Gordon's", shot: 4, bottle: 45 },
    ],
  },
  {
    label: "Vodka",
    items: [
      { name: "Absolut", shot: 5, bottle: 55 },
      { name: "Smirnoff", shot: 4, bottle: 45 },
      { name: "Grey Goose", shot: 9, bottle: 110 },
      { name: "Cîroc", shot: 9, bottle: 115 },
    ],
  },
  {
    label: "Cognac",
    items: [
      { name: "Hennessy VS", shot: 7, bottle: 85 },
      { name: "Hennessy VSOP", shot: 11, bottle: 140 },
      { name: "Rémy Martin VSOP", shot: 11, bottle: 135 },
    ],
  },
  {
    label: "Rum",
    items: [
      { name: "Bacardi Carta Blanca", shot: 4, bottle: 45 },
      { name: "Captain Morgan Spiced", shot: 4, bottle: 48 },
      { name: "Malibu", shot: 4, bottle: 42 },
    ],
  },
  {
    label: "Wine & Bubbles",
    items: [
      // The source backup ends mid-way through this category — list is incomplete.
      { name: "House Red", shot: 6, bottle: 30 },
      { name: "House White", shot: 6, bottle: 30 },
      { name: "Prosecco", bottle: 38 },
    ],
  },
];

export const cocktailsComingSoon = true; // TODO(owner): supply the real cocktail list

export type MenuTabId = "food" | "spirits" | "cocktails";

export const menuTabs: { id: MenuTabId; label: string }[] = [
  { id: "food", label: "Food" },
  { id: "spirits", label: "Spirits & Wine" },
  { id: "cocktails", label: "Cocktails" },
];
