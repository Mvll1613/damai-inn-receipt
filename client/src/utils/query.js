const formatQuery = (query) => {
  if (!Object.keys(query).length) return ''
  const params = new URLSearchParams(query)
  return '?' + params.toString()
}

export default formatQuery

