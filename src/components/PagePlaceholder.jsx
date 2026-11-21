
function PagePlaceholder({ title, description }) {
  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center px-6 text-center text-white">
      <h1 className="text-5xl font-bold text-orange-500">
        {title}
      </h1>

      <p className="mt-4 text-lg text-gray-300">
        {description}
      </p>

      <p className="mt-8 text-sm text-gray-500">
        Shinobi Archives — Coming Soon
      </p>
    </div>
  )
}

export default PagePlaceholder
