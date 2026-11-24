import { formatValue } from '../utils/formatters'

function RecordList({ title, items, symbol }) {
  const records = Array.isArray(items)
    ? items
    : items
      ? [items]
      : []

  return (
    <section className="rounded-xl border border-orange-900/30 bg-[#252A33] p-6">

      <h2 className="mb-6 border-b border-orange-900/40 pb-4 text-xl font-bold tracking-wider text-orange-400">
        {title}
      </h2>

      {records.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {records.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-4 rounded-lg border border-orange-900/30 bg-[#20252D] p-4 transition duration-300 hover:border-orange-500/60"
            >
              <span className="shrink-0 text-2xl text-orange-400">
                {symbol}
              </span>

              <p className="min-w-0 break-words text-[#F1E3C6]">
                {formatValue(item)}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="py-8 text-center text-gray-400">
          No records available.
        </p>
      )}

    </section>
  )
}

export default RecordList