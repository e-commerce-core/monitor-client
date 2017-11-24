import { util } from './util';

export function getPerformanceData() {
  const perfData = window.performance.timing;
  const result = util.assign(util.getBaseData(), {
    p_dl: perfData.domainLookupEnd - perfData.domainLookupStart, // DNS解析耗时
    p_tc: perfData.connectEnd - perfData.connectEnd, // TCP连接耗时
    p_pl: perfData.loadEventEnd - perfData.navigationStart, // 页面加载耗时（Load）
    p_sr: perfData.responseStart - perfData.requestStart, // 发送请求耗时
    p_srp: perfData.responseEnd - perfData.responseStart, // 服务端响应耗时
    p_r: perfData.domComplete - perfData.domLoading, // DOM渲染耗时
    p_dcl: perfData.domContentLoadedEventEnd - perfData.navigationStart, // 页面内容加载时间（DOMCententLoaded）
    p_rdt: perfData.domComplete - perfData.domInteractive, // 解析DOM树耗时
    p_ws: perfData.domLoading - perfData.navigationStart // 白屏时间
  });
  return result;
}
