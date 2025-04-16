# namespace 和 declare 的区别

## declare 关键字

`declare` 是用来告诉 TypeScript 编译器某个变量、函数、类或模块已经在别处定义，不需要在编译阶段生成它们的 JavaScript 代码。

### declare 的主要用途

1. **声明全局变量或函数**

   ```typescript
   declare const jQuery: any; // 告诉TS jQuery变量存在
   declare function alert(message: string): void; // 声明全局函数
   ```

2. **声明类型**

   ```typescript
   declare type UserID = string;
   ```

3. **声明模块**

   ```typescript
   declare module "some-module" {
     export function doSomething(): void;
   }
   ```

4. **声明文件**

   ```typescript
   declare module "*.json" {
     const content: any;
     export default content;
   }
   ```

5. **声明命名空间**
   ```typescript
   declare namespace MyLib {
     function makeGreeting(name: string): string;
     interface Options {
       verbose?: boolean;
     }
   }
   ```

### declare 的特点

- **仅用于类型检查**：不会生成 JavaScript 代码
- **适用于处理外部代码**：如告诉 TS 关于全局变量、第三方库等
- **常见于.d.ts 文件中**：但也可以在普通.ts 文件中使用

## namespace 关键字

`namespace` 是 TypeScript 的内部模块系统，用于组织和分类代码，防止全局作用域污染。

### namespace 的主要用途

1. **组织代码**

   ```typescript
   namespace Validation {
     export interface StringValidator {
       isValid(s: string): boolean;
     }

     export class ZipCodeValidator implements StringValidator {
       isValid(s: string): boolean {
         return s.length === 5;
       }
     }
   }

   // 使用
   let validator = new Validation.ZipCodeValidator();
   ```

2. **命名空间嵌套**

   ```typescript
   namespace Shapes {
     export namespace Polygons {
       export class Triangle {}
       export class Square {}
     }
   }

   // 使用
   let sq = new Shapes.Polygons.Square();
   ```

3. **跨文件的命名空间**（使用`/// <reference>`）

   ```typescript
   // file1.ts
   namespace Shapes {
     export class Circle {}
   }

   // file2.ts
   /// <reference path="file1.ts" />
   namespace Shapes {
     export class Rectangle {}
   }

   // 两个文件会合并成一个Shapes命名空间
   ```

### namespace 的特点

- **会生成 JavaScript 代码**：编译后会变成 IIFE（立即调用函数表达式）
- **创建真实的对象结构**：在运行时确实存在
- **已不再推荐使用**：现代 TypeScript 更推荐使用 ES 模块系统

## declare namespace 的组合使用

当`declare`和`namespace`组合使用时，表示声明一个外部定义的命名空间：

```typescript
// 告诉TS，jQuery命名空间存在于外部
declare namespace jQuery {
  function ajax(url: string, settings?: any): void;
  const version: string;
  interface AjaxSettings {
    method?: "GET" | "POST";
    data?: any;
  }
}

// 使用外部命名空间
jQuery.ajax("/api/users");
```

## 关键区别总结

| 特性           | declare         | namespace          | declare namespace      |
| -------------- | --------------- | ------------------ | ---------------------- |
| **生成代码**   | 不生成          | 生成 IIFE          | 不生成                 |
| **用途**       | 类型声明        | 代码组织           | 外部命名空间声明       |
| **运行时存在** | 否              | 是                 | 依赖外部定义           |
| **现代推荐度** | 高（用于.d.ts） | 低（推荐 ES 模块） | 高（用于声明文件）     |
| **主要场景**   | 声明外部类型    | 老式代码组织       | 描述现有 JavaScript 库 |

在我们的 uni-app 类型扩展中：

```typescript
declare namespace UniApp {
  interface PageInstance {
    // ...
  }
}
```

我们使用`declare namespace`是因为：

1. UniApp 命名空间已经由 uni-app 的类型文件定义
2. 我们只是想扩展现有类型，而不是创建新代码
3. 这样的声明告诉 TypeScript 编译器"这个命名空间存在，我只是添加更多类型信息"

现代 TypeScript 开发中，通常在应用代码中使用 ES 模块（import/export），而在声明文件（.d.ts）中使用 declare 关键字来处理类型声明。namespace 主要用于兼容老代码或特定场景下的代码组织。
