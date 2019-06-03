class Response {
  constructor(body = {}) {
    this.body = body;
  }
  status(code) {
    this.status = code;
    return this;
  }
  json(body) {
    this.body = body;
    return this;
  }
}

module.exports = Response;