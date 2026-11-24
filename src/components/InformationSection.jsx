import { formatLabel, formatValue } from '../utils/formatters'

function InformationSection({ title, data }) {
  const entries = Object.entries(data ?? {}).filter(
    ([, value]) => value !== null && value !== undefined
  )

  return (
    <section className="rounded-xl border border-orange-900/30 bg-[#252A33] p-6">

      <h2 className="mb-6 border-b border-orange-900/40 pb-4 text-xl font-bold tracking-wider text-orange-400">
        {title}
      </h2>

      {entries.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {entries.map(([key, value]) => (
            <div
              key={key}
              className="rounded-lg border border-orange-900/20 bg-[#20252D] p-4"
            >
              <p className="mb-2 text-xs uppercase tracking-widest text-orange-400">
                {formatLabel(key)}
              </p>

              <p className="break-words leading-relaxed text-[#F1E3C6]">
                {formatValue(value)}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="py-8 text-center text-gray-400">
          No information available in the archives.
        </p>
      )}

    </section>
  )
}

export default InformationSection