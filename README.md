# vite-vue3-ts-starter

⭐一款基于Vite + Vue3 + TypeScript + Pinia + Element Plus + Sass + Axios的快速开发模版

## 项目启动

```bash
npm install // 安装依赖
npm dev // 开发
npm build // 打包
npm preview // 预览
```

## 功能集成

- [√ 配置 ip 访问项目](#ip)
- [√ 配置多环境变量](#env)
- [√ 配置 alias 别名](#alias)
- [√ Sass 全局样式](#sass)
- [√ 识别 nodejs 内置模块](#node)
- [√ Vue-router自动生成路由](#router)
- [√ Pinia 状态管理](#pinia)
- [√Axios 封装及接口管理](#axios)
- [√ 配置 proxy 跨域](#proxy)
- [√ Element Plus 自动按需引入](#element)
- [√Markdown预览](markdown)
- [√ Eslint + Prettier 统一开发规范](#prettier)

## <span id="ip">✅ 配置 ip 访问项目 </span>

- vite 启动后出现 “ Network: use --host to expose ”

```js
vite v2.3.7 dev server running at:

  > Local: http://localhost:3000/
  > Network: use `--host` to expose
```

- 是因为 IP 没有做配置，所以不能从 IP 启动，需要在 vite.config.js 做相应配置：
  在 vite.config.js 中添加 server.host 为 0.0.0.0

```typescript
export default defineConfig({
  plugins: [vue()],
  // 在文件中添加以下内容
  server: {
    host: '0.0.0.0'
  }
})
```

- 重新启动后显示

```js
vite v2.3.7 dev server running at:

  > Local:    http://localhost:3000/
  > Network:  http://192.168.199.127:3000/
```

## <span id="env">✅ 配置多环境变量 </span>

- 文档：https://cn.vitejs.dev/guide/env-and-mode.html

* 在生产环境，会把 import.meta.env 的值转换成对应真正的值

1. 添加环境变量文件，每个文件写入配置，**定义 env 环境变量前面必须加 VITE\_**

- `.env.development`

```js
# must start with VITE_
VITE_ENV = 'development'
VITE_OUTPUT_DIR = 'dev'
```

- `.env.production`

```js
# must start with VITE_
VITE_ENV = 'production'
VITE_OUTPUT_DIR = 'dist'
```

- `.env.test`

```js
# must start with VITE_
VITE_ENV = 'test'
VITE_OUTPUT_DIR = 'test'
```

2. 修改 scripts 命令

- `--mode` 用来识别我们的环境

```js
"dev": "vite --mode development",
"test": "vite --mode test",
"prod": "vite --mode production",
```

3. 在项目中访问

```js
console.log(import.meta.env)
```

4. typescript 智能提示

- 修改 `src/env.d.ts` 文件，如果没有创建一个

```js
/// <reference types="vite/client" />

interface ImportMetaEnv extends Readonly<Record<string, string>> {
  readonly VITE_ENV: string; // 环境
  readonly VITE_OUTPUT_DIR: string; // 打包目录
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
```

## <span id="alias">✅ 配置 alias 别名 </span>

- 文档：https://cn.vitejs.dev/config/#resolve-alias
- 修改 vite.config.ts 配置

```js
  resolve: {
    alias: {
      "@": "/src",
    },
  },
```

## <span id="sass">✅ Sass 全局样式 </span>

- 文档：https://cn.vitejs.dev/guide/features.html#css-pre-processors

1. 安装依赖
   使用`dart-sass`, 安装速度比较快，大概率不会出现安装不成功

```js
pnpm i -D sass
```

2. 使用
   每个页面自己对应的样式都写在自己的 .vue 文件之中 `scoped` 它顾名思义给 css 加了一个域的概念。

```html
<style lang="scss">
  /* global styles */
</style>

<style lang="scss" scoped>
  /* local styles */
</style>
```

### vite 识别 sass 全局变量

- 文档：https://cn.vitejs.dev/config/#css-preprocessoroptions

* vite.config.js 添加配置

```js
css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "@/styles/mixin.scss";
          @import "@/styles/variables.scss";
          `,
      },
    },
  },
```

## <span id="node">✅ 识别 nodejs 内置模块 </span>

- path 模块是 node.js 内置的功能，但是 node.js 本身并不支持 typescript，所以直接在 typescript 项目里使用是不行的
- 解决方法：安装@types/node

```js
pnpn i -D @types/node
```

- 在 vite.config.js 中使用

```js
import { resolve } from 'path'
```

## <span id="router">✅ Vue-router自动生成路由</span>

- 文档：https://next.router.vuejs.org/zh/installation.html

### 1. 安装依赖

```ts
pnpm install vue-router
pnpm install vite-plugin-pages -D
```

### 2. 配置自动生成路由

- 在 src 目录下，新建 router 文件夹，并在文件夹内创建
  - index.ts 配置自动生成路由

```ts
import { createRouter, createWebHistory } from 'vue-router';
import routes from 'pages-generated';

const router = createRouter({
  history: createWebHistory(), // HashHistory
  routes,
});

export default router;
```

+ vite.config.js 添加配置，自动根据src/views下的文件生成路由

```ts
export default defineConfig({
  plugins: [
    Pages({
      pagesDir: [
        {
          dir: 'src/views',
          baseRoute: '',
        },
      ],
      exclude: ['**/components/*.vue'],
    }),
  ]
});
```

### 3. mian 中引入 router

```ts
import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
// 引入全局样式
import '@/styles/index.scss'

const app = createApp(App)
app.use(router)
app.mount('#app')
```

### 4. app.vue 和 layout 配置 router-view

```ts
// app.vue
<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
console.log('查看全局环境',import.meta.env);
</script>

<template>
  <router-view />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
```

## <span id="pinia">✅ Pinia 状态管理 </span>

- 文档：https://pinia.vuejs.org/
- 参考资料：https://juejin.cn/post/7049196967770980389
- Pinia 的特点：
  - 完整的 typescript 的支持；
  - 足够轻量，压缩后的体积只有 1.6kb;
  - 去除 mutations，只有 state，getters，actions（这是我最喜欢的一个特点）；
  - actions 支持同步和异步；
  - 没有模块嵌套，只有 store 的概念，store 之间可以自由使用，更好的代码分割；
  - 无需手动添加 store，store 一旦创建便会自动添加；

### 安装依赖

```js
pnpm i pinia
```

### 创建 Store

- 新建 src/store 目录并在其下面创建 index.ts，导出 store

```js
// src/store/index.ts

import { createPinia } from 'pinia'

const store = createPinia()

export default store
```

### 在 main.ts 中引入并使用

```ts
// src/main.ts

import { createApp } from 'vue'
import App from './App.vue'
import store from './store'

const app = createApp(App)
app.use(store)
```

### 定义 State

- 在 src/store 下面创建一个 user.ts

```ts
//src/store/user.ts

import { defineStore } from 'pinia'
import { useAppStore } from './app'

export const useUserStore = defineStore({
  id: 'user',
  state: () => {
    return {
      name: '张三',
      age: 18
    }
  },
  getters: {
    fullName: (state) => {
      return state.name + '丰'
    }
  },
  actions: {
    updateState(data: any) {
      this.$state = data
      this.updateAppConfig()
    },
    updateAppConfig() {
      const appStore = useAppStore()
      appStore.setData('app-update')
    }
  }
})
```

```ts
//src/store/app.ts
import { defineStore } from 'pinia'

export const useAppStore = defineStore({
  id: 'app',
  state: () => {
    return {
      config: 'app'
    }
  },
  actions: {
    setData(data: any) {
      console.log(data)
      this.config = data
    }
  }
})
```

### 获取/更新 State

```vue
<script setup lang="ts">
import { useUserStore } from '@/store/user'
import { useAppStore } from '@/store/app'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
const userStore = useUserStore()
const appStore = useAppStore()
console.log(appStore.config)
console.log(userStore)
console.log(userStore.name)
const name = computed(() => userStore.name)
const { age } = storeToRefs(userStore)

const updateUserState = () => {
  const { name, age } = userStore.$state
  userStore.updateState({
    name: name + 1,
    age: age + 1
  })
}
</script>
<template>
  <div>姓名：{{ name }}</div>
  <div>年龄：{{ age }}</div>
  <div>计算的名字：{{ userStore.fullName }}</div>
  <div>app的config: {{ appStore.config }}</div>
  <button @click="updateUserState">更新数据</button>
</template>

<style lang="scss" scoped></style>
```

### 数据持久化

- 文档：https://github.com/prazdevs/pinia-plugin-persistedstate

* 插件 pinia-plugin-persistedstate 可以辅助实现数据持久化功能。
* 数据默认存在 sessionStorage 里，并且会以 store 的 id 作为 key。

* 安装依赖

```ts
pnpm i pinia-plugin-persistedstate
```

- 引用插件

```ts
// src/store/index.ts

import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const store = createPinia()
store.use(piniaPluginPersistedstate)
export default store
```

- 在对应的 store 里开启 persist 即可

```ts
export const useUserStore = defineStore({
  id: 'user',

  state: () => {
    return {
      name: '张三'
    }
  },

  // 开启数据缓存
  persist: {
    key: 'user',
    storage: sessionStorage, // 数据存储位置，默认为 localStorage
    paths: ['name'], // 用于部分持久化状态的点表示法路径数组，表示不会持久化任何状态（默认为并保留整个状态）
    overwrite: true
  }
})
```

## <span id="axios">✅ Axios 封装及接口管理 </span>

### 安装依赖

```js
pnpm i axios
```

### 封装Axios

在src/service/下创建request.ts文件来封装axios

```typescript
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

class HttpRequest {
  getInsideConfig() {
    const config = {
      baseURL: import.meta.env.VITE_API_BASE_URL, // 所有的请求地址前缀部分(没有后端请求不用写)
      timeout: 80000, // 请求超时时间(毫秒)
      withCredentials: true, // 异步请求携带cookie
      // headers: {
      // 设置后端需要的传参类型
      // 'Content-Type': 'application/json',
      // 'token': x-auth-token',//一开始就要token
      // 'X-Requested-With': 'XMLHttpRequest',
      // },
    };
    return config;
  }

  // 请求拦截
  interceptors(instance: AxiosInstance, url: string | number | undefined) {
    instance.interceptors.request.use(
      (config) => {
        // 添加全局的loading..
        // 请求头携带token
        return config;
      },
      (error: any) => {
        return Promise.reject(error);
      }
    );
    //响应拦截
    instance.interceptors.response.use(
      (res) => {
        //返回数据
        const { data } = res;
        console.log('返回数据处理', res);
        return data;
      },
      (error: any) => {
        console.log('error==>', error);
        return Promise.reject(error);
      }
    );
  }

  request(options: AxiosRequestConfig) {
    const instance = axios.create();
    options = Object.assign(this.getInsideConfig(), options);
    this.interceptors(instance, options.url);
    return instance(options);
  }
}

const http = new HttpRequest();
export default http;
```

### 接口管理

在src/apis/下创建user.ts文件用来管理用户相关的接口

```typescript
import http from '../service/request';

const PREFIX = 'user';

export const getTest = (params: any) => {
  return http.request({
    url: `${PREFIX}/test`,
    method: 'post',
    params,
  });
};
```

## <span id="proxy">✅ 配置 proxy 跨域</span>

在vite.config.ts进行如下配置

```typescript
export default defineConfig({
  plugins: [vue()],
  // 在文件中添加以下内容
  server: {
     proxy: {
      '/api': {
        target: 'http://xxxxxxxxxxxxxxx',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  }
})
```

## <span id="element">✅ Element Plus 自动按需引入 </span>

### 安装依赖

```bash
pnpm i element-plus
pnpm i -D @iconify-json/ep unplugin-auto-import unplugin-icons unplugin-vue-components
```

在vite.config.ts进行如下配置

```typescript
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
export default defineConfig({
  plugins: [
    AutoImport({
      resolvers: [
        ElementPlusResolver(),
        // 自动导入图标组件
        IconsResolver({
          prefix: 'Icon',
        }),
      ],
      dts: path.resolve(__dirname, 'types/auto-imports.d.ts'),
    }),
    Components({
      resolvers: [
        ElementPlusResolver(),
        // 自动注册图标组件
        IconsResolver({
          enabledCollections: ['ep'],
        }),
      ],
      dts: path.resolve(__dirname, 'types/components.d.ts'),
    }),
    Icons({
      autoInstall: true,
    }),
  ],
})
```

## <span id="markdown">✅ Markdown预览 </span>

### 安装依赖

```bash
pnpm i highlight.js
pnpm i -D vite-plugin-md
```

在vite.config.ts进行如下配置

```typescript
import Markdown from 'vite-plugin-md';
import hljs from 'highlight.js';
export default defineConfig({
  plugins: [
		Markdown({
      markdownItOptions: {
        html: true,
        linkify: true,
        typographer: true,
        highlight: function (str, lang) {
          if (lang && hljs.getLanguage(lang)) {
            try {
              return (
                '<pre class="hljs"><code>' +
                hljs.highlight(str, { language: lang, ignoreIllegals: true })
                  .value +
                '</code></pre>'
              );
            } catch (__) {}
          }
          return '';
        },
      },
    }),
  ],
})
```

在vue组件中使用

```vue
<script setup lang="ts">
import MarkDown from './index.md';
</script>

<template>
  <MarkDown />
</template>

<style lang="scss" scoped>
</style>
```

## <span id="prettier">✅ Eslint + Prettier 统一开发规范 </span>

### 1. 安装依赖

```js
pnpm i -D eslint eslint-plugin-vue prettier @vue/eslint-config-prettier @vue/eslint-config-typescript @rushstack/eslint-patch
```

### 2. 编写相关文件

- .eslintrc.js

```js
/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript/recommended',
    '@vue/eslint-config-prettier'
  ],
  env: {
    'vue/setup-compiler-macros': true
  },
  parserOptions: {
    ecmaVersion: 12
  },
  rules: {
    'prettier/prettier': 'warn',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': 'off'
  }
}
```

- .prettierc.js

```js
module.exports = {
  // 定制格式化要求
  overrides: [
    {
      files: '.prettierrc',
      options: {
        parser: 'json'
      }
    }
  ],
  printWidth: 100, // 一行最多 100 字符
  tabWidth: 2, // 使用 4 个空格缩进
  semi: false, // 行尾需要有分号
  singleQuote: true, // 使用单引号而不是双引号
  useTabs: false, // 用制表符而不是空格缩进行
  quoteProps: 'as-needed', // 仅在需要时在对象属性两边添加引号
  jsxSingleQuote: false, // 在 JSX 中使用单引号而不是双引号
  trailingComma: 'none', // 末尾不需要逗号
  bracketSpacing: true, // 大括号内的首尾需要空格
  bracketSameLine: false, // 将多行 HTML（HTML、JSX、Vue、Angular）元素反尖括号需要换行
  arrowParens: 'always', // 箭头函数，只有一个参数的时候，也需要括号 avoid
  rangeStart: 0, // 每个文件格式化的范围是开头-结束
  rangeEnd: Infinity, // 每个文件格式化的范围是文件的全部内容
  requirePragma: false, // 不需要写文件开头的 @prettier
  insertPragma: false, // 不需要自动在文件开头插入 @prettier
  proseWrap: 'preserve', // 使用默认的折行标准 always
  htmlWhitespaceSensitivity: 'css', // 根据显示样式决定 html 要不要折行
  vueIndentScriptAndStyle: false, //（默认值）对于 .vue 文件，不缩进 <script> 和 <style> 里的内容
  endOfLine: 'lf', // 换行符使用 lf 在Linux和macOS以及git存储库内部通用\n
  embeddedLanguageFormatting: 'auto' //（默认值）允许自动格式化内嵌的代码块
}
```

- .vscode/settings.json

```js
{
    "editor.formatOnSave": false, // 每次保存的时候自动格式化
    "editor.formatOnPaste": true, // 自动格式化粘贴内容
    "editor.tabCompletion": "on", // tab 自动补全
    "editor.codeActionsOnSave": { // 保存时使用 ESLint 修复可修复错误
        "source.fixAll": true,
        "source.fixAll.eslint": true, // 保存时使用 ESLint 修复可修复错误
        // "source.fixAll.stylelint": true
    },
    // 文件设置
    "files.eol": "\n", // 默认行尾字符。 git全局配置 git config --global core.autocrlf false
    // eslint 设置
    "eslint.alwaysShowStatus": true, // 总是在 VSCode 显示 ESLint 的状态
    "eslint.probe": [ // eslint 校验的语言类型 - 新版
        "javascript",
        "javascriptreact",
        "typescript",
        "typescriptreact",
        "html",
        "vue",
        "markdown",
        "tsx"
    ],
}
```

