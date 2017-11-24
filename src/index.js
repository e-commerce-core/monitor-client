import { getExceptionData } from './exception';
import { getPerformanceData } from './performance';
import { report } from './report';

module.exports = {
  init(options) {
    this._tid = options.id;
    this._url = options.url;
    this._sendPerfermanceData();
    if (options.reportException === true) {
      this._initAutoReportException();
    }
  },
  _sendPerfermanceData() {
    const self = this;
    window.addEventListener('load', function () {
      setTimeout(function () {
        const data = getPerformanceData();
        data.tid = self._tid;
        data.t = 'performance';
        report(self._url, data);
      })
    }, false);
  },
  _initAutoReportException() {
    const self = this;
    window.addEventListener('error', function (evt) {
      self.trackException(evt);
    }, false);
  },
  trackPageView(path) {
    const data = {
      t: 'pageview',
      tid: this._tid,
      dp: path,
      dh: `${document.location.protocol}//${document.location.host}`
    };
    report(this._url, data);
  },
  trackException(evt) {
    const self = this;
    const data = getExceptionData(evt);
    data.tid = self._tid;
    data.t = 'exception';
    report(self._url, data);
  }
};
