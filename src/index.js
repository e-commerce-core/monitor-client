class Monitor {
  constructor ({id, url}) {
    this._id = id // ID
    this._url = url // 需要上报的
    this._disabled = window.performance == null // 是否支持浏览器
    setTimeout(() => {
      console.log('加载耗时:' + performance.now())
      this.send(this.getMainTiming())
    }, 0)
  }
  getMainTiming () {
    console.log(`${this._disabled ? '很遗憾您的浏览器不支持!' : '很荣幸您的浏览器支持!'}`)
    if (this._disabled) return {}

    let timing = performance.timing
    // DNS查询耗时 ：domainLookupEnd - domainLookupStart
    // TCP链接耗时 ：connectEnd - connectStart
    // request请求耗时 ：responseEnd - responseStart
    // 解析dom树耗时 ： domComplete - domInteractive
    // 白屏时间 ：responseStart - navigationStart
    // domready时间 ：domContentLoadedEventEnd - navigationStart
    // onload时间 ：loadEventEnd - navigationStart
    return {
      dns: timing.domainLookupEnd - timing.domainLookupStart,
      tcp: timing.connectEnd - timing.connectStart,
      request: timing.responseEnd - timing.responseStart,
      dom: timing.domComplete - timing.domInteractive,
      white: timing.responseStart - timing.navigationStart,
      domready: timing.domContentLoadedEventEnd - timing.navigationStart,
      onload: timing.loadEventEnd - timing.navigationStart
    }
  }
  getResourceTiming () {
    let resources = []
    for (let entry of performance.getEntriesByType('resource')) {
      let {name, initiatorType, startTime, duration} = entry
      let resource = {
        name, 
        initiatorType, 
        startTime: parseFloat(startTime.toFixed(3)), 
        duration: parseFloat(duration.toFixed(3))
      }
      resources.push(resource)
    }
    return resources
  }
  send (param = {}) {
    if (window.navigator.sendBeacon) {
      this.sendByNavigator(param)
    } else {
      this.sendByImage(param)
    }
  }
  sendByImage (param = {}) {
    let image = new Image()
    let query = []
    for (let [key, val] of Object.entries(param)) {
      query.push(`${key}=${encodeURIComponent(val)}`)
    }
    image.src = `${this._url}?${query.join('&')}`
  }
  sendByNavigator (param = {}) {
    let data = new FormData()
    for (let [key, val] of Object.entries(param)) {
      data.append(key, val)
    }
    window.navigator.sendBeacon(this._url, data)
  }
}

export {
  Monitor
}
