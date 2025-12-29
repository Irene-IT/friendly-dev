import type { Route } from './+types/details';
import type { Project } from '~/types';
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router';
import type { StrapiResponse, StrapiProject } from '~/types';


// Client-side data loader необовʼязково, якщо серверний вже є можна юзать тільки серверний
// export async function clientLoader({
//   request,
//   params,
// }: Route.ClientLoaderArgs): Promise<Project> {
//     // const res = await fetch(`http://localhost:8000/projects/${params.id}`);
//   const res = await fetch(`${import.meta.env.VITE_API_URL}/projects/${params.id}`);

//   if (!res.ok) {
//     throw new Response('Проєкт не знайдено', { status: 404 });
//   }

//   const project: Project = await res.json();
//   return project;
// }

export function HydrateFallback() {
  return <div>Завантаження...</div>;
}
// Client loader виклик
// export const loader = clientLoader;


export async function loader({ params }: Route.LoaderArgs) {
  const { id } = params;

  // const res = await fetch(
  //   `${
  //     import.meta.env.VITE_API_URL
  //   }/projects?filters[documentId][$eq]=${id}&populate=*`
  // );
  const res = await fetch(
    `${
      import.meta.env.VITE_STRAPI_API_URL
    }/projects?filters[documentId][$eq]=${id}&populate=*`
  );

console.log('API URL:', import.meta.env.VITE_API_URL);

  if (!res.ok) {
    throw new Error('Не вдалося завантажити проєкт');
  }

  const json: StrapiResponse<StrapiProject> = await res.json();

  if (!json.data.length) {
    throw new Response('Не знайдено', { status: 404 });
  }

  const item = json.data[0];

  const project: Project = {
  id: item.id,
  documentId: item.documentId,
  title: item.title,
  description: item.description,
  // image: item.image?.url
  //   ? `${import.meta.env.VITE_STRAPI_URL}${item.image.url}`
  //   : '/images/no-image.png',
  image: item.image?.url
    ? `${item.image.url}`
    : '/images/no-image.png',
  url: item.url,
  date: item.date,
  category: item.category,
  featured: item.featured,  };

  return { project };
}


const ProjectDetailsPage = ({ loaderData }: Route.ComponentProps) => {
  // якщо Client loader виклик
  // const project = loaderData as Project;

const { project } = loaderData as { project: Project };

  return (
    <>
      {/* Кнопка "Назад" */}
      <Link
        to='/projects'
        className='flex items-center text-blue-400 hover:text-blue-500 mb-6 transition'
      >
        <FaArrowLeft className='mr-2' />
        Назад до проєктів
      </Link>

      <div className='grid md:grid-cols-2 gap-8 items-start'>
        {/* Зображення проєкту */}
        <div>
          <img
            src={project.image}
            alt={project.title}
            className='w-full rounded-lg shadow-md'
          />
        </div>

        {/* Інформація про проєкт */}
        <div>
          <h1 className='text-3xl font-bold text-blue-400 mb-4'>
            {project.title}
          </h1>
          <p className='text-gray-300 text-sm mb-4'>
            {new Date(project.date).toLocaleDateString()} &bull; {project.category}
          </p>
          <p className='text-gray-200 mb-6'>{project.description}</p>

          <a
            href={project.url}
            target='_blank'
            rel='noopener noreferrer'
            className='inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded transition'
            >
            Переглянути сайт →
          </a>
        </div>
      </div>
    </>
  );
};
export default ProjectDetailsPage;
