function EmptySearch({
  onClear,
  title = 'No Shinobi Found',
  description = 'No ninja records match your search. Try another name or return to the archives.',
  buttonText = 'BACK TO ARCHIVES',
}) {
  return (
    <div className="mx-auto flex min-h-[350px] max-w-xl flex-col items-center justify-center rounded-2xl border border-orange-900/30 bg-[#252A33] px-6 py-12 text-center">

      <span className="text-7xl text-orange-400/50">
        忍
      </span>

      <h2 className="mt-6 text-2xl font-bold text-[#F1E3C6]">
        {title}
      </h2>

      <p className="mt-4 text-gray-400">
        {description}
      </p>

      <button
        type="button"
        onClick={onClear}
        className="mt-8 rounded-xl border border-orange-500/50 bg-orange-950/40 px-7 py-3 font-semibold text-orange-200 transition hover:bg-orange-900/50"
      >
        {buttonText}
      </button>

    </div>
  )
}

export default EmptySearch