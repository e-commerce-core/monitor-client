import { util } from './util';

export function getExceptionData(evt) {
  const perfData = window.performance.timing;
  const result = util.assign(util.getBaseData(), {
    h: window.location.href,
    f: evt.filename,
    l: evt.lineno,
    c: evt.colno,
    m: evt.message,
    s: evt.error && evt.error.stack
  });
  return result;
}
