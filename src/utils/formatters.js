export function formatLabel(value) {
  return value
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2')
    .replace(/^./, (letter) => letter.toUpperCase())
}

export function formatValue(value) {
  if (value === null || value === undefined || value === '') {
    return 'Unknown'
  }

  if (Array.isArray(value)) {
    return value.length
      ? value.map(formatValue).join(', ')
      : 'Unknown'
  }

  if (typeof value === 'object') {
    return Object.entries(value)
      .map(([key, item]) => `${formatLabel(key)}: ${formatValue(item)}`)
      .join(' | ')
  }

  return String(value)
}