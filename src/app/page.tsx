import { SpotlightBackground } from '@/components/SpotlightBackground';

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 overflow-hidden relative">
      <SpotlightBackground />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
        <section className="space-y-8">
          <h2 className="text-2xl tracking-[0.2em] font-light hover:text-violet-400 transition-colors">
            SAHIL TANDON
          </h2>
          <div className="space-y-6">
            <h1 className="text-5xl sm:text-6xl font-bold leading-tight">
              Frontend Developer
            </h1>
            <p className="text-xl text-zinc-400 max-w-2xl leading-relaxed">
              I'm a frontend engineer with a passion for crafting exceptional digital experiences that drive business growth and user delight. With over 8 years of expertise, I transform user interfaces into strategic business assets, combining technical excellence with product vision.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}