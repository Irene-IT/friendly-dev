import type { Route } from "./+types/index";
import type { Project, StrapiProject, StrapiResponse } from '~/types';
import ProjectCard from "~/components/Project-Card";
import { useState } from "react";
import Pagination from "~/components/Pagination";
import { AnimatePresence, motion } from "framer-motion";


const ProjectsPage = ({ loaderData }: Route.ComponentProps) => {
  // Пагінація проєктів див. chapter 2 lesson 7
  const [currentPage, setCurrentPage] = useState(1);
  // Фільтрація проєктів (приклад, можна розширити функціонал)
  const [selectedCategory, setSelectedCategory] = useState("All");
  const projectsPerPage = 4;
  const { projects } = loaderData as { projects: Project[] };

  const categories = ["All", ...new Set(projects.map((p) => p.category))];

  // Фільтрація за категорією
  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  const totalPages = Math.ceil(projects.length / projectsPerPage);

  const indexOfLast = currentPage * projectsPerPage;
  const indexOfFirst = indexOfLast - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirst, indexOfLast);

  return (
    <AnimatePresence>
      <h2 className="text-3xl font-bold mb-8 text-white">🚀 Проєкти</h2>
      {/* Фільтр категорій */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              // Скидання номера сторінки до 1 при зміні категорії
              setCurrentPage(1);
            }}
            className={`px-3 py-1 rounded text-sm ${
              selectedCategory === cat
                ? "bg-blue-600 text-white"
                : "bg-gray-700 text-gray-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Компонент `AnimatePresence` анімуватиме дочірні елементи при їх додаванні або видаленні. Компонент `motion.div` анімуватиме макет дочірніх елементів. */}
      <AnimatePresence mode="wait">
        <motion.div layout className="grid gap-6 sm:grid-cols-2">
          {currentProjects.map((project) => (
            <motion.div key={project.id} layout>
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      )}
    </AnimatePresence>
  );
};

export default ProjectsPage;

// Завантажувач даних проєктів з локального json-файлу
// export async function loader({
//   request,
// }: Route.LoaderArgs): Promise<{ projects: Project[] }> {
//   // const res = await fetch("http://localhost:8000/projects");
//   const res = await fetch(`${import.meta.env.VITE_API_URL}/projects`);

//   const data = await res.json();

//   return { projects: data };
// }

// Цей код отримує проєкти з API Strapi та перетворює їх у формат, який нам потрібен для нашого додатку.
export async function loader({
  request,
}: Route.LoaderArgs): Promise<{ projects: Project[] }> {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/projects?populate=*`
  );

  if (!res.ok) {
    throw new Error('Не вдалося завантажити проєкти');
  }

  const json: StrapiResponse<StrapiProject> = await res.json();

  const projects = json.data.map((item) => ({
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
    featured: item.featured,
  }));

  return { projects };
}