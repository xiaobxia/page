/**
 * Created by xiaobxia on 2018/1/5.
 */
const Router = require('koa-router');
const merge = require('merge');
const pug = require('pug');
const path = require('path');
const log = require('./common/logger');
const Parameter = require('./common/validate');
const config = require('../config/index');
const getAsyncData = require('./getAsyncData');

const p = new Parameter();
const router = new Router({
  prefix: ''
});
const env = process.env.NODE_ENV;
const isDev = env === 'dev';
const baseDir = config[env].server.baseDir;
const phpAddress = config[env].phpAddress;
const pugOptions = {
  // debug: isDev,
  compileDebug: isDev
};

function validateData(rule, data) {
  let fake = {};
  for (let key in rule) {
    if (rule.hasOwnProperty(key)) {
      if (!rule[key].type) {
        rule[key].type = 'string';
      }
      fake[key] = data[key];
    }
  }
  let msgList = p.validate(rule, fake);
  if (msgList !== undefined) {
    let msg = msgList[0];
    throw new Error(msg.field + ' ' + msg.message);
  } else {
    return fake;
  }
}

function getViewFile(fileName) {
  return path.resolve(baseDir, fileName);
}

function renderPug(ctx, path, data) {
  const s = Date.now();
  try {
    const result = pug.renderFile(getViewFile(path), merge(pugOptions, data));
    log.info(`渲染用时: ${Date.now() - s}ms`);
    return result;
  } catch (err) {
    ctx.throw(500, '渲染出错');
  }
}
/**
 * 路由部分
 */

router.get('/', async (ctx) => {
  log.trace('请求进入: /');
  ctx.body = renderPug(ctx, 'index.pug');
});

module.exports = router;
