function ErrorScreen({
  message,
  onRetry,
  title = 'Archive Connection Lost',
  description = 'The shinobi records are temporarily unavailable. Please try reconnecting.',
}) {
  return (
    <div
      role="alert"
      className="mx-auto flex min-h-[350px] max-w-xl flex-col items-center justify-center rounded-2xl border border-red-900/40 bg-[#252A33] px-6 py-12 text-center"
    >
      <span className="text-6xl text-red-400">
        封
      </span>

      <h2 className="mt-6 text-2xl font-bold text-[#F1E3C6]">
        {title}
      </h2>

      <p className="mt-4 text-gray-400">
        {description}
      </p>

      <p className="mt-3 text-xs text-red-300">
        {message}
      </p>

      <button
        type="button"
        onClick={onRetry}
        className="mt-8 rounded-xl bg-orange-600 px-8 py-3 font-bold text-white transition hover:bg-orange-500"
      >
        TRY AGAIN
      </button>
    </div>
  )
}

export default ErrorScreen