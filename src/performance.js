function getBaseData() {
  return {
    ul: navigator.language,
    p: navigator.platform,
    je: navigator.javaEnabled(),
    mtp: navigator.maxTouchPoints,
    sr: `${screen.width}*${screen.height}`,
    vp: screen.colorDepth,
    de: document.charset || document.characterSet,
    r: document.referrer
  };
}

export function getPerformanceData() {
  const perfData = window.performance.timing;
  const result = Object.assign(getBaseData(), {
    p_dl: perfData.domainLookupEnd - perfData.domainLookupStart,
    p_tc: perfData.connectEnd - perfData.connectEnd,
    p_pl: perfData.loadEventEnd - perfData.navigationStart,
    p_c: perfData.responseEnd - perfData.requestStart,
    p_r: perfData.domComplete - perfData.domLoading,
    p_dcl: perfData.domContentLoadedEventEnd - perfData.navigationStart,
    p_o: perfData.loadEventEnd - perfData.navigationStart,
    p_rdt: perfData.domComplete - perfData.domInteractive,
    p_ws: perfData.domLoading - perfData.navigationStart
  });
  return result;
}
