import { type RouteConfig, layout, index, route } from '@react-router/dev/routes';

export default [
  layout('routes/layouts/home.tsx', [index('routes/home/index.tsx')]),
  layout('routes/layouts/main.tsx', [
    route('about', './routes/about/index.tsx'),
    route('contact', './routes/contact/index.tsx'),
    route('projects', './routes/projects/index.tsx'),
    route('projects/:id', './routes/projects/details.tsx'),
    // route('blog', './routes/blog/index.tsx'),
    // route('blog/:slug', './routes/blog/details.tsx'),
    // Це буде перехоплювати всі маршрути, які не відповідають жодному з визначених ^ маршрутів і видасть 404.
    route('*', './routes/errors/not-found.tsx'),
  ]),
] satisfies RouteConfig;