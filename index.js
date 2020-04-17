var StaticVue = require('./lib/staticVue.js')
var MockWebpack = require('./lib/mockWebpack.js')

var compiler = new MockWebpack()
var staticVue = new StaticVue()
staticVue.apply(compiler)

module.exports = StaticVue