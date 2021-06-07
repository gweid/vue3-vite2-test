# vue3 + vite2 笔记

vue 官方中文网：https://v3.cn.vuejs.org/

vite 官方中文网：https://cn.vitejs.dev/



## 1、vite 快速搭建项目



 ### 1-1、vite 快速初始化项目

具体可参考：https://cn.vitejs.dev/guide/#scaffolding-your-first-vite-project



执行命令：

```js
npm init @vitejs/app
```

按照终端提示：

1、输入项目名

![](/imgs/img1.png)

2、选择项目模板

![](/imgs/img2.png)

3、选择类型检查

![](/imgs/img3.png)

到此，vite 就初始还好了一个 vue3 + ts 的项目



### 1-2、vite.config.ts 文件简单配置

具体配置可参考：https://cn.vitejs.dev/config/



> vite.config.ts

```js
// 提示找不到模块 path，安装：npm i @types/node -D
import path from 'path'

// defineConfig 主要是为了获得 ts 类型提示
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import styleImport from 'vite-plugin-style-import'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue()
  ],
  // 打包基础路径，类似 publicPath
  base: './',
  resolve: {
    // 配置路径别名
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    // open: true, // 是否自动打开浏览器
    port: 3000, // 端口号
    cors: true, // 允许跨域
    // hmr: true, // 使用 hmr
    // 配置代理
    // proxy: {
    //   '/api': {
    //     target: 'http://xx.xx.xxx:9000',
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, '')
    //   }
    // }
  }
})

```



### 1-3、集成 scss

使用 scss 只需要安装 sass 即可，Vite 内部已经提供了对 `.scss` 的支持，可参考：https://cn.vitejs.dev/guide/features.html#css-pre-processors

```js
npm install -D sass
```



### 1-4、集成 vue-router4.x

具体可参考：https://next.router.vuejs.org/zh/guide/



1、安装 vue-router4.x：

```js
npm i vue-router@4
```

2、配置路由文件：

```js
src
├── router
│   ├── index.ts
```

```js
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '@/modules/Home/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/mine',
    name: 'Mine',
    component: () => import('@/modules/Mine/index.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router
```

- 路由创建改为 createRouter 的形式
- 之前的 mode=‘hash’ 改成函数定义形式 `history: createWebHashHistory()`

3、在 main.ts 中使用路由

```js
import { createApp } from 'vue'
import router from './routers'

const app = createApp(App)

app.use(router)
```



### 1-5、集成 vuex4.x

具体可参考：https://next.vuex.vuejs.org/zh/index.html



1、安装：

```js
npm i vuex@next
```

2、基本配置：在 store 目录下，但是目前 vuex4.x 的 modules 形式对 ts 支持十分有限，vuex5.x 会对 vuex 进行重写，那将会更好地支持 ts



## 2、vue3 的使用



### 2-1、setup

setup 是 Vue3.x 新增的一个选项， 他是组件内使用 `Composition API`的入口



#### 2-1-1、setup 的执行时机

根据官网介绍： `setup` 组件选项在创建组件**之前**执行，一旦 `props` 被解析，就作为组合式 API 的入口点。

实践一下就知道了：

```js
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  beforeCreate() {
    console.log('beforeCreate')
  },
  created() {
    console.log('created')
  },
  setup() {
    console.log('setup')
  },
});
</script>
```

可以发现，控制台输出的是：

![](/imgs/img4.png)

也就是说，setup 的执行时机是在 beforeCreate 和 created 之前

> 注意：vue3 使用 setup 替代 beforeCreate 和 created，但是还可以使用 beforeCreate 和 created 是因为 vue3 对 vue2 的一些 api 进行了兼容



#### 2-1-2、setup 的参数

由于由于在执行 `setup` 时，组件实例尚未被创建，因此在 `setup` 选项中没有 `this`。那么想要像 vue2 那样使用 `this.$emit` 怎么办呢？setup 提供了两个参数：

- props: 组件传入的属性
- context：上下文，里面有三个属性
  - attrs
  - slot
  - emit

