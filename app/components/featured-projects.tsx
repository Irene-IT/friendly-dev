// import { useEffect } from 'react';
// import { useFetcher } from 'react-router';
import type { Project } from '~/types';
import ProjectCard from '~/components/Project-Card';

const FeaturedProjects = ({
  projects,
  count,
}: {
  projects: Project[];
  count: number;
}) => {
  const featured = projects.filter((p) => p.featured).slice(0, count);
  return (
    <section>
      <h2 className='text-2xl font-bold mb-6 text-gray-800 dark:text-white'>
        🌟 Рекомендовані проєкти
      </h2>
      <div className='grid gap-6 sm:grid-cols-2'>
        {featured.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedProjects;