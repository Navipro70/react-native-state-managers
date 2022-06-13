export const getReferencesByIds = <T extends object>(ids: number[], data: Map<number, T>) => {
  const referenceData: T[] = []

  ids.forEach((id) => {
    const hasItem = data.has(id)
    if (hasItem) {
      const referenceItem = data.get(id)
      if (referenceItem) referenceData.push(referenceItem)
    }
  })

  return referenceData
}
