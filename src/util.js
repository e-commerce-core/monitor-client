export const util = {
  assign(target) {
    const args = [].slice.call(arguments, 1);
    var arg;
    while (arg = args.shift()) {
      if (typeof arg !== 'object') {
        continue;
      }
      for (var p in arg) {
        if (arg.hasOwnProperty(p)) {
          target[p] = arg[p];
        }
      }
    }
    return target;
  },
  getBaseData() {
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
};
