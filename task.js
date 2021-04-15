const fs = require('fs-extra')
 const path = require('path')
// Async with promises:
fs.copy(path.join(__dirname, '/build'), path.join(__dirname, '/'))
  .then(() => console.log('success!'))
  .catch(err => console.error(err))