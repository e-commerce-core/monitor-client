# monitor-frontend

- [x] 增加最基本的信息监测

# 使用

## npm使用
``` bash
npm install monitor-client -S
```

``` javascipt
import { Monitor } from 'monitor-client'
new Monitor({id: 'YourID', url: 'YourUrl'})
```

## 直接引入 dist/index.js

``` javascipt
new Monitor({id: 'YourID', url: 'YourUrl'})
```

# 相关方法

``` javascipt
Monitor.getMainTiming() // 总耗时信息
Monitor.getResourceTiming() // 相关资源耗时
```

# TODO

- [ ] 在vue spa 以及 ssr次页 监测支持
