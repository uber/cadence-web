const basePath = (process.env.CADENCE_WEB_ROOT || '/') === '/' ? '' : process.env.CADENCE_WEB_ROOT

export default function http(fetch, url, o) {
  var opts = Object.assign({
    credentials: 'same-origin',
    headers: {
      Accepts: 'application/json'
    }
  }, o)

  if (opts.query) {
    var qs = Object.keys(opts.query)
      .filter(k => opts.query[k] != null)
      .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(opts.query[k])}`)
      .join('&')

    if (qs) {
      url = url + '?' + qs
    }
  }

  return fetch(basePath + url, opts).then(
    r => r.status >= 200 && r.status < 300 ?
      r.json().catch(() => {}) :
      r.json().then(
        json => Promise.reject(Object.assign(r, { json })),
        () => Promise.reject(r)
      )
  )
}

http.post = function(fetch, url, body) {
  return http(fetch, url, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

http.global = http.bind(null, window.fetch)
http.global.post = http.post.bind(null, window.fetch)