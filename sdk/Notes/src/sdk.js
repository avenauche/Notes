const http = require('http');
const https = require('https');
const { URL } = require('url');

let config = {
  apiBaseUrl: 'http://localhost:3000'
};

function init(userConfig = {}) {
  config = { ...config, ...userConfig };
}

function request(path, method = 'GET', body) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, config.apiBaseUrl);
    const isHttps = url.protocol === 'https:';
    const client = isHttps ? https : http;

    const options = {
      method,
      hostname: url.hostname,
      port: url.port || (isHttps ? 443 : 80),
      path: url.pathname + url.search,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const req = client.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (err) {
          reject(new Error('Invalid JSON response'));
        }
      });
    });

    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

module.exports = {
  init,

  getNotes: (tag) => {
    const query = tag ? `?tag=${encodeURIComponent(tag)}` : '';
    return request(`/notes${query}`);
  },

  getNote: (id) => {
    return request(`/note/${id}`);
  },

  createNote: ({ title, content = '', tags = '' }) => {
    return request(`/note`, 'POST', { title, content, tags });
  },

  updateNote: (id, { title, content, tags }) => {
    return request(`/note/${id}`, 'PUT', { title, content, tags });
  },

  deleteNote: (id) => {
    return request(`/note/${id}/delete`, 'POST');
  }
};
