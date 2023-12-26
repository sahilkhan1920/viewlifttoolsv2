type FetchHelper = {
  url: string
  method: string
  data?: object
  headers?: object
}
let controller: AbortController;
const fetchHelper = ({ url, method, data, headers = {} }: FetchHelper) => {
  // const controller = new AbortController()
  
  if (controller) controller.abort();
  controller = new AbortController();
  return fetch(url, {
    method: `${method}`, // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: JSON.stringify(data),
    signal: controller.signal,
  })
    .then(async (response) => {
      if (response.status === 403) {
        window.location.replace(window.location.host)
        return
      }

      const data = await response.json()
      if (data.status) {
        data['contentStatus'] = data.status
      }
      data['status'] = response.status
      return data
    })
    .catch((error) => {
      console.error('Error:', error)
    })
}

export default fetchHelper
