var fs = require("fs");

class BasicPlugin{
  // 在构造函数中获取用户给该插件传入的配置
  constructor(options){
    this.htmlName = 'index.html'
    this.rootPath = './dist/'
    this.entryFileName = ''
    this.entryOriginContent = ''
    this.entryNewConent = ''
    this.vue_router = {}
    this.vue_components = []
  }
  // Webpack 会调用 BasicPlugin 实例的 apply 方法给插件实例传入 compiler 对象
  apply(compiler){
		var that = this
    compiler.plugin('done', function(compilation) {
      that.getEntry()
      that.getEntryConent()
      // that.extractStaticRouter()
			that.extractVueRouter()
      that.extractVueComponent()
      that.outputComponentEntry()
      setTimeout(() => {
        that.resetEntryContent()
      }, 0)
      // console.log(that.vue_components)
    })
  }
  getEntry() {
    var data = fs.readFileSync(this.rootPath + this.htmlName);
    var rule = new RegExp("href=(js\\/app\\.[0-9|a-z]*?\\.js)")
    try{
      var entry = rule.exec(data)[1]
      this.entryFileName = entry
    }catch(e){
      //TODO handle the exception
      console.error(e)
    }
  }
  getEntryConent() {
    this.entryNewConent = this.entryOriginContent = fs.readFileSync(this.rootPath + this.entryFileName)
    console.log(this.entryNewConent)
  }
  extractStaticRouter() {
		this.extractVueRouter()
	}
	extractVueRouter() {
    var rule = new RegExp("new u.a\\(([\\s\\S]*?\\})\\)")
    var vue_router = rule.exec(this.entryOriginContent)[1]
    vue_router = "function s(){}" + "return" + vue_router
    vue_router = (new Function(vue_router))() // 转换为对象
    this.vue_router = vue_router
    this.VueRouterAlternative()
  }
  VueRouterAlternative() {
    var alternative = `
                        function replace_route(Vue) {
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
                            let url = './' + path.replace('/', '_') + '.html?'
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
    `
    var entryNewConent = this.entryNewConent.toString()
    entryNewConent = entryNewConent.replace('r.default.use(u.a)', `replace_route(r.default)`)
    entryNewConent = entryNewConent.replace('router:f,', '')
    this.entryNewConent = alternative + entryNewConent
  }
  extractVueComponent() {
    var componentRule = new RegExp('components:[\\s\\S]*?\\{([\\s\\S]*?)\\}')
    var components = componentRule.exec(this.entryOriginContent)[1]
    this.vue_components = components
    this.attachEntryComponents()
  }
  getRealComponent(route, origin) {
    this.vue_router.routes.forEach(item => {
      if(item.path === route.redirect) {
        if(item.component) {
          origin.component = item.component
        } else {
          if(item.redirect) {
            this.getRealComponent(item, origin)
          }
        }
      }
    })
  }
  attachEntryComponents() {
    var originComponents = this.vue_components
    var attachComponents = []
		this.vue_router.routes.forEach(item => {
			item.filename = item.path.replace('/', '_')
			if(item.path === '*') {
				item.filename = 'default'
			}
		})
    this.vue_router.routes.forEach(item => {
      if(item.redirect) { // 将redirect映射为真实组件
        this.getRealComponent(item, item)
      }
    })
		this.vue_router.routes.forEach(item => {
			attachComponents.push(item.filename + ':' + item.component)
		})
    if(originComponents.trim().length > 0 && attachComponents.length > 0) {
      originComponents = originComponents + ',' + attachComponents.join(',')
    } else {
      originComponents = attachComponents.join(',')
    }
    var replaceStr = this.entryNewConent.toString()
    // 重置components
    replaceStr = replaceStr.replace(/components:[\s\S]*?\}/, "components:{" + originComponents + '}')
    replaceStr = replaceStr.replace(`"router-view"`, 'dynamic_route') // 把view route的根组件切换为根据url匹配出来的动态组件
    // 根据url匹配出对应的组件进行渲染
    console.log(this.vue_router)
		var switch_case = ''
    this.vue_router.routes.forEach(item => {
      if(item.path === '/') {
        switch_case += `
          case 'index.html':
            currentComponent = '${item.filename}'
          break;
        `
      }
      else if(item.path === '*') {
        switch_case += `
          default:
            currentComponent = '${item.filename}'
          break;
        `
      } else {
        switch_case += `
          case '${item.filename}.html':
            currentComponent = '${item.filename}'
          break;
        `
      }
    })
    var dynamic_route = `var dynamic_route = (function(){
                          var pathname = window.location.pathname
                          var posi = pathname.lastIndexOf('/')
                          var filename = pathname.substring(posi + )
                          var currentComponent = null
                          switch(filename) {
                            ${switch_case}
                          }
                          return currentComponent
                        })() \n `
    replaceStr = dynamic_route + replaceStr
    this.entryNewConent = replaceStr
		// console.log('replaceStr', dynamic_route)
  }
  outputComponentEntry() {
    // 根据routes[n].path生成对应的html
		console.log(this.vue_router)
    this.vue_router.routes.forEach(item => {
      if(item.path !== "/" && item.path !== "*") {
        fs.copyFile(this.rootPath + this.entryFileName, this.rootPath + item.filename + '.html', function(err){
        	if (err) {
        		console.log('something wrong was happened')
        	} else {
        		console.log('copy file succeed')
        	}
        })
      }
    })
  }
  resetEntryContent() {
    fs.writeFile(this.rootPath + this.entryFileName, this.entryNewConent,  function(err) {
       if (err) {
           return console.error(err);
       }
       console.log("数据写入成功！");
    });
  }
}

// 导出 Plugin
module.exports = BasicPlugin;
