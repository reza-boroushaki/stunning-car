import Hero from "../components/Hero";
import { HomeProps } from "@/types";
import ShowCase from "@/components/ShowCase";

export default async function Home({ searchParams }: HomeProps) {
  return (
    <main className="overflow-hidden">
      <Hero />
      <ShowCase searchParams={searchParams} />
    </main>
  );
}
