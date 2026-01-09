import type { Route } from "./+types/index";
import { Form } from "react-router";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const subject = formData.get("subject") as string;
  const message = formData.get("message") as string;
  const data = {
    name,
    email,
    subject,
    message,
  };

  // Додавання валідації
  const errors: Record<string, string> = {};
  if (!name) errors.name = "Ім'я є обов'язковим.";
  if (!email) {
    errors.email = "Електронна пошта є обов'язковою.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Неправильний формат електронної пошти.";
  }
  if (!subject) errors.subject = "Тема є обов'язковою.";
  if (!message) {
    errors.message = "Повідомлення є обов'язковим.";
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }
  // Тут можна додати логіку для обробки форми, наприклад, відправку електронної пошти або збереження в базу даних.

  return { message: "Форму успішно відправлено!", data };
}

// const ContactPage = ({ actionData }: Route.ComponentProps) => {
//   const errors = actionData?.errors || {};
const ContactPage = () => {
  return (
    <section className="max-w-3xl mx-auto mt-12 px-6 py-8 bg-gray-900">
      <h2 className="text-3xl font-bold text-white mb-8 text-center">
        📬 Contact Me
      </h2>
      {/* 
      {actionData?.message ? (
        <p className='mb-6 p-4 bg-green-700 text-green-100 text-center rounded-lg border border-green-500 shadow-sm'>
          {actionData.message}
        </p>
      ) : null} */}

      <form
        method="POST"
        action="https://formspree.io/f/xeejvrgn"
        className="space-y-6"
      >
        {/* Повне ім'я */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-300"
          >
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full mt-1 px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-100"
          />
          {/* {errors.name && (
            <p className='text-red-400 text-sm mt-1'>{errors.name}</p>
          )} */}
        </div>

        {/* Електронна пошта */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-300"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full mt-1 px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-100"
          />
          {/* {errors.email && (
            <p className='text-red-400 text-sm mt-1'>{errors.email}</p>
          )} */}
        </div>

        {/* Тема */}
        <div>
          <label
            htmlFor="subject"
            className="block text-sm font-medium text-gray-300"
          >
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            className="w-full mt-1 px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-100"
          />
          {/* {errors.subject && (
            <p className='text-red-400 text-sm mt-1'>{errors.subject}</p>
          )} */}
        </div>

        {/* Повідомлення */}
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-300"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            className="w-full mt-1 px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-100"
          />
          {/* {errors.message && (
            <p className='text-red-400 text-sm mt-1'>{errors.message}</p>
          )} */}
        </div>

        {/* Кнопка відправки */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Send Message
        </button>
      </form>
    </section>
  );
};
export default ContactPage;
