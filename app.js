'use strict';
// app.js
class AppBootHook {
  constructor(app) {
    this.app = app;
  }

  configWillLoad() {
    // 此时 config 文件已经被读取并合并，但是还并未生效
    // 这是应用层修改配置的最后时机
    // 注意：此函数只支持同步调用
    this.app.logger.info('配置文件即将加载');

  }
  async configDidLoad() {
    // 所有的配置文件加载完成
    this.app.logger.info('所有的配置文件加载完成');
  }
  async didLoad() {
    // 所有的文件已经加载完毕
    // 可以用来加载应用自定义的文件，启动自定义的服务
    this.app.logger.info('所有的文件已经加载完毕');
  }

  async willReady() {
    // 所有的插件都已启动完毕，但是应用整体还未 ready
    // 可以做一些数据初始化等操作，这些操作成功才会启动应用
    this.app.logger.info('所有的插件都已启动完毕，但是应用整体还未 ready');
  }

  async didReady() {
    // worker 准备就绪
    this.app.logger.info('worker 准备就绪');
  }

  async serverDidReady() {
    // http / https server 已启动，开始接受外部请求
    // 此时可以从 app.server 拿到 server 的实例
    this.app.logger.info('应用启动完成');

  }
  async beforeClose() {
    // 引用即将关闭
    this.app.logger.info('应用即将关闭');
  }
}

module.exports = AppBootHook;
