const express = require('express');
const app = express();
const cors = require('cors')

app.use(cors())

class Cors {
  constructor(option) {
    this.option = option;
  }
  getCorsOptions() {
    return this.option
  }
}

const cors_instance = new Cors({
  origin: ['http://localhost:5173/'],
  optionsSuccessStatus: 200,
  allowedHeaders: ['Content-Type', 'authorization', 'user_code']
});

module.exports = cors_instance;
