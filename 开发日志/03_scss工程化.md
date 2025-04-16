# SCSS 工程化方案

基于你的项目和已有的 uni.scss 文件，以下是一个完整的 SCSS 工程化方案：

## 目录结构

```
src/
├── styles/
│   ├── abstracts/
│   │   ├── _variables.scss    // 所有变量定义
│   │   ├── _functions.scss    // 自定义函数
│   │   ├── _mixins.scss       // 混合宏
│   │   └── _index.scss        // 统一导出
│   ├── base/
│   │   ├── _reset.scss        // 重置样式
│   │   ├── _typography.scss   // 文字排版
│   │   ├── _animations.scss   // 动画效果
│   │   └── _index.scss        // 统一导出
│   ├── components/
│   │   ├── _buttons.scss      // 按钮样式
│   │   ├── _cards.scss        // 卡片样式
│   │   ├── _forms.scss        // 表单样式
│   │   └── _index.scss        // 统一导出
│   ├── layout/
│   │   ├── _grid.scss         // 网格系统
│   │   ├── _header.scss       // 头部样式
│   │   ├── _footer.scss       // 底部样式
│   │   └── _index.scss        // 统一导出
│   ├── pages/
│   │   ├── _home.scss         // 首页特有样式
│   │   ├── _profile.scss      // 个人中心样式
│   │   └── _index.scss        // 统一导出
│   ├── themes/
│   │   ├── _default.scss      // 默认主题
│   │   ├── _dark.scss         // 暗色主题
│   │   └── _index.scss        // 统一导出
│   ├── uni-overrides/
│   │   ├── _uni-components.scss // 覆盖uni-app组件样式
│   │   └── _index.scss        // 统一导出
│   ├── main.scss              // 主样式文件，导入所有模块
│   └── uni.scss               // 兼容uni-app的变量文件
```

## 核心文件内容

### 1. src/styles/abstracts/\_variables.scss

```scss
// 基础色彩系统
$colors: (
  "primary": (
    "base": #00a884,
    "light": lighten(#00a884, 10%),
    "dark": darken(#00a884, 10%),
  ),
  "secondary": #f5f5f5,
  "success": #4cd964,
  "warning": #ff9500,
  "error": #ff3b30,
  "info": #5ac8fa,
);

// 文本颜色
$text-colors: (
  "primary": #333,
  "secondary": #666,
  "light": #999,
  "white": #fff,
);

// 边框颜色
$border-colors: (
  "light": #eee,
  "base": #ddd,
  "dark": #ccc,
);

// 背景颜色
$bg-colors: (
  "white": #fff,
  "light": #f8f8f8,
  "hover": #f1f1f1,
  "mask": rgba(0, 0, 0, 0.4),
);

// 字体大小
$font-sizes: (
  "xs": 10px,
  "sm": 12px,
  "base": 14px,
  "lg": 16px,
  "xl": 18px,
  "xxl": 20px,
  "title": 24px,
);

// 间距系统
$spacings: (
  "xs": 2px,
  "sm": 5px,
  "base": 10px,
  "lg": 15px,
  "xl": 20px,
  "xxl": 30px,
);

// 圆角
$radii: (
  "sm": 2px,
  "base": 4px,
  "lg": 8px,
  "xl": 16px,
  "circle": 50%,
);

// z-index层级管理
$z-indexes: (
  "dropdown": 10,
  "sticky": 20,
  "fixed": 30,
  "modal": 40,
  "popover": 50,
  "toast": 60,
);

// 转为CSS变量，便于动态主题
:root {
  // 颜色变量
  @each $name, $value in $colors {
    @if type-of($value) == "map" {
      --color-#{$name}: #{map-get($value, "base")};
      --color-#{$name}-light: #{map-get($value, "light")};
      --color-#{$name}-dark: #{map-get($value, "dark")};
    } @else {
      --color-#{$name}: #{$value};
    }
  }

  // 文本颜色
  @each $name, $value in $text-colors {
    --text-#{$name}: #{$value};
  }

  // 背景颜色
  @each $name, $value in $bg-colors {
    --bg-#{$name}: #{$value};
  }

  // 边框颜色
  @each $name, $value in $border-colors {
    --border-#{$name}: #{$value};
  }

  // 字体大小
  @each $name, $value in $font-sizes {
    --font-#{$name}: #{$value};
  }

  // 间距
  @each $name, $value in $spacings {
    --space-#{$name}: #{$value};
  }

  // 圆角
  @each $name, $value in $radii {
    --radius-#{$name}: #{$value};
  }
}
```

### 2. src/styles/abstracts/\_mixins.scss

