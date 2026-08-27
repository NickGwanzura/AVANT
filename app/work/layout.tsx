import { pageMetadata } from "../../lib/seo";

export const metadata = pageMetadata("Photography & Film Portfolio", "Explore selected photography, film, event, corporate and campaign work by Avant Creative Group in Zimbabwe.", "/work");

export default function WorkLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
