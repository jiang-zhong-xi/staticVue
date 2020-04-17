var fs = require("fs");

class BasicPlugin{
  // 在构造函数中获取用户给该插件传入的配置
  constructor(options){
  }

  // Webpack 会调用 BasicPlugin 实例的 apply 方法给插件实例传入 compiler 对象
  apply(compiler){
		var that = this
    compiler.plugin('done',function(compilation) {
			// var data = require('./dist/bundle.js')

      fs.readFile('./dist/index.html', function (err, data) {
			  if (err) {
          return console.error(err);
			  }
        var rule = new RegExp("href=(js\\/app\\.[0-9|a-z]*?\\.js)")
        var entry = './dist/' +　rule.exec(data)[1]
        console.log(entry)
        fs.readFile(entry, function (err, data) {
        			  if (err) {
        			       return console.error(err);
        			  }
        				var rule = new RegExp("new u.a\\(([\\s\\S]*?\\})\\)")
        				var vue_router = rule.exec(data)[1]
        				vue_router = "function s(){}" + "return" + vue_router
        				vue_router = (new Function(vue_router))()

        				var componentRule = new RegExp('components:[\\s\\S]*?\\{([\\s\\S]*?)\\}')
        				var originComponents = componentRule.exec(data)[1]
        				var components = []
        				if(originComponents) {
        					components = [originComponents]
        				}

        				vue_router.routes.forEach(item => {
        					if(item.path !== "/" && item.path !== "*") {
        						that.copyHTML(item.path + '.html')
        						components.push(item.name + ':' + item.component)
        					}
        				})
        				var replaceStr = data.toString()
        				replaceStr = replaceStr.replace(/components:[\s\S]*?\}/, "components:{" + components.join(',') + '}')
        			  replaceStr = replaceStr.replace(`"router-view"`, 'dynamic_route')
        				replaceStr = `function replace_route(Vue) {
        	var args = window.location.search
        	function parseQuery (query) {
        	    var res = {}
        	    query = query.trim().replace(/^(\\?|#|&)/, '')
        	    if (!query) {
        	      return res
        	    }
        	    query.split('&').forEach(function (param) {
        	      var parts = param.replace(/\\+/g, ' ').split('=')
        	      var key = decodeURIComponent(parts.shift())
        	      var val = parts.length > 0 ? decodeURIComponent(parts.join('=')) : null
        	      if (res[key] === undefined) {
        	        res[key] = val
        	      } else if (Array.isArray(res[key])) {
        	        res[key].push(val)
        	      } else {
        	        res[key] = [res[key], val]
        	      }
        	    })

        	    return res
        	  }
        	var params = parseQuery(args)
        	Vue.prototype.$route = {}
        	Vue.prototype.$route.query = params

        	let $router = Vue.prototype.$router = {}
        	$router.push = function({path, query}) {
        	  let url = './' + path + '.html?'
        	  let _args = []
        	  if (typeof query === 'object') {
        	    Object.keys(query).forEach(key => {
        	      _args.push(key + '=' + query[key])
        	    })
        	  }
        	  url += _args.join('&')
        	  window.location.href = url
        	}
        } \n
        var dynamic_route = (function(){
        					var posi = window.location.pathname.lastIndexOf('/')
        					var filename = window.location.pathname.substr(posi + 1)
        					if(filename === 'index.html') {
        						return 'OrderList'
        					} else {
        						return 'OrderDetail'
        					}
        				})() \n ` + replaceStr
        				replaceStr = replaceStr.replace('r.default.use(u.a)', `replace_route(r.default)`)
        				replaceStr = replaceStr.replace('router:f,', '')
        				fs.writeFile(entry, replaceStr,  function(err) {
        				   if (err) {
        				       return console.error(err);
        				   }
        				   console.log("数据写入成功！");
        				});

        			});
      })



    })
  }

	copyHTML(dest) {
		fs.copyFile('./dist/index.html', './dist/' + dest, function(err){
			if (err) {
				console.log('something wrong was happened')
			} else {
				console.log('copy file succeed')
			}
		})
	}
}

// 导出 Plugin
module.exports = BasicPlugin;
