/* eslint-disable camelcase, import/prefer-default-export */
const coalesce = function (values) {
  for (const elem of values) {
    if (elem) return elem
  }
  return null
}

// NOTE/TODO: Get child for any generation, even if from another location?
export const parseFamily = function (data) {
  const dateOrder = ['date_marriage_1', 'date_birth', 'date_death']
  const dates = []
  const parsed = data
    .slice()
    .sort((a, b) => {
      const dateA = coalesce(dateOrder.map(d => a[d]))
      const dateB = coalesce(dateOrder.map(d => b[d]))
      return new Date(dateB) - new Date(dateA)
    })
    .map(elem => {
      const {
        reference,
        full_name,
        spouse_first_name,
        spouse_last_name,
        date_birth,
        date_death,
        date_marriage_1,
      } = elem

      const dateVals = [date_birth, date_death, date_marriage_1]
      const str = spouse_last_name ? `${full_name} oo ${spouse_first_name} ${spouse_last_name}` : full_name
      const child = data.find(item => item.father_reference === reference
        || item.mother_reference === reference)

      dateVals.forEach(val => {
        if (val) {
          dates.push(new Date(val))
        }
      })

      return {
        year: new Date(coalesce(dateVals)).getFullYear(),
        displayStr: str,
        child: child ? child.full_name : null,
      }
    })
  dates.sort((a, b) => a - b)

  return {
    familyData: parsed,
    dates: {
      first: dates?.[0]?.getFullYear(),
      last: dates[dates.length - 1]?.getFullYear(),
    },
  }
}
