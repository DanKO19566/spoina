'use client';
import { useEffect, useState } from 'react';

const ACCENT = '#E11D48';
const posts = [
  { k: 'Energetyka', t: 'Jak działa krajowy miks energii?' },
  { k: 'AI',         t: 'Algorytmy a dezinformacja' },
  { k: 'Polityka',   t: 'Co łączy budżet z cenami prądu?' },
];

function Section({ id, title, kicker, children }) {
  return (
    <section id={id} className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
      <p className="text-xs uppercase tracking-widest text-zinc-600">{kicker}</p>
      <h2 className="text-2xl sm:text-3xl font-black mt-1 mb-6">{title}</h2>
      {children}
    </section>
  );
}

function Header({ onShow }) {
  return (
    <header id="home" className="border-b-4 border-black bg-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-4 flex items-center justify-between">
        <div className="font-black">SPOINA</div>
        <button
          onClick={onShow}
          className="px-3 py-1.5 border-2 border-black font-semibold"
          style={{ background: ACCENT, color: 'white' }}
        >
          Pokaż graf
        </button>
      </div>
    </header>
  );
}

function Hero({ onShow }) {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
      <h1 className="text-4xl sm:text-6xl font-black leading-[1.1]">
        Siatka informacji. Brutalistycznie prosto.
      </h1>
      <p className="mt-4 max-w-2xl text-zinc-700">
        Demo layoutu: kontrast, grube obramowania, czerwony akcent. Kliknij, by zobaczyć graf.
      </p>
      <button
        onClick={onShow}
        className="mt-6 px-4 py-2 border-4 border-black shadow-[6px_6px_0_0_#000] font-semibold"
        style={{ background: ACCENT, color: 'white' }}
      >
        Zobacz graf
      </button>
    </div>
  );
}

function Features() {
  return (
    <Section id="features" title="Co tu będzie?" kicker="Funkcje">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {['Wątki', 'Graf powiązań', 'Komentarze'].map((t, i) => (
          <div key={i} className="border-4 border-black p-5 bg-white">
            <h3 className="font-black">{t}</h3>
            <p className="mt-2 text-sm text-zinc-700">Opis skrótowy…</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function BlogTeasers() {
  return (
    <Section id="blog" title="Czytaj wątki i analizy" kicker="Artykuły">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {posts.map((p, i) => (
          <article key={i} className="border-4 border-black p-5 bg-white flex flex-col">
            <span className="text-[10px] uppercase tracking-widest border-b-2 border-black pb-2">{p.k}</span>
            <h3 className="mt-3 text-lg font-black leading-tight">{p.t}</h3>
            <a href="#" className="mt-auto pt-6 font-semibold underline decoration-[3px]" style={{ textDecorationColor: ACCENT }}>
              Czytaj →
            </a>
          </article>
        ))}
      </div>
    </Section>
  );
}

function EnergyGraphOverlay({ onClose }) {
  useEffect(() => {
    const onEsc = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onEsc);
    return () => window.removeEventListener('keydown', onEsc);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black/80 text-white flex items-center justify-center z-50">
      <div className="bg-zinc-900 border-4 border-white p-8 max-w-3xl w-[90%]">
        <h3 className="text-xl font-black">Graf energetyki (demo)</h3>
        <p className="mt-2 text-sm text-zinc-300">Tu później wstawimy prawdziwy viewer grafu.</p>
        <button onClick={onClose} className="mt-6 px-4 py-2 border-2 border-white font-semibold">Zamknij (Esc)</button>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="mt-10 border-t-4 border-black bg-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 text-sm flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center justify-between">
        <div className="font-black">SPOINA</div>
        <p className="max-w-xl leading-6">
          Projekt w fazie koncepcyjnej. Mockup stylu: brutalistyczny, kontrastowy, z czerwienią jako akcentem.
        </p>
        <a href="#home" className="font-semibold underline">Powrót ↑</a>
      </div>
    </footer>
  );
}

export default function SpoinaLanding() {
  const [showGraph, setShowGraph] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash === '#graf') setShowGraph(true);
  }, []);

  return (
    <main className="min-h-screen bg-white text-black selection:bg-black selection:text-white">
      <Header onShow={() => setShowGraph(true)} />
      <Hero onShow={() => setShowGraph(true)} />
      <Features />
      <BlogTeasers />
      <Footer />

      {showGraph && <EnergyGraphOverlay onClose={() => setShowGraph(false)} />}

      <div className="fixed bottom-3 right-3">
        <div className="border-4 border-black bg-white px-4 py-2 shadow-[8px_8px_0_0_#000]">
          <span className="text-xs font-semibold uppercase tracking-widest">Wersja demo</span>
          <button
            onClick={() => setShowGraph(true)}
            className="ml-3 px-3 py-1.5 border-2 border-black font-semibold"
            style={{ background: ACCENT, color: 'white' }}
          >
            Pokaż graf
          </button>
        </div>
      </div>
    </main>
  );
}
