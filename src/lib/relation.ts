export function relationId(value: unknown): string | undefined {
  if (!value) return undefined
  if (typeof value === 'string') return value
  return (value as { id: string }).id
}

export function relationField<T = string>(value: unknown, field: string): T | undefined {
  if (!value || typeof value === 'string') return undefined
  return (value as Record<string, unknown>)[field] as T | undefined
}
