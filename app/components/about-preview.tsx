import { Link } from 'react-router';

const AboutPreview = () => {
  return (
    <section className='mt-12 p-10 flex flex-col md:flex-row items-center gap-8 bg-gray-900'>
      <img
        src='/images/profile.png'
        alt='профіль'
        className='w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-blue-500 shadow-md'
      />
      <div>
        <h2 className='text-2xl font-bold text-white mb-2'>👋 Про мене</h2>
        <p className='text-gray-300 mb-4 max-w-xl'>
          Я Irene — розробниця-самоучка, захоплена
          створенням дружніх цифрових інтерфейсів та допомогою іншим у зростанні
          до впевнених сучасних розробників.
        </p>
        <Link
          to='/about'
          className='inline-block text-blue-400 hover:underline text-sm'
        >
          Дізнатися більше про мене →
        </Link>
      </div>
    </section>
  );
};

export default AboutPreview;