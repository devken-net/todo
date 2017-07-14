class Api {
  
  /** @description headers.
   * @return {any} header object 
   */
  static headers() {
    return {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'dataType': 'json',
    }
  }

  /** @description fetch GET method.
   * @param {string host} url host
   * @return {any}
   */
  static get(headers, url) {
    return this.xhr(headers, url, null, 'GET');
  }

  /** @description fetch PUT method.
   * @param {string sessionId} user session
   * @param {string host} url host
   * @param {any params} parameter
   * @return {any}
   */
  static put(headers, url, params) {
    return this.xhr(headers, url, params, 'PUT')
  }

  /** @description fetch POST method.
   * @param {string sessionId} user session
   * @param {string url} url
   * @param {any params} parameter
   * @return {any}
   */
  static post(headers, url, params) {
    return this.xhr(headers, url, params, 'POST')
  }

  /** @description fetch DELETE method.
   * @param {string sessionId} user session
   * @param {string url} url
   * @param {any params} parameter
   * @return {any}
   */
  static delete(headers, url, params) {
    return this.xhr(headers, url, params, 'DELETE')
  }

  static xhr(headers, url, params, verb) {
    let options = Object.assign({ method: verb }, params ? { body: JSON.stringify(params) } : null );
    options.headers = headers;
    
    return fetch(url, options).then( resp => {
      let json = resp.json();
      if (resp.ok) {
        return json
      }
      return json.then(err => {throw err});
    })
    .then( json => {
      return json
    })
    .catch( error => {
      throw error
    })
  }
}
export default Api