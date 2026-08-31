import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { Section } from '@/components/Section';
import { Reveal } from '@/components/Reveal';
import { PhotoPlaceholder } from '@/components/PhotoPlaceholder';
import content from '../content.json';

type Post = {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
};

const c = content.blogPage;
const posts: Post[] = c.posts.items;

export function BlogPage() {
  return (
    <div>
      <PageHero
        eyebrow={c.hero.eyebrow}
        title={c.hero.title}
        subtitle={c.hero.subtitle}
      />

      <Section bg="white">
        {/* Article à la une */}
        <Reveal>
          <article className="group grid lg:grid-cols-2 gap-10 lg:gap-16 items-center rounded-[2rem] bg-beige-50 border border-beige-200 p-6 sm:p-10 mb-14">
            <PhotoPlaceholder
              label="Article à la une"
              sublabel="Emplacement photo"
              ratio="landscape"
              rounded="rounded-2xl"
            />
            <div>
              <span className="inline-block text-xs uppercase tracking-[0.18em] text-beige-600 mb-4">
                {posts[0].category}
              </span>
              <h2 className="font-serif font-light text-anthracite-500 text-3xl sm:text-4xl text-balance">
                {posts[0].title}
              </h2>
              <p className="mt-5 text-base text-anthracite-300 font-light leading-relaxed">
                {posts[0].excerpt}
              </p>
              <div className="mt-6 flex items-center gap-5 text-xs text-beige-600 uppercase tracking-[0.14em]">
                <span className="flex items-center gap-2">
                  <Calendar size={14} strokeWidth={1.5} />
                  {posts[0].date}
                </span>
                <span className="flex items-center gap-2">
                  <Clock size={14} strokeWidth={1.5} />
                  {posts[0].readTime} {c.readTimeSuffix}
                </span>
              </div>
              <button className="mt-7 group/btn inline-flex items-center gap-2 text-sm uppercase tracking-[0.16em] text-anthracite-500 hover:text-anthracite-400 transition-colors">
                {c.readMore}
                <ArrowRight
                  size={16}
                  strokeWidth={1.5}
                  className="transition-transform duration-500 group-hover/btn:translate-x-1.5"
                />
              </button>
            </div>
          </article>
        </Reveal>

        {/* Liste */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.slice(1).map((post, i) => (
            <Reveal key={post.id} delay={i * 90}>
              <article className="group h-full flex flex-col rounded-2xl border border-beige-200 bg-blanc overflow-hidden hover:shadow-xl transition-all duration-500">
                <PhotoPlaceholder
                  label={post.title}
                  sublabel="Emplacement photo"
                  ratio="wide"
                  rounded="rounded-none"
                  className="rounded-t-2xl"
                />
                <div className="p-7 flex flex-col flex-1">
                  <span className="text-xs uppercase tracking-[0.18em] text-beige-600 mb-3">
                    {post.category}
                  </span>
                  <h3 className="font-serif text-2xl text-anthracite-500 mb-3 leading-tight">
                    {post.title}
                  </h3>
                  <p className="text-sm text-anthracite-300 font-light leading-relaxed flex-1">
                    {post.excerpt}
                  </p>
                  <div className="mt-6 pt-5 border-t border-beige-100 flex items-center justify-between text-xs text-beige-600 uppercase tracking-[0.12em]">
                    <span className="flex items-center gap-2">
                      <Calendar size={13} strokeWidth={1.5} />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-2">
                      <Clock size={13} strokeWidth={1.5} />
                      {post.readTime}
                    </span>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Note */}
        <Reveal delay={200}>
          <p className="mt-16 text-center text-sm text-anthracite-300/70 font-light italic max-w-prose mx-auto">
            {c.note}
          </p>
        </Reveal>
      </Section>
    </div>
  );
}
