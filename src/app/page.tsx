import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="container flex flex-col items-center justify-center gap-6 py-20">
      <h1 className="text-4xl font-bold tracking-tight">Product SPA</h1>
      <p className="text-center max-w-md">
        {" "}
        A Single Page Application built with <strong>Next.js</strong>,{" "}
        <strong>TypeScript</strong>, and <strong>Redux</strong>.
        <br /> UI powered by <strong>shadcn/ui</strong>.
      </p>
      <Button size="lg" className="mt-4">
        View Products
      </Button>
    </main>
  );
}
