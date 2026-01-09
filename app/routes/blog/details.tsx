import ReactMarkdown from 'react-markdown';
import type { Route } from './+types/details';
import type { PostMeta } from '~/types';
import { Link } from 'react-router';

export async function loader({ request, params }: Route.LoaderArgs) {
  const { slug } = params;

  console.log(slug); {/* виводиться в терміналі вашого сервера, а не в консолі браузера бо виконується на сервері, ще до того, як сторінка буде відправлена в браузер */}

  const url = new URL('/data/posts-meta.json', request.url);
  const res = await fetch(url.href);

  if (!res.ok) {
    throw new Error('Не вдалося завантажити пости');
  }

  const index = await res.json();

  const postMeta = index.find((post: PostMeta) => post.slug === slug);

  if (!postMeta) {
    throw new Response('Не знайдено', { status: 404 });
  }

  // Динамічний імпорт сирого вмісту markdown
  const markdown = await import(`../../posts/${slug}.md?raw`);

  return {
    postMeta,
    markdown: markdown.default,
  };
}


type BlogPostDetailsPageProps = {
  loaderData: {
    postMeta: PostMeta;
    markdown: string;
  };
};


const BlogPostDetailsPage = ({ loaderData }: Route.ComponentProps) => {
  const { postMeta, markdown } = loaderData;

  return (
    <div className='max-w-3xl mx-auto px-6 py-12 bg-gray-900'>
      <h1 className='text-3xl font-bold text-blue-400 mb-2'>
        {postMeta.title}
      </h1>
      <p className='text-sm text-gray-400 mb-6'>
        {/* якщо ви не хочете оновлювати файл JSON, ви можете додати "T00:00:00Z", коли створюєте дату у своєму коді, щоб явно розглядати її як UTC: ЦЕ ВАЖЛИВО ДЛЯ УНИКНЕННЯ ПОМИЛКИ 418 (різне зчитування дати (дд.мм.рррр і рррр/mm/dd) при рендері і гідратації)*/}
        {new Date(postMeta.date + "T00:00:00Z").toLocaleDateString()}
      </p>

      <div className='prose prose-invert max-w-none mb-12'>
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </div>

      <div className='text-center'>
        <Link
          to='/blog'
          className='inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition'
        >
          ← Повернутися до постів
        </Link>
      </div>
    </div>
  );
};

export default BlogPostDetailsPage;