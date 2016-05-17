module.exports = function () {
  return Promise.all([
    require('./users')()
  ]);
}
