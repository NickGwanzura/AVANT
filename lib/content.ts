export type Project = {
  id?: string; slug: string; title: string; category: string; label: string;
  year: string; location: string; image: string; layout: string; summary: string;
  deliverables: string; published?: boolean; position?: number;
};

export const projects: Project[] = [
  { slug: "harare-in-bloom", title: "Harare in Bloom", category: "Photography", label: "Place & Culture", year: "2026", location: "Harare, Zimbabwe", image: "/media/harare-jacaranda.webp", layout: "wide", summary: "A seasonal portrait of Harare shaped by jacaranda light, city rhythm and the people moving through it.", deliverables: "Creative direction, location photography, image library" },
  { slug: "wild-light", title: "Wild Light", category: "Campaigns", label: "Conservation Story", year: "2026", location: "Hwange, Zimbabwe", image: "/media/hwange-elephant.webp", layout: "portrait", summary: "An intimate wildlife story created around scale, stillness and the quiet power of Hwange.", deliverables: "Campaign photography, short film, social edits" },
  { slug: "marula-house", title: "Marula House", category: "Real Estate", label: "Architecture", year: "2025", location: "Victoria Falls, Zimbabwe", image: "/media/victoria-falls-lodge.webp", layout: "portrait", summary: "A warm architectural study balancing generous interiors with the landscape beyond them.", deliverables: "Architecture photography, detail library, property film" },
  { slug: "the-smoke-that-thunders", title: "The Smoke That Thunders", category: "Videography", label: "Destination Film", year: "2025", location: "Victoria Falls, Zimbabwe", image: "/media/victoria-falls-dawn.webp", layout: "cinema", summary: "A cinematic destination story following dawn, mist and movement at one of Africa’s defining landscapes.", deliverables: "Creative treatment, destination film, vertical cutdowns" },
  { slug: "chilojo-horizons", title: "Chilojo Horizons", category: "Photography", label: "Editorial", year: "2024", location: "Gonarezhou, Zimbabwe", image: "/media/chilojo-cliffs.webp", layout: "square", summary: "An editorial landscape series exploring the colour, geology and vast horizons of Gonarezhou.", deliverables: "Editorial photography, print selects, digital image library" }
];
export const services = [
  { number: "01", title: "Photography", description: "High-quality imagery designed to tell brands' stories with creativity and precision.", image: "/media/harare-jacaranda.webp" },
  { number: "02", title: "Videography", description: "Engaging motion content showcasing brands, events, products and stories.", image: "/media/victoria-falls-dawn.webp" },
  { number: "03", title: "Event Coverage", description: "Candid moments, atmosphere and the highlights that make your event memorable.", image: "/media/hwange-elephant.webp" },
  { number: "04", title: "Corporate Headshots", description: "Professional portraits that represent individuals, leadership teams and organisations.", image: "/media/chilojo-cliffs.webp" },
  { number: "05", title: "Real Estate", description: "Architectural and property photography designed to attract buyers and investors.", image: "/media/victoria-falls-lodge.webp" },
  { number: "06", title: "Reels", description: "Short-form vertical video created for social media engagement.", image: "/media/victoria-falls-dawn.webp" }
];
