class HttpService {

  static get(url, data = {}, headers = {}) {
    return fetch(url, { method: 'GET', body: data })
              .then(response => response.json())
              .then(json => json)
              .catch(error => error.json())
  }

}

export default HttpService
