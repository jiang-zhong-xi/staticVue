class MockWebpack{
  // 在构造函数中获取用户给该插件传入的配置
  constructor(){
    
  }
	plugin(status, callback) {
		callback()
	}
}
module.exports = MockWebpack;