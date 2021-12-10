export default async function fetcher(...args) {
    try {
      const response = await fetch(...args)
  
      // if the server replies, there's always some data in json
      // if there's a network error, it will throw at the previous line
      const data = await response.json()
  
      if (response.ok) {
        return data
      }
    } catch (error) {
      console.log(error)
      if (!error.data) {
        error.data = { message: error.message }
      }
      throw error
    }
  }
  