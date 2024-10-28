import { ContactForm } from '@/components/ContactForm';
import { SocialLinks } from '@/components/SocialLinks';
import { SpotlightBackground } from '@/components/SpotlightBackground';
import { TypewriterEffect } from '@/components/TypewriterEffect';

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 overflow-hidden relative">
      <SpotlightBackground />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="min-h-screen flex flex-col justify-center">
          <section className="space-y-20">
            <div className="space-y-2">
              <h2 className="text-lg tracking-[0.2em] font-light text-violet-400">
                SAHIL TANDON
              </h2>
              <div className="space-y-16">
                <TypewriterEffect />
                
                <p className="text-xl text-zinc-400 max-w-xl leading-relaxed font-light">
                  I'm a frontend engineer with a passion for crafting exceptional digital experiences. 
                  I transform user interfaces into strategic business assets, combining technical 
                  excellence with product vision.
                </p>
              </div>
            </div>
            
            <div className="pt-4">
              <SocialLinks />
            </div>
          </section>
        </div>
        
        <div className="py-32">
          <ContactForm />
        </div>
      </div>
    </main>
  );
}