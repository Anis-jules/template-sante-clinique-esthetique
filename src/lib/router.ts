import { useEffect, useState } from 'react';

export type RouteState = {
  path: string;
  params: Record<string, string>;
};

function getCurrentPath(): string {
  const hash = window.location.hash.replace(/^#/, '');
  return hash || '/';
}

export function useHashRoute(): RouteState {
  const [state, setState] = useState<RouteState>(() => parsePath(getCurrentPath()));

  useEffect(() => {
    const onHashChange = () => {
      setState(parsePath(getCurrentPath()));
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  return state;
}

function parsePath(path: string): RouteState {
  const clean = path.split('?')[0];
  const segments = clean.split('/').filter(Boolean);
  return { path: clean || '/', params: {} };
}

export function navigate(path: string): void {
  if (path.startsWith('/')) {
    window.location.hash = path;
  } else {
    window.location.href = path;
  }
}
