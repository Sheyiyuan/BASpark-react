# BASpark React

[![npm version](https://img.shields.io/npm/v/baspark-react.svg)](https://www.npmjs.com/package/baspark-react)
[![GitHub license](https://img.shields.io/github/license/Sheyiyuan/BASpark.svg)](https://github.com/Sheyiyuan/BASpark/blob/main/LICENSE)
[![Live Demo](https://img.shields.io/badge/demo-online-green.svg)](https://sheyiyuan.github.io/BASpark/)

将 BASpark 的核心点击特效封装为 React TSX 组件。

## 项目来源

本项目从 [BASpark](https://github.com/DoomVoss/BASpark) 提取核心 Canvas 特效逻辑，重构为纯前端 React 组件。

原项目 BASpark 是一款 Windows 鼠标特效工具，采用 **WPF + WebView2** 混合架构，深度复刻《蔚蓝档案》(Blue Archive) 的点击动效。本项目将 `src/Web/index.html` 中的 JavaScript Canvas 动效逻辑提取并封装为独立的 React TypeScript 组件，使其可直接用于任何 React 前端项目。

视觉风格灵感来源于 Nexon / Yostar《Blue Archive》，版权归原作者所有。

## 特性

- ✅ 完整保留原版 Canvas 特效逻辑（粒子、波纹、尾迹）
- ✅ 通过 props 配置颜色、大小、透明度、速度等
- ✅ 提供 `useMouseSpark` hook 供高级自定义
- ✅ TypeScript 类型支持
- ✅ 性能优化（对象池复用）
- ✅ 支持高 DPI 屏幕
- ✅ 包含完整的 E2E 测试

## 安装

```bash
npm install baspark-react
```

确保你的项目已安装 React 和 TypeScript：

```bash
npm install react react-dom
npm install --save-dev @types/react @types/react-dom typescript
```

## 基础使用

```tsx
import MouseSparkReact from 'baspark-react';

function App() {
  return (
    <div>
      <MouseSparkReact />
      {/* 你的其他内容 */}
    </div>
  );
}
```

## 配置项

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| color | string | '45,175,255' | RGB 颜色值，格式为 'R,G,B' |
| scale | number | 1.5 | 特效大小比例 (0.5-3) |
| opacity | number | 1.0 | 整体透明度 (0.1-1) |
| speed | number | 1.0 | 动画速度 (0.2-3) |
| maxTrail | number | 16 | 鼠标拖拽尾迹最大长度 |
| enableTrail | boolean | false | 是否始终显示鼠标移动尾迹 |
| className | string | - | 容器 CSS 类名 |
| style | CSSProperties | - | 容器样式 |
| containerRef | RefObject | - | 容器 DOM 引用 |

## 完整示例

```tsx
import React, { useState } from 'react';
import MouseSparkReact, { MouseSparkConfig } from 'baspark-react';

function App() {
  const [config, setConfig] = useState<MouseSparkConfig>({
    color: '255,100,150',
    scale: 2.0,
    opacity: 0.8,
    speed: 1.5,
    maxTrail: 20,
    enableTrail: true,
  });

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <MouseSparkReact {...config} />
      
      {/* 你的应用内容 */}
      <div style={{ padding: '20px' }}>
        <h1>Blue Archive Style Mouse Effect</h1>
        <p>Click or drag to see the effect!</p>
        
        {/* 配置面板 */}
        <div style={{ marginTop: '20px' }}>
          <label>
            Scale:
            <input
              type="range"
              min="0.5"
              max="3"
              step="0.1"
              value={config.scale}
              onChange={(e) => 
                setConfig({ ...config, scale: parseFloat(e.target.value) })
              }
            />
          </label>
        </div>
      </div>
    </div>
  );
}

export default App;
```

## 使用 Hook

如果你想自定义事件处理或集成到现有系统中，可以使用 `useMouseSpark` hook：

```tsx
import React, { useRef } from 'react';
import { useMouseSpark } from 'baspark-react';

function CustomComponent() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { boom } = useMouseSpark(
    canvasRef,
    {
      color: '255,200,100',
      scale: 1.8,
      enableTrail: true,
    }
  );

  // 手动触发特效
  const triggerEffectManually = (x: number, y: number) => {
    boom(x, y);
  };

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <canvas ref={canvasRef} style={{ position: 'fixed', pointerEvents: 'none' }} />
    </div>
  );
}
```

## 在线演示

访问 [GitHub Pages Demo](https://sheyiyuan.github.io/BASpark/) 查看在线演示。

本地运行：

```bash
npm run docs:install
npm run docs:dev
```

访问 http://localhost:5173 查看演示。

## E2E 测试

项目包含完整的 Playwright E2E 测试：

```bash
npm run test:e2e        # 运行测试
npm run test:e2e:ui     # UI 模式调试
npm run test:e2e:report # 查看 HTML 报告
```

测试覆盖：
- Canvas 渲染和尺寸
- 点击特效触发
- 拖拽尾迹效果
- 所有配置项（颜色、scale、opacity、speed）
- enableTrail checkbox 切换
- UI 完整性
- 多次点击处理

---

## Authors

| 角色 | 名字 | GitHub |
|------|------|--------|
| 原项目作者 | Doom | [@DoomVoss](https://github.com/DoomVoss) |
| React 提取/改造 | Sheyiyuan | [@Sheyiyuan](https://github.com/Sheyiyuan) |

原项目 [BASpark](https://github.com/DoomVoss/BASpark) 由 Doom 开发，采用 WPF + WebView2 混合架构。
本项目由 Sheyiyuan 提取核心 Canvas 动效逻辑，重构为 React TypeScript 组件。

---

## License

MIT License

- Original work: Copyright (c) 2026 Doom
- React extraction: Copyright (c) 2026 Sheyiyuan

---

## 免责声明

- 本软件为同人爱好交流项目，严禁任何形式的倒卖行为。
- 软件按"原样"提供，作者不对使用过程中可能产生的任何直接或间接损失承担责任。
- 视觉风格灵感来源于 Nexon / Yostar《Blue Archive》，版权归原作者所有。