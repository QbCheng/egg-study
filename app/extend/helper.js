'use strict';

module.exports = {
  // 内部消息
  formatInternalMsg(code, errmsg, data) {
    return {
      code,
      errmsg,
      data,
    };
  },

  // http消息返回
  formatMsg(msg) {
    this.ctx.body = msg;
  },

  // 获取http消息参数
  async getRequestParameter() {
    const requestContentType = this.ctx.request.is();
    // 当类型获取失败直接返回
    const retData = {
      commonData: null,
      stream: null,
      validate: false, // 是否需要做参数效验
    };
    if (requestContentType === 'application/x-www-form-urlencoded') {
      retData.commonData = this.ctx.request.body;
    } else if (requestContentType === 'multipart/form-data') {
      // requireFile: false表示文件不是必须存在的
      const stream = await this.ctx.getFileStream({ requireFile: false });
      // -TODO: 现在获取按照文本格式传入的参数数据
      retData.commonData = stream.fields;
    } else if (requestContentType === 'application/json') {
      retData.commonData = this.ctx.request.body;
      // -TODO: 注意到只有application/json数据会保持数据的原始类型，其余的貌似都变成来字符串.暂时没找到解决方法
      retData.validate = true;
    } else {
      const errorMessage = 'content-type Only support application/x-www-form-urlencoded or multipart/form-data or application/json';
      return this.formatInternalMsg(-1, errorMessage, []);
    }
    return this.formatInternalMsg(0, 'succ', retData);
  },

  // 判断字符是否为空的方法
  isEmpty(obj) {
    if (typeof obj === 'undefined' || obj == null || obj === '') {
      return true;
    }
    return false;
  },

};
