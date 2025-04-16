# SCSS + CSS 变量 + 简化版 BEM 详解

## 一、什么是这个方案

这个方案结合了三种技术:

1. **SCSS**: CSS 预处理器，提供变量、嵌套、混合等扩展功能
2. **CSS 变量**: 原生 CSS 支持的自定义属性，可在运行时修改
3. **简化版 BEM**: 一种 CSS 命名规范，提供样式隔离和组织结构

## 二、SCSS 与 LESS 的区别

| 特性             | SCSS                 | LESS                         |
| ---------------- | -------------------- | ---------------------------- |
| **变量符号**     | `$variable`          | `@variable`                  |
| **执行环境**     | Ruby(最初)/Node.js   | JavaScript                   |
| **功能完整性**   | 更完整，支持控制指令 | 基础功能完善，但控制指令较少 |
| **语法弹性**     | 支持纯 CSS 语法      | 支持纯 CSS 语法              |
| **混合传参**     | 更类似编程语言函数   | 简单但功能足够               |
| **uni-app 支持** | 原生支持             | 需额外配置                   |

**示例对比：**

```scss
// SCSS语法
$primary-color: #11c99c;

@mixin button-style($bg-color) {
  background: $bg-color;
  &:hover {
    background: darken($bg-color, 10%);
  }
}

.button {
  @include button-style($primary-color);
}
```

```less
// LESS语法
@primary-color: #11c99c;

.button-style(@bg-color) {
  background: @bg-color;
  &:hover {
    background: darken(@bg-color, 10%);
  }
}

.button {
  .button-style(@primary-color);
}
```

## 三、简化版 BEM

### 标准 BEM

BEM 代表 Block(块)、Element(元素)、Modifier(修饰符)：

```css
.block__element--modifier {
}
```

### 简化版 BEM

我们简化为：

```css
.block-name__element {
}
.block-name--modifier {
}
```

仅在必要时使用修饰符，减少类名长度，但保持组件隔离。

## 四、完整实施方案

### 1. 目录结构

```
app/
└── src/
    └── styles/
        ├── base/
        │   ├── _reset.scss     // 重置样式
        │   ├── _typography.scss // 文字排版
        │   └── _variables.scss  // SCSS变量
        ├── components/
        │   ├── _buttons.scss
        │   ├── _cards.scss
        │   └── _tabs.scss
        ├── theme/
        │   ├── _css-vars.scss   // CSS变量定义
        │   ├── _default.scss    // 默认主题
        │   └── _dark.scss       // 暗黑主题
        ├── utils/
        │   ├── _mixins.scss     // 混合函数
        │   └── _functions.scss  // SCSS函数
        └── main.scss            // 主入口文件
```

### 2. 变量系统设计

**SCSS 变量 (编译时):**

```scss
// _variables.scss
$font-size-base: 14px;
$font-size-large: 16px;
$spacing-base: 8px;
$border-radius: 4px;
```

**CSS 变量 (运行时):**

```scss
// _css-vars.scss
:root {
  // 主色调
  --color-primary: #11c99c;
  --color-secondary: #718bee;

  // 文字颜色
  --text-primary: #333333;
  --text-secondary: #666666;

  // 背景色
  --bg-page: #f5f5f5;
  --bg-card: #ffffff;

  // 功能色
  --color-success: #4cd964;
  --color-warning: #f0ad4e;
  --color-error: #dd524d;
}
```

### 3. 主题切换机制

```scss
// _dark.scss
[data-theme="dark"] {
  --color-primary: #0db68e;
  --text-primary: #e0e0e0;
  --text-secondary: #b0b0b0;
  --bg-page: #121212;
  --bg-card: #1e1e1e;
}
```

```js
// 主题切换函数
const toggleTheme = () => {
  const isDark = document.documentElement.getAttribute("data-theme") === "dark";
  document.documentElement.setAttribute(
    "data-theme",
    isDark ? "light" : "dark"
  );
  // uni-app存储设置
  uni.setStorageSync("theme", isDark ? "light" : "dark");
};

// 应用启动时恢复主题
const initTheme = () => {
  const theme = uni.getStorageSync("theme") || "light";
  document.documentElement.setAttribute("data-theme", theme);
};
```

### 4. 简化版 BEM 实践示例

```scss
// 房产卡片组件样式
.house-card {
  background-color: var(--bg-card);
  border-radius: $border-radius;
  padding: $spacing-base * 2;
  margin-bottom: $spacing-base * 2;

  // 元素
  &__title {
    font-size: $font-size-large;
    color: var(--text-primary);
    font-weight: bold;
  }

  &__price {
    color: var(--color-primary);
    font-size: 18px;
    margin-top: $spacing-base;
  }

  &__tags {
    display: flex;
    margin-top: $spacing-base;
  }

  &__tag {
    background: var(--color-secondary);
    color: white;
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 12px;
    margin-right: 4px;
  }

  // 修饰符
  &--featured {
    border-left: 4px solid var(--color-primary);
  }

  &--sold {
    opacity: 0.7;
  }
}
```

### 5. 工具函数和混合示例

