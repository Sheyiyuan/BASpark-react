# MouseSparkReact E2E Tests

## 运行测试

```bash
cd react/demo
npm run test:e2e
```

## 测试覆盖范围

### 核心功能测试
- **Canvas渲染**: 验证Canvas元素正确创建和尺寸设置
- **点击特效**: 验证鼠标点击触发粒子特效
- **拖拽尾迹**: 验证鼠标拖动时显示尾迹效果

### 配置功能测试
- **颜色选择**: 验证预设颜色按钮正确更新颜色值
- **Scale调节**: 验证scale滑块正确调整特效大小
- **Opacity调节**: 验证opacity滑块正确调整透明度
- **Speed调节**: 验证speed滑块正确调整动画速度
- **EnableTrail开关**: 验证checkbox正确切换尾迹模式

### UI完整性测试
- **设置面板**: 验证所有设置面板元素可见
- **颜色预设**: 验证所有5种颜色预设按钮存在
- **主标题**: 验证页面标题正确显示

### 边界情况测试
- **多次点击**: 验证连续快速点击的处理能力

## 测试架构

- **框架**: Playwright
- **浏览器**: Chromium
- **运行模式**: Headless
- **并发数**: 10 workers
- **超时时间**: 30秒/测试

## 测试报告

测试完成后可查看HTML报告：

```bash
npx playwright show-report
```