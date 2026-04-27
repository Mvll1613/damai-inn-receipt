const headerObject = {
  'Cache-Control': 'no-cache',
  'Content-Type': 'application/json'
}

const getDataViaApi = async url => {
  try {
    const res = await fetch(url, { headers: headerObject })
    if (!res.ok) {
      throw await res.json()
    }

    return await res.json()
  } catch (error) {
    throw error
  }
}

const postDataViaApi = async (url, data) => {
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: headerObject,
      body: JSON.stringify(data)
    })
    
    if (!res.ok) {
      throw await res.json()
    }

    return await res.json()
  } catch (error) {
    throw error
  }
}

const putDataViaApi = async (url, data) => {
  try {
    const res = await fetch(url, {
      method: 'PUT',
      headers: headerObject,
      body: JSON.stringify(data)
    })
    
    if (!res.ok) {
      throw await res.json()
    }

    return await res.json()
  } catch (error) {
    throw error
  }
}

const deleteDataViaApi = async url => {
  try {
    const res = await fetch(url, {
      method: 'DELETE',
      headers: headerObject
    })
    
    if (!res.ok) {
      throw await res.json()
    }

    return await res.json()
  } catch (error) {
    throw error
  }
}

export default {
  getDataViaApi,
  postDataViaApi,
  putDataViaApi,
  deleteDataViaApi
}