```scss
// _mixins.scss
@mixin flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

@mixin ellipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

@mixin responsive-font($min-size, $max-size) {
  font-size: clamp($min-size, 2vw, $max-size);
}
```

## 五、完整组件 Demo 示例

### 1. 房产卡片组件

```vue
<template>
  <view class="house-card" :class="{ 'house-card--featured': isFeatured }">
    <image
      class="house-card__image"
      :src="house.imageUrl"
      mode="aspectFill"
    ></image>
    <view class="house-card__content">
      <text class="house-card__title">{{ house.title }}</text>
      <text class="house-card__price">{{ house.price }}万</text>

      <view class="house-card__info">
        <text class="house-card__area">{{ house.area }}㎡</text>
        <text class="house-card__type">{{ house.houseType }}</text>
      </view>

      <view class="house-card__tags">
        <text
          class="house-card__tag"
          v-for="(tag, index) in house.tags"
          :key="index"
        >
          {{ tag }}
        </text>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    house: {
      type: Object,
      required: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<style lang="scss">
.house-card {
  display: flex;
  flex-direction: column;
  background-color: var(--bg-card);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 16px;

  &__image {
    width: 100%;
    height: 180px;
  }

  &__content {
    padding: 12px;
  }

  &__title {
    font-size: 16px;
    color: var(--text-primary);
    font-weight: bold;
    @include ellipsis;
  }

  &__price {
    color: var(--color-primary);
    font-size: 18px;
    font-weight: bold;
    margin-top: 4px;
  }

  &__info {
    display: flex;
    margin-top: 8px;
    font-size: 14px;
    color: var(--text-secondary);
  }

  &__area {
    margin-right: 16px;
  }

  &__tags {
    display: flex;
    flex-wrap: wrap;
    margin-top: 8px;
  }

  &__tag {
    background: var(--color-secondary);
    color: white;
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 12px;
    margin-right: 4px;
    margin-bottom: 4px;
  }

  // 修饰符
  &--featured {
    border-left: 4px solid var(--color-primary);
  }
}
</style>
```

### 2. 筛选组件

```vue
<template>
  <view class="filter-bar">
    <view
      v-for="(item, index) in filters"
      :key="index"
      class="filter-bar__item"
      :class="{ 'filter-bar__item--active': activeIndex === index }"
      @tap="selectFilter(index)"
    >
      <text class="filter-bar__text">{{ item.name }}</text>
      <text class="filter-bar__icon">{{
        activeIndex === index ? "▲" : "▼"
      }}</text>
    </view>
  </view>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const filters = [
      {
        name: "区域",
        options: ["全部", "高新区", "天府新区", "武侯区", "锦江区"],
      },
      {
        name: "价格",
        options: ["全部", "100万以下", "100-200万", "200-300万", "300万以上"],
      },
      { name: "户型", options: ["全部", "一室", "两室", "三室", "四室以上"] },
      { name: "更多", options: [] },
    ];

    const activeIndex = ref(-1);

    const selectFilter = (index: number) => {
      activeIndex.value = activeIndex.value === index ? -1 : index;
    };

    return {
      filters,
      activeIndex,
      selectFilter,
    };
  },
});
</script>

<style lang="scss">
.filter-bar {
  display: flex;
  height: 45px;
  background-color: var(--bg-card);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);

  &__item {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    &--active {
      color: var(--color-primary);
    }
  }

  &__text {
    font-size: 14px;
    color: var(--text-primary);
  }

  &__icon {
    font-size: 12px;
    margin-left: 4px;
  }
}
</style>
```

## 六、项目整合步骤

### 1. 创建主样式文件

```scss
/* main.scss */
// 基础
@import "./base/reset";
@import "./base/variables";
@import "./base/typography";

// 工具
@import "./utils/mixins";
@import "./utils/functions";

// 主题
@import "./theme/css-vars";
@import "./theme/default";
@import "./theme/dark";

// 组件样式
@import "./components/buttons";
@import "./components/cards";
@import "./components/tabs";
```

### 2. 在 App.vue 中引入样式

```vue
<style lang="scss">
@import "./styles/main.scss";
</style>
```

### 3. 配置项目自动导入变量

在 vite.config.js 中添加：

```js
export default defineConfig({
  plugins: [uni()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData:
          '@import "@/styles/base/_variables.scss"; @import "@/styles/utils/_mixins.scss";',
      },
    },
  },
});
```

## 七、最佳实践建议

1. **命名一致性**：始终使用相同的命名模式
2. **避免过深嵌套**：最多嵌套 3 层，超过则拆分组件
3. **组件独立**：每个组件样式应自成一体
4. **混合适度**：不过度使用混合，避免生成大量重复 CSS
5. **CSS 变量优先**：需要运行时改变的属性使用 CSS 变量
6. **SCSS 变量用于固定值**：框架配置、固定规格使用 SCSS 变量
7. **注释关键样式**：为复杂样式添加注释说明
8. **维护风格指南**：建立团队共享的样式规范文档

通过这个方案，您可以在 uni-app 项目中拥有结构化、可维护且灵活的 CSS 架构，既支持主题切换，又能确保组件样式的隔离性，同时保持开发效率和代码可读性。
