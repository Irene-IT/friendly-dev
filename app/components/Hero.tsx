import { Link } from 'react-router';

interface HeroProps {
  name?: string;
  text?: string;
}

const Hero = ({
  name = '[ІМʼЯ]',
  text = 'Я створюю дружні веб-інтерфейси та допомагаю іншим стати впевненими, сучасними розробниками.',
}: HeroProps) => {
  return (
    <header className='text-center py-20 px-4 bg-gray-900 text-white transition-colors duration-300'>
      <h2 className='text-4xl font-bold mb-4'>Привіт, я {name} 👋</h2>
      <p className='text-lg text-gray-300 max-w-2xl mx-auto mb-6'>{text}</p>
      <div className='flex justify-center gap-4'>
        <Link
          to='/projects'
          className='bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition'
        >
          Переглянути проєкти
        </Link>
        <Link
          to='/contact'
          className='border border-blue-500 text-blue-400 px-6 py-2 rounded hover:bg-blue-600 hover:text-white transition'
        >
          Зв'язатися зі мною
        </Link>
      </div>
    </header>
  );
};

export default Hero;