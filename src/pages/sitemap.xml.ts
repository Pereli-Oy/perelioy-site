import type { APIRoute } from 'astro';
import { categoryPageCount, portfolio, portfolioPageCount } from '../data/portfolio';
import { localizePath, type Locale } from '../i18n';

export const GET: APIRoute = ({ site }) => {
  const paths = ['/', '/portfolio/'];
  for (let page = 2; page <= portfolioPageCount(); page++) {
    paths.push(`/portfolio/page/${page}/`);
  }
  for (const category of portfolio.categories) {
    paths.push(`/portfolio/${category.slug}/`);
    for (let page = 2; page <= categoryPageCount(category); page++) {
      paths.push(`/portfolio/${category.slug}/page/${page}/`);
    }
  }
  for (const project of portfolio.projects) {
    paths.push(`/portfolio/${project.category.slug}/${project.slug}/`);
  }
  const locales: Locale[] = ['en', 'fi', 'uk', 'ru'];
  const urls = locales.flatMap((locale) => paths.map((path) =>
    new URL(localizePath(locale, path), site).href,
  ));
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((url) => `  <url><loc>${url}</loc></url>`).join('\n')}\n</urlset>\n`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
