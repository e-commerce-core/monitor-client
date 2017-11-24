import { getPerformanceData } from './performance';
import { report } from './report';

module.exports = {
  init(options) {
    this._tid = options.id;
    this._url = options.url;
    window.addEventListener('load', () => {
      setTimeout(() => {
        const data = getPerformanceData();
        data.tid = this._tid;
        data.t = 'performance';
        report(this._url, data);
      })
    }, false);
  },
  push(path) {
    const data = {};
    data.t = 'pageview';
    data.tid = this._tid;
    report(this._url, data);
  }
};
