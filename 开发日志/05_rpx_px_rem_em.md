## 不同 CSS 单位的实际应用示例

### 1. px（固定像素）

**例子：边框和阴影**

```css
.button {
  border: 1px solid #ccc; /* 边框通常用px，保持细节清晰 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 阴影效果用px可控性强 */
}
```

**实际效果**：无论在 iPhone SE 还是 iPad Pro 上，边框都是固定的 1 个像素宽度。

### 2. rpx（响应式像素）

**例子：卡片布局**

```css
/* 在uni-app中 */
.property-card {
  width: 345rpx; /* 在750rpx设计稿中占据约一半宽度 */
  margin: 20rpx;
  border-radius: 16rpx;
}
```

**实际效果**：

- 在 iPhone 6/7/8 (375px 宽)上: 卡片宽度为 172.5px（屏幕的 46%）
- 在 iPhone 12 Pro Max (428px 宽)上: 卡片宽度为 196.9px（仍然是屏幕的 46%）
- 在 iPad Mini (768px 宽)上: 卡片宽度为 352.8px（保持相同比例）

rpx 保证了元素在不同设备上占据相同的视觉比例。

### 3. rem（基于根元素字体大小）

**例子：响应式网站布局**

```javascript
// 设置根字体大小 (常用JS代码)
document.documentElement.style.fontSize = window.innerWidth / 10 + "px";
```

```css
html {
  font-size: 10px; /* 基础大小，可能被上面的JS覆盖 */
}

.container {
  max-width: 76.8rem; /* 相当于768px（如果html字体为10px） */
  margin: 0 auto;
}

.heading {
  font-size: 2.4rem; /* 相当于24px */
  margin-bottom: 1.6rem; /* 相当于16px */
}
```

**实际效果**：

- 在手机上(320px 宽)：根字体变为 32px，标题为 76.8px
- 在平板上(768px 宽)：根字体变为 76.8px，标题为 184.32px
- 在桌面上(1920px 宽)：根字体变为 192px，标题为 460.8px

所有元素都会按比例放大缩小。

### 4. em（基于父元素字体大小）

**例子：文本相关间距**

```css
.article {
  font-size: 16px;
}

.article p {
  line-height: 1.5; /* 相当于24px (16px × 1.5) */
  margin-bottom: 1em; /* 相当于16px，与文本大小相同 */
}

.article .highlight {
  font-size: 1.25em; /* 相当于20px (16px × 1.25) */
  padding: 0.5em; /* 相当于10px (20px × 0.5) */
}
```

**实际效果**：当文章字体大小变化时，段落间距和强调文本的尺寸会相应调整，保持与文本大小的视觉平衡。

### 5. vw/vh（视口单位）

**例子：全屏布局**

```css
.hero-banner {
  width: 100vw; /* 占满整个视口宽度 */
  height: 50vh; /* 占据一半视口高度 */
}

.sidebar {
  width: 30vw; /* 占据30%的视口宽度 */
}

.font-responsive {
  font-size: calc(16px + 1vw); /* 基础字体16px，加上1%视口宽度 */
}
```

**实际效果**：

- banner 元素总是占据整个屏幕宽度和一半高度
- 侧边栏总是占据 30%的屏幕宽度
- 文本大小随屏幕变化：在 320px 屏幕上约 19.2px，在 1920px 屏幕上约 35.2px

### uni-app 中的实际应用（rpx vs px）

**房产卡片示例**：

```css
/* 使用rpx的好例子 */
.estates-card {
  width: 345rpx; /* 宽度自动适应不同设备 */
  border-radius: 16rpx;
  margin: 16rpx;
  overflow: hidden;
}

.estates-title {
  font-size: 32rpx; /* 字体大小自动缩放 */
  margin: 16rpx;
  line-height: 1.4; /* 行高用无单位数值，相对于字体大小 */
}

/* px适合用于细节 */
.estates-divider {
  height: 1px; /* 想要在任何设备上都显示为1个像素的线 */
}

/* 混合使用 */
.estates-tag {
  font-size: 24rpx; /* 字体大小自适应 */
  padding: 4rpx 12rpx; /* 内边距自适应 */
  border: 1px solid rgba(0, 0, 0, 0.1); /* 边框保持精确 */
}
```

在实际项目中，往往会混合使用这些单位，根据具体的设计需求选择最合适的单位，以创建既美观又灵活的用户界面。在 uni-app 项目中，rpx 是最常用的单位，因为它专为移动端适配而设计。
