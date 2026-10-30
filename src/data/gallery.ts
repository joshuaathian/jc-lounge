/**
 * Gallery images — AI-generated placeholder photography.
 * TODO(owner): replace with real, licensed photos of the actual venue,
 * food, drinks, and events before launch. Keep the descriptive alt texts accurate.
 */
export type GalleryImage = {
  src: string;
  alt: string;
  caption: string;
  anchor?: boolean; // larger cell in the editorial grid
  wide?: boolean; // full-width cinematic strip
};

const image = (filename: string) => `${import.meta.env.BASE_URL}images/${filename}`;

export const galleryImages: GalleryImage[] = [
  {
    src: image("interior.webp"),
    alt: "A wall of glowing screens above a backlit bar inside a dark sports lounge",
    caption: "Match night, from the bar",
    anchor: true,
  },
  {
    src: image("gallery-crowd.webp"),
    alt: "Friends raising glasses in silhouette against a bright match screen",
    caption: "The final whistle",
  },
  {
    src: image("gallery-choma.webp"),
    alt: "A platter of charcoal-grilled choma and ribs on dark slate",
    caption: "Choma, off the coals",
  },
  {
    src: image("gallery-cocktail.webp"),
    alt: "An old fashioned cocktail with a large ice cube on a dark wooden bar",
    caption: "Poured slow",
  },
  {
    src: image("gallery-pizza.webp"),
    alt: "A wood-fired margherita pizza on a dark wooden board",
    caption: "From the oven",
  },
  {
    src: image("gallery-whiskey.webp"),
    alt: "Whiskey being poured into a crystal glass under a warm spotlight",
    caption: "Last pour",
    wide: true,
  },
];
