function getReportUrl(url) {
  return `${window.location.protocol}//${url}`;
}

function makeRndString() {
  return `${new Date().valueOf()}_${Math.random() * 10000}`;
}

export function report(url, data) {
  const reportUrl = getReportUrl(url);
  // 优先使用sendBeacon
  if (window.navigator.sendBeacon) {
    console.log(data);
    return window.navigator.sendBeacon(reportUrl, new FormData(data));
  }
  const rndKey = `report_img_${makeRndString()}`;
  const img = window.WebMoniter[rndKey] = new Image();
  img.onload = img.onerror = function () {
    window.WebMoniter[rndKey] = null; // 手动清理
  }
  img.src = reportUrl;
}
