import giscusTheme from '../styles/giscus-theme.css?raw';

export const prerender = true;

export function GET() {
  return new Response(giscusTheme, {
    headers: {
      'Cache-Control': 'public, max-age=3600',
      'Content-Type': 'text/css; charset=utf-8',
    },
  });
}
