export default function Home() {
  return (
    <div className="max-w-md mx-auto flex flex-col gap-4 p-8 items-center text-center">
      <h2 className="text-3xl font-bold">Welcome!</h2>
      <p className="text-lg text-gray-600 dark:text-gray-300">
        This is a React + Tailwind playground. Use the top menu to explore the features.
      </p>
      <p className="text-sm text-gray-400 mt-8">
        More features coming soon!
      </p>
    </div>
  )
}