```scss
// 弹性布局简写
@mixin flex(
  $direction: row,
  $justify: flex-start,
  $align: stretch,
  $wrap: nowrap
) {
  display: flex;
  flex-direction: $direction;
  justify-content: $justify;
  align-items: $align;
  flex-wrap: $wrap;
}

// 文字溢出省略
@mixin text-ellipsis($lines: 1) {
  @if $lines == 1 {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  } @else {
    display: -webkit-box;
    -webkit-line-clamp: $lines;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

// 滚动条样式
@mixin custom-scrollbar(
  $width: 6px,
  $track-color: var(--bg-light),
  $thumb-color: var(--color-primary)
) {
  &::-webkit-scrollbar {
    width: $width;
    height: $width;
  }

  &::-webkit-scrollbar-track {
    background: $track-color;
    border-radius: var(--radius-sm);
  }

  &::-webkit-scrollbar-thumb {
    background: $thumb-color;
    border-radius: var(--radius-sm);

    &:hover {
      background: var(--color-primary-dark);
    }
  }
}

// 响应式断点
@mixin respond-to($breakpoint) {
  @if $breakpoint == "small" {
    @media (max-width: 375px) {
      @content;
    }
  } @else if $breakpoint == "medium" {
    @media (max-width: 768px) {
      @content;
    }
  } @else if $breakpoint == "large" {
    @media (min-width: 769px) {
      @content;
    }
  }
}

// 阴影样式
@mixin shadow($level: "base") {
  @if $level == "sm" {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  } @else if $level == "base" {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  } @else if $level == "lg" {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  } @else if $level == "xl" {
    box-shadow: 0 16px 24px rgba(0, 0, 0, 0.2);
  }
}

// 渐变效果
@mixin gradient(
  $direction: "to right",
  $start-color: var(--color-primary),
  $end-color: var(--color-primary-light)
) {
  background: linear-gradient(#{$direction}, #{$start-color}, #{$end-color});
}
```

### 3. src/styles/base/\_reset.scss

```scss
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

page,
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-size: var(--font-base);
  color: var(--text-primary);
  background-color: var(--bg-light);
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

image,
img {
  max-width: 100%;
  height: auto;
}

button {
  border: none;
  background: none;
  font-family: inherit;
  cursor: pointer;

  &:focus {
    outline: none;
  }
}

input,
textarea {
  font-family: inherit;
  font-size: inherit;
  border: none;

  &:focus {
    outline: none;
  }
}

a {
  text-decoration: none;
  color: inherit;
}
```

### 4. src/styles/main.scss

```scss
/* 首先导入抽象层（变量、函数、混合等） */
@import "abstracts/index";

/* 导入基础样式 */
@import "base/index";

/* 导入布局样式 */
@import "layout/index";

/* 导入组件样式 */
@import "components/index";

/* 导入页面特有样式 */
@import "pages/index";

/* 导入uni-app样式覆盖 */
@import "uni-overrides/index";

/* 导入当前主题 */
@import "themes/default";
```

### 5. 实用的工具类文件 src/styles/base/\_utilities.scss

```scss
// 间距工具类
@each $name, $value in $spacings {
  .m-#{$name} {
    margin: $value;
  }
  .mx-#{$name} {
    margin-left: $value;
    margin-right: $value;
  }
  .my-#{$name} {
    margin-top: $value;
    margin-bottom: $value;
  }
  .mt-#{$name} {
    margin-top: $value;
  }
  .mr-#{$name} {
    margin-right: $value;
  }
  .mb-#{$name} {
    margin-bottom: $value;
  }
  .ml-#{$name} {
    margin-left: $value;
  }

  .p-#{$name} {
    padding: $value;
  }
  .px-#{$name} {
    padding-left: $value;
    padding-right: $value;
  }
  .py-#{$name} {
    padding-top: $value;
    padding-bottom: $value;
  }
  .pt-#{$name} {
    padding-top: $value;
  }
  .pr-#{$name} {
    padding-right: $value;
  }
  .pb-#{$name} {
    padding-bottom: $value;
  }
  .pl-#{$name} {
    padding-left: $value;
  }
}

// 文本工具类
@each $name, $value in $font-sizes {
  .text-#{$name} {
    font-size: $value;
  }
}

@each $name, $value in $text-colors {
  .text-#{$name} {
    color: $value;
  }
}

.text-center {
  text-align: center;
}
.text-left {
  text-align: left;
}
.text-right {
  text-align: right;
}
.text-bold {
  font-weight: bold;
}
.text-italic {
  font-style: italic;
}
.text-uppercase {
  text-transform: uppercase;
}
.text-capitalize {
  text-transform: capitalize;
}
.text-underline {
  text-decoration: underline;
}
.text-line-through {
  text-decoration: line-through;
}
.text-ellipsis {
  @include text-ellipsis();
}

// 弹性布局工具类
.flex {
  display: flex;
}
.flex-row {
  flex-direction: row;
}
.flex-column {
  flex-direction: column;
}
.flex-wrap {
  flex-wrap: wrap;
}
.flex-nowrap {
  flex-wrap: nowrap;
}
.flex-1 {
  flex: 1;
}
.flex-auto {
  flex: auto;
}
.flex-none {
  flex: none;
}
.justify-start {
  justify-content: flex-start;
}
.justify-end {
  justify-content: flex-end;
}
.justify-center {
  justify-content: center;
}
.justify-between {
  justify-content: space-between;
}
.justify-around {
  justify-content: space-around;
}
.justify-evenly {
  justify-content: space-evenly;
}
.items-start {
  align-items: flex-start;
}
.items-end {
  align-items: flex-end;
}
.items-center {
  align-items: center;
}
.items-baseline {
  align-items: baseline;
}
.items-stretch {
  align-items: stretch;
}

// 显示工具类
.hidden {
  display: none;
}
.block {
  display: block;
}
.inline {
  display: inline;
}
.inline-block {
  display: inline-block;
}
.visible {
  visibility: visible;
}
.invisible {
  visibility: hidden;
}
.opacity-0 {
  opacity: 0;
}
.opacity-50 {
  opacity: 0.5;
}
.opacity-75 {
  opacity: 0.75;
}
.opacity-100 {
  opacity: 1;
}

// 背景工具类
@each $name, $value in $bg-colors {
  .bg-#{$name} {
    background-color: $value;
  }
}
```

