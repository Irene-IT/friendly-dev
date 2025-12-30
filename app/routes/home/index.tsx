// import { Outlet } from 'react-router';
// import Hero from '~/components/Hero';

import type { Route } from './+types/index';
// import type { Project } from '~/types';
import type { Project, StrapiProject, StrapiResponse } from '~/types';
import FeaturedProjects from '~/components/featured-projects';
import AboutPreview from '~/components/about-preview';
import type { PostMeta } from '~/types';
import LatestPosts from '~/components/LatestPosts';


export async function loader({
  request,
}: Route.LoaderArgs): Promise<{ projects: Project[]; posts: PostMeta[] }> {
  const url = new URL(request.url);

  const [projectRes, postRes] = await Promise.all([
    // fetch(`${import.meta.env.VITE_API_URL}/projects`),
    fetch(`${import.meta.env.VITE_STRAPI_API_URL}/projects?populate=*`),
    fetch(new URL('/data/posts-meta.json', url)),
  ]);

if (!projectRes.ok || !postRes.ok) {
    throw new Error('Не вдалося завантажити проєкти або пости');
  }

  // const [projects, posts] = await Promise.all([
  //   projectRes.json(),
  //   postRes.json(),
  // ]);

  // Парсимо JSON
  const posts: PostMeta[] = await postRes.json();

  // Нормалізуємо projects як масив Project
  const json: StrapiResponse<StrapiProject> = await projectRes.json();
 
   const projects = json.data.map((item) => ({
     id: item.id,
     documentId: item.documentId,
     title: item.title,
     description: item.description,
     image: item.image?.url
       ? `${item.image.url}`
       : '/images/no-image.png',
     url: item.url,
     date: item.date,
     category: item.category,
     featured: item.featured,
   }));
  
  return { projects, posts };
}

const HomePage = ({ loaderData }: Route.ComponentProps) => {
  const { projects, posts } = loaderData;

  return (
    <>
    {/* <Hero name='Irene' /> */}

      <FeaturedProjects projects={projects} count={2} />
      <AboutPreview /> 
      <LatestPosts posts={posts} limit={3} />
       {/* <>
        <Outlet />
       </> */}

    </>
  );
};

export default HomePage;