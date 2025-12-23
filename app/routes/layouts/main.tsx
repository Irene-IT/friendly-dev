// Layout Routes - щоб певні сторінки мали спільний макет. Наприклад, ви можете захотіти мати бічну панель або заголовок, які знаходяться на одній або кількох сторінках.
// Компонент `Outlet` використовується для рендерингу дочірніх маршрутів маршруту-макета (Layout Routes).
// див. chapter 1 lesson 10
 
import { Outlet } from 'react-router';

const MainLayout = () => {
  return (
    <section className='max-w-6xl mx-auto px-6 my-8'>
      <Outlet />
    </section>
  );
};

export default MainLayout;