```js
export default defineComponent ({
    setup(props, { emit }) {
        console.log(props.xxx)

        emit('xxxx')
    }
})
```



这里需要注意的是：setup 中接受的`props`是响应式的， 当传入新的 props 时，会及时被更新。由于是响应式的， 所以**不可以使用 ES6 解构**，解构会消除它的响应式。

```js
export default defineComponent ({
    setup(props) {
        const { xxx } = props
        console.log(xxx)
    }
})
```

解决方法是使用响应式 api `toRefs`，这个下面再说。



### 2-2、常用响应式 api



#### 2-2-1、reactive

接收一个普通**对象**，返回一个**响应式对象**，类似 vue2.x 的 `Vue.observable()`

基本使用：

```js
<template>
  <div class="mine">
    <div>
      <h3>reactive api</h3>
      <p>名字: {{ userInfo.name }}</p>
      <p>年龄: {{ userInfo.age }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  setup() {
    const userInfo = reactive({
      name: 'jack',
      age: 18
    })
    
    setTimeout(() => {
      userInfo.age = 20
    }, 1000)

    return {
      userInfo
    }
  },
});
</script>
```

两秒后，age 的值变成了 20，说明确实转换成了响应式的 api



reactive 是将**对象**转换为响应式，非对象形式是会报错的：

![](/imgs/img5.png)

原因是：

![](/imgs/img6.png)

可以发现，在源码中，reactive 只接受 object array map set weakmap weakset 这六种类型的参数，并且会判断是否被冻结



#### 2-2-2、ref

接受一个参数值并返回一个响应式且可改变的 ref 对象。ref 对象拥有一个指向内部值的单一属性 `.value`

- 第一句的意思就是很明显，就是接受一个参数并转换为响应式返回
- 第二句话的意思是：访问这个返回的响应式需要通过 `.value` 的方式

使用：

```js
<template>
  <div class="mine">
    <div>
      <p>{{ msg }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const msg = ref('消息消息')

    setTimeout(() => {
      msg.value = 'hello'
    }, 1000)

    return {
      msg
    }
  }
})
</script>
```

- `setup` 中`return` 返回会自动解套【在模板中不需要`.value`】，但是在 js 中需要使用 `.value`



但是，ref 并不止是将 js 的基础类型转换为响应式，也可以将复杂类型转换为响应式，内部会进行判断，如果传入的的复杂类型，那么将使用 reactive 转换为响应式

![](/imgs/img8.png)

```js
<template>
  <div class="mine">
    <div>
      <p>{{ obj.name }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const obj = ref({
      name: 'jack'
    })

    setTimeout(() => {
      obj.value.name = 'mark'
    }, 1000)

    return {
      obj
    }
  }
})
</script>
```

可以看到，复杂类型使用 ref 在 js 中访问一样需要通过 `.value` 方式，`setup` 中`return` 返回会自动解套



注意：ref 作为 reactive 对象的 property 被访问或修改时，也将自动解套 `.value`

```js
const count = ref(0)
// 当做reactive的对象属性----解套
const state = reactive({
  count
})
// 不需要.value
console.log(state.count) // 0

// 修改reactive的值
state.count = 1
// ref 的 count 会跟着变
console.log(count.value) // 1
```



#### 2-2-3、toRefs

在上面 reactive 的事例代码中，是通过 `userInfo.age` 去访问修改 userInfo 的 age 属性的，那么可不可以将 userInfo 中的属性结构出来使用呢？答案是不可以，这样子会消除响应性

```js
<template>
  <div class="mine">
    <div>
      <h3>reactive api</h3>
      <p>名字: {{ userInfo.name }}</p>
      <p>年龄: {{ userInfo.age }}</p>
      <p>解构年龄: {{ age }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  setup(props) {
    // console.log('setup')

    const userInfo = reactive({
      name: 'jack',
      age: 18
    })

    let { age } = userInfo

    setTimeout(() => {
      age = 20
    }, 1000)

    return {
      userInfo,
      age
    }
  },
})
</script>
```

结果是：

![](/imgs/img7.png)

可以发现，无论是 userInfo.age 还是 age 最终都还是 18，没有变为 20。

其实很好解释，vue3 是使用 proxy 进行代理的，只有对目标对象进行操作才会被代理劫持。

```js
<script>
      const obj = { name: 'jack' }
      const proxy = new Proxy(obj, {
        get(target, prop) {
          return target[prop]
        },
        set(target, prop, val) {
          target[prop] = val
        }
      })
      obj.name = 'mark'
      console.log(proxy.name) // mark
      console.log(obj.name) // mark

      let { name } = obj
      name = 'louse'
      console.log(name) // louse
      console.log(proxy.name) // mark
      console.log(obj.name) // mark
</script>
```



但是就是使用解构后的数据怎么办，解决办法就是**使用`toRefs`**。 

toRefs 用于将一个 reactive 对象转化为属性全部为 ref 对象的普通对象。具体使用方式如下：

```sj
<template>
  <div class="mine">
    <div>
      <h3>--------------toRefs---------------</h3>
      <p>{{ name }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'

export default defineComponent({
  setup() {
    const obj = reactive({
      name: 'jack'
    })

    let { name } = toRefs(obj)

    setTimeout(() => {
      // 使用了 toRefs 需要通过 .value 的方式访问
      name.value = 'mark'
    }, 1000)

    return {
      name
    }
  }
})
</script>
```

这里需要注意的是，js 中使用了 toRefs，那么就需要通过 `.value` 的方式访问



如果仅仅只是想在 template 模板中结构使用，可以：

```js
<template>
  <div class="mine">
    <div>
      <h3>--------------toRefs---------------</h3>
      <p>{{ name }}</p>
      <p>{{ age }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'

export default defineComponent({
  setup() {
    const obj = reactive({
      name: 'jack',
      age: 20
    })

    return {
      ...toRefs(obj)
    }
  }
})
</script>
```

 在 return 中 `...toRefs(obj)`



#### 2-2-4 toRef

上面的 toRefs 是将 reactive 对象的**所有**属性，而 toRef 是**某一个**属性

```js
<template>
  <div class="mine">
    <div>
      <p>{{ msgRef }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRef, toRefs } from 'vue'

export default defineComponent({
  setup() {
    const info = reactive({ msg: 'hello' })
    const msgRef = toRef(info, 'msg')
    setTimeout(() => {
      msgRef.value = 'say hi'
    }, 1000)

    return {
      msgRef
    }
  }
})
</script>
```



#### 2-2-5、readonly

传入一个对象（响应式或普通）或 ref，返回一个原始对象的**只读**代理。只读的代理是“深层的”，对象内部任何嵌套的属性也都是只读的【返回一个永远不会变的只读代理】

```js
const obj = reactive({ name: 'jack' })
const copy = readonly(obj)

copy.name = ''
```

如果想通过 `copy.name = ''` 赋值，会直接报错

![](/imgs/img9.png)



#### 2-2-6、isProxy、isReactive、isReadonly

isProxy： 检查对象是否是由 `reactive` 或 `readonly` 创建的 proxy

isReactive：检查对象是否是由 `reactive` 创建的响应式代理

isReadonly：检查对象是否是由 `readonly` 创建的只读代理

```js
const obj = reactive({
  name: 'jack',
  age: 20
})
const readonlyObj = readonly(obj)

console.log(isProxy(obj)) // true
console.log(isProxy(readonlyObj)) // true
console.log(isReadonly(readonlyObj)) // true
console.log(isReactive(obj)) // true
console.log(isReadonly(obj)) // false
```



#### 2-2-7、isRef

isRef：检查一个值是否为一个 ref 对象

```js
const msg = ref('hello')
const str = 'nihao'

console.log(isRef(msg)) // true
console.log(isRef(str)) // false
```



### 2-3、vue3 的生命周期

#### 2-3-1、生命周期钩子变化

vue3 的生命周期钩子：

![](/imgs/img10.png)

可以发现，会有一些明显的变化：

![](/imgs/img11.png)





#### 2-3-2、vue3 生命周期钩子使用

```js
setup() {
  onBeforeMount(() => {
    console.log('beforeMount')
  })
  onMounted(() => {
    console.log('mount')
  })
}
```

其他的生命周期钩子使用方式一致



### 2-4、computed

vue3 中的 computed：

- 传入一个 getter 函数，返回一个**默认不可手动修改的 ref 对象**
- 传入一个拥有 `get` 和 `set` 函数的对象，创建一个**可手动修改的计算状态**

也就是说，如果 computed 接收的是一个 getter 函数，那么返回的是 ref 对象，并且这个对象不可修改；如果 computed 接收的是一个对象，那么创建的是一个可手动修改的计算状态。



**getter 函数：**

```js
<template>
  <div>
    <p>【getter函数】全名：{{ getFullName }}</p>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive } from 'vue'

export default defineComponent({
  setup() {
    const people = reactive({
      first: '张',
      last: '三'
    })

    // ---------------- getter 函数
    const getFullName = computed(() => people.first + people.last)
    // getFullName.last = '' // getter 函数形式不能修改
    
    return {
      getFullName
    }
  }
})
</script>
```



**get、set 函数对象**

```js
<template>
  <div>
    <p>【对象】全名：{{ getFullName }}</p>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive } from 'vue'

export default defineComponent({
  setup() {
    const people = reactive({
      first: '张',
      last: '三'
    })

    // get、set 函数对象
    const getName = computed({
      get() {
        return people.first + people.last
      },
      set(val: string) {
        people.last = val
      }
    })

    setTimeout(() => {
      getName.value = '五'
    }, 1000)
    
    return {
      getName
    }
  }
})
</script>

```



### 2-5、watch 与 watchEffect



#### 2-5-1、watchEffect

立即执行传入的函数，并响应式追踪其依赖，并在**其依赖变更时重新运行该函数**

```js
const msg = ref('hello')

watchEffect(() => {
  console.log(msg.value)
})

setTimeout(() => {
  msg.value = 'hi'
}, 1000)
```

可以发现，控制台一开始会输出 'hello'，隔一秒之后输出 'hi'

![](/imgs/img12.png)



##### watchEffect 特点

- 不需要手动传入依赖

- 每次初始化时会执行一次回调函数来自动获取依赖

- 无法获取到原值，只能得到变化后的值



##### 停止监听

当在组件的 setup() 函数或生命周期钩子期间调用 watchEffect 时，监视程序会链接到组件的生命周期，并在卸载组件时自动停止

也可以显式调用返回值以停止侦听

```js
const stop = watchEffect(() => {
  /* ... */
})

stop()
```



#### 2-5-2、watch

`watch` 需要侦听特定的数据源，并在回调函数中执行副作用。默认情况下，它是惰性的，只有当被侦听的源发生变化时才执行回调。

watch(source, callback, [options])

- source：可以支持 string,Object,Function,Array; 用于指定要侦听的响应式变量
- callback：侦听的源发生变化时执行的回调函数
- options：支持 deep、immediate 和 flush 选项



##### 侦听单个数据源

可以直接侦测 ref、reactive 对象（仅仅是浅层侦听，需要深层侦听，需要开启 deep）

```js
// 侦测 ref
const msg = ref('信息')
watch(msg, (msg, prevMsg) => {
  console.log(prevMsg)
  console.log(msg)
})
setTimeout(() => {
  msg.value = '短信'
}, 1000)

// 侦测 reactive 对象
const info = reactive({ name: 'jack' })
watch(info, (info, prevInfo) => {
  console.log(prevInfo.name)
  console.log(info.name)
})
setTimeout(() => {
  info.name = 'mark'
}, 1000)
```



可以侦听返回值 getter 函数，进行 reactive 的某个属性侦听

```js
const info = reactive({ name: 'jack' })
watch(() => info.name, (name, prevName) => {
  console.log(prevName)
  console.log(name)
})
setTimeout(() => {
  info.name = 'mark'
}, 1000)
```



##### 侦听多个数据源

```js
const msg = ref('msg-msg')
const str = ref('str-str')

watch([msg, str], ([msg, str], [prevMsg, prevStr]) => {
  console.log('多个数据源')
        
  console.log(prevMsg, msg)
  console.log(prevStr, str)
})

setTimeout(() => {
  msg.value = 'message'
  str.value = 'string'
}, 1000)
```



##### deep、immediate 和 flush 选项

deep 选项：对于嵌套对象需要开启深度监听

```js
const state = reactive({
  code: 200,
  data: {
    name: 'jack'
  }
})

watch(() => state.data, (age, prevAge) => {
  console.log(prevAge, age)
}, { deep: true })

setTimeout(() => {
  state.data.name = 'mark'
}, 1000)
```

如果不开启 deep: true，直接监听 state.data，修改的是 state.data.name，是不会触发回调函数的



immediate： 启动的时候立即执行一次



#### 2-5-3、watch 与 watchEffect 的区别

- watch 是需要传入侦听的数据源，而 watchEffect 是自动收集数据源作为依赖。

- watch 可以访问侦听状态变化前后的值，而 watchEffect 只能访问变化后的值。

- watch 是属性改变的时候执行，而 watchEffect 是默认会执行一次，然后属性改变也会执行。



### 2-6、Teleport 

Teleport：传送组件，类似 react 的 Portals，可以将节点渲染到 `#app` 以外的 Dom。

使用场景：像 `Dialog `,`toast` 等这样的元素，很多情况下，需要将它与 `Vue` 应用的 `DOM` （也就是 `#app` 节点之外）完全剥离，但是又要使用到 `Vue` 组件的状态（`data` 或者 `props`）的值，在 react 中，提供了 Portals；但是在 vue2.x 中要想实现，需要通过第三方库 [portal-vue](https://github.com/LinusBorg/portal-vue) ；而 vue3 中，提供了 Teleport 来解决，可以用`<Teleport>`包裹`Dialog`, 此时就建立了一个传送门，可以将`Dialog`渲染的内容传送到任何指定的地方



**使用：**

首先，在 index.html 中，创建一个与 `id="app"` 同级的兄弟节点

index.html

```js
<body>
  <div id="app"></div>
  <div id="dialog"></div>
</body>
```

然后定义一个 dialog 组件：

```js
<template>
  <teleport to="#dialog">
    <div class="dialog">
      
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({

})
</script>

<style lang="scss" scoped>
.dialog {
  width: 500px;
  height: 400px;
  background-color: pink;
}
</style>
```

使用 dialog 组件：

```js
<template>
  <div class="teleport-con">
    <button @click="handleDialog">dialog按钮</button>
    <dialogCom v-if="dialogShow" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import dialogCom from './dialogCom.vue'

export default defineComponent({
  components: {
    dialogCom
  },
  setup() {
    const dialogShow = ref<boolean>(false)
    const handleDialog = () => {
      dialogShow.value = !dialogShow.value
    }

    return {
      dialogShow,
      handleDialog
    }
  }
})
</script>
```



`<Teleport>` 组件包裹需要移动的组件，上面的 to 属性就是要移动到的节点，to：必须是有效的查询选择器或 HTMLElement (如果在浏览器环境中使用)

```js
<!-- 正确 -->
<teleport to="#some-id" />
<teleport to=".some-class" />
<teleport to="[data-teleport]" />

<!-- 错误 -->
<teleport to="h1" />
<teleport to="some-string" />
```



### 2-7、Fragment

在 vue2.x 中，每个组件只能有一个根节点：

```js
<template>
  <div>
    <p></p>
    <p></p>
  </div>
</template>
```

但是在 vue3 中，可以有多个根节点：

```js
<template>
  <div></div>
  <div></div>
</template>
```

