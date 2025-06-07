import getDuckDB from './apiClient'

const runQuery = async function (query) {
  const db = await getDuckDB()
  const conn = await db.connect()
  const result = await conn.query(query)
  const data = result.toArray().map((row) => row.toJSON())

  return data
}

export const selectAll = async function () {
  const query = `
    SELECT 
      id, 
      first_name, 
      last_name, 
      last_name_normed, 
      place,
      point,
      latitude,
      longitude,
      year_birth,
      year_death
    FROM family
  `
  return runQuery(query)
}

// export const test = null
