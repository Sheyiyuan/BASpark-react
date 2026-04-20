# BASpark React

将 BASpark 的核心点击特效封装为 React TSX 组件。

## 特性

- ✅ 完整保留原版 Canvas 特效逻辑（粒子、波纹、尾迹）
- ✅ 通过 props 配置颜色、大小、透明度、速度等
- ✅ 提供 `useMouseSpark` hook 供高级自定义
- ✅ TypeScript 类型支持
- ✅ 性能优化（对象池复用）
- ✅ 支持高 DPI 屏幕
- ✅ 包含完整的 E2E 测试

## 安装

将 `MouseSparkReact.tsx` 文件复制到你的 React 项目中。

确保你的项目已安装 React 和 TypeScript：

```bash
npm install react react-dom
npm install --save-dev @types/react @types/react-dom typescript
```

## 基础使用

```tsx
import MouseSparkReact from './MouseSparkReact';

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
import MouseSparkReact, { MouseSparkConfig } from './MouseSparkReact';

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
import { useMouseSpark } from './MouseSparkReact';

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

## Demo 项目

项目包含一个完整的 demo，可以直接运行查看效果：

```bash
cd demo
npm install
npm run dev
```

访问 http://localhost:5173 查看 demo。

Demo 功能：
- 实时调节颜色、大小、透明度、速度
- 切换尾迹模式
- 5 种预设颜色快速切换

## E2E 测试

项目包含完整的 Playwright E2E 测试：

```bash
cd demo
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

## 原项目

基于 [BASpark](https://github.com/DoomVoss/BASpark) 的 Canvas 特效逻辑改造。

原项目采用 WPF + WebView2 架构，本项目将其核心动效逻辑提取为纯前端 React 组件。

## 许可证

MIT License