import { Home } from 'lucide-react';
import { navigate } from '@/lib/router';
import content from '../content.json';

const c = content.notFoundPage;

export function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-radial-soft px-5">
      <div className="text-center max-w-md">
        <p className="font-serif text-[7rem] sm:text-[9rem] font-light text-beige-300 leading-none">
          {c.code}
        </p>
        <h1 className="font-serif font-light text-anthracite-500 text-3xl mt-2 mb-4">
          {c.title}
        </h1>
        <p className="text-anthracite-300 font-light leading-relaxed mb-8">
          {c.description}
        </p>
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-anthracite-500 text-blanc text-sm uppercase tracking-[0.16em] font-medium hover:bg-anthracite-400 transition-all duration-500"
        >
          <Home size={16} strokeWidth={1.5} />
          {c.backHome}
        </button>
      </div>
    </div>
  );
}