## 如何集成到项目中

### 1. 在 vite.config.ts 中配置全局样式

```typescript
import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";

export default defineConfig({
  plugins: [uni()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/abstracts/index.scss";`,
      },
    },
  },
});
```

### 2. 在 App.vue 中引入主样式文件

```vue
<style lang="scss">
@import "@/styles/main.scss";
</style>
```

### 3. 组件中使用混合和变量

```vue
<template>
  <view class="card">
    <view class="card__header">
      <text class="card__title">{{ title }}</text>
    </view>
    <view class="card__body">
      <slot></slot>
    </view>
  </view>
</template>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    default: "",
  },
});
</script>

<style lang="scss" scoped>
.card {
  @include shadow("base");
  background-color: var(--bg-white);
  border-radius: var(--radius-lg);
  overflow: hidden;
  margin-bottom: var(--space-lg);

  &__header {
    @include flex(row, space-between, center);
    padding: var(--space-base) var(--space-lg);
    border-bottom: 1px solid var(--border-light);
  }

  &__title {
    font-size: var(--font-lg);
    font-weight: bold;
    @include text-ellipsis();
  }

  &__body {
    padding: var(--space-lg);
  }
}
</style>
```

## 使用 CSS 变量实现主题切换

### src/styles/themes/\_dark.scss

```scss
:root[data-theme="dark"] {
  // 基础颜色
  --color-primary: #00c29a;
  --color-primary-light: #00d6a9;
  --color-primary-dark: #00a884;

  // 文本颜色
  --text-primary: #e0e0e0;
  --text-secondary: #b0b0b0;
  --text-light: #808080;

  // 背景颜色
  --bg-white: #121212;
  --bg-light: #1e1e1e;
  --bg-hover: #2a2a2a;

  // 边框颜色
  --border-light: #333;
  --border-base: #444;
  --border-dark: #555;
}
```

### 主题切换 JS

```typescript
// 在src/utils/theme.ts
export function toggleTheme(isDark = false) {
  document.documentElement.setAttribute(
    "data-theme",
    isDark ? "dark" : "light"
  );
  // 保存到本地存储
  uni.setStorageSync("theme", isDark ? "dark" : "light");
}

export function initTheme() {
  const savedTheme = uni.getStorageSync("theme");
  if (savedTheme) {
    document.documentElement.setAttribute("data-theme", savedTheme);
  } else {
    // 检测系统主题偏好
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    document.documentElement.setAttribute(
      "data-theme",
      prefersDark ? "dark" : "light"
    );
  }
}
```

## 最佳实践

1. **遵循 BEM 命名规范** - 保持组件样式的模块化和可维护性
2. **使用 CSS 变量** - 便于主题切换和动态样式
3. **使用混合(mixin)而非继承** - 更灵活的样式复用方式
4. **避免过深的选择器嵌套** - 最好不超过 3 层，保持 CSS 的可读性和性能
5. **使用工具类加速开发** - 对于常用样式，直接使用预定义的工具类
6. **组件样式作用域** - 使用 scoped 属性防止样式污染
7. **移动优先的响应式设计** - 从小屏幕设计开始，再扩展到大屏幕

这套方案不仅提供了良好的组织结构，还能有效提高样式代码的可维护性和重用性，同时支持主题切换等高级功能。
