import { useState } from 'react'
import MouseSparkReact from './MouseSparkReact'
import './App.css'

const i18n = {
  zh: {
    heroTitle: 'BASpark-react',
    heroSubtitle: '蔚蓝档案风格的鼠标点击特效组件。点击页面任意位置查看效果！',
    heroLink: '提取自 BASpark Windows 桌面工具',
    heroLinkTrail: '点击拖动鼠标查看尾迹效果',
    btnGithub: '查看源码',
    btnQuickStart: '快速开始',
    liveDemo: '实时演示',
    effectSettings: '特效设置',
    effectSettingsDesc: '调整参数自定义火花效果',
    color: '颜色',
    scale: '大小',
    opacity: '透明度',
    speed: '速度',
    alwaysTrail: '始终尾迹模式',
    colors: '颜色预设',
    colorsDesc: '点击快速应用配色主题',
    presetBlue: '蔚蓝档案蓝',
    presetPink: '樱花粉',
    presetGreen: '薄荷绿',
    presetGold: '黄金时刻',
    presetTwilight: '暮光紫',
    quickStart: '快速开始',
    install: '安装',
    basicUsage: '基础用法',
    withConfig: '带配置',
    btnFullDoc: '完整文档',
    features: '特性',
    featureClick: '点击特效',
    featureClickDesc: '粒子爆发与扩散波纹动画',
    featureCustom: '可定制',
    featureCustomDesc: '完全控制颜色、大小、速度和透明度',
    featureTrail: '尾迹效果',
    featureTrailDesc: '平滑的鼠标拖动尾迹粒子',
    featurePerf: '高性能',
    featurePerfDesc: '对象池复用和优化渲染循环',
    about: '关于',
    aboutOrigin: '项目来源',
    aboutOriginDesc: '提取自 BASpark，一个使用 WPF + WebView2 混合架构的 Windows 鼠标特效工具，复刻蔚蓝档案 UI 交互风格。',
    aboutIncluded: '包含内容',
    aboutIncludedDesc: '从 src/Web/index.html 提取核心 Canvas 动效逻辑，重构为独立的 React TypeScript 组件，可直接用于前端项目。',
    aboutVisual: '视觉风格',
    aboutVisualDesc: '灵感源自 Nexon / Yostar 蔚蓝档案。视觉风格版权归原游戏作者所有。',
    footerAuthors: '原作者: Doom (@DoomVoss) | React提取: Sheyiyuan (@Sheyiyuan)',
    footerLicense: 'MIT License',
    documentation: '完整文档',
    docTitle: 'BASpark-react 文档',
    docIntro: '将 BASpark 的核心点击特效封装为 React TSX 组件。',
    docFeatures: '特性',
    docInstall: '安装',
    docBasicUsage: '基础用法',
    docConfig: '配置项',
    docConfigTable: [
      ['属性', '类型', '默认值', '说明'],
      ['color', 'string', "'45,175,255'", 'RGB颜色值，格式为 R,G,B'],
      ['scale', 'number', '1.5', '特效大小比例 (0.5-3)'],
      ['opacity', 'number', '1.0', '整体透明度 (0.1-1)'],
      ['speed', 'number', '1.0', '动画速度 (0.2-3)'],
      ['maxTrail', 'number', '16', '鼠标拖拽尾迹最大长度'],
      ['enableTrail', 'boolean', 'false', '是否始终显示鼠标移动尾迹'],
      ['className', 'string', '-', '容器CSS类名'],
      ['style', 'CSSProperties', '-', '容器样式'],
      ['containerRef', 'RefObject', '-', '容器DOM引用'],
    ],
    docHook: '使用 Hook',
    docHookDesc: '如果你想自定义事件处理或集成到现有系统中，可以使用 useMouseSpark hook：',
    docHookManual: '// 手动触发特效',
    docBackDemo: '返回演示',
  },
  en: {
    heroTitle: 'BASpark-react',
    heroSubtitle: 'Blue Archive style mouse spark effect for your React app. Click anywhere to see the magic!',
    heroLink: 'Extracted from BASpark Windows tool',
    heroLinkTrail: 'Drag while clicking to see trail effect',
    btnGithub: 'View Source',
    btnQuickStart: 'Quick Start',
    liveDemo: 'LIVE DEMO',
    effectSettings: 'Effect Settings',
    effectSettingsDesc: 'Adjust parameters to customize the spark effect',
    color: 'Color',
    scale: 'Scale',
    opacity: 'Opacity',
    speed: 'Speed',
    alwaysTrail: 'Always Trail Mode',
    colors: 'COLORS',
    colorsDesc: 'Click to instantly apply a color theme',
    presetBlue: 'Blue Archive',
    presetPink: 'Sakura Pink',
    presetGreen: 'Mint Green',
    presetGold: 'Golden Hour',
    presetTwilight: 'Twilight',
    quickStart: 'Quick Start',
    install: 'Install',
    basicUsage: 'Basic Usage',
    withConfig: 'With Config',
    btnFullDoc: 'Full Documentation',
    features: 'Features',
    featureClick: 'Click Effect',
    featureClickDesc: 'Particle burst with expanding wave ripple animation',
    featureCustom: 'Customizable',
    featureCustomDesc: 'Full control over color, size, speed, and opacity',
    featureTrail: 'Trail Effect',
    featureTrailDesc: 'Smooth mouse drag trail with gradient particles',
    featurePerf: 'Performant',
    featurePerfDesc: 'Object pooling and optimized rendering loop',
    about: 'About',
    aboutOrigin: 'Project Origin',
    aboutOriginDesc: 'Extracted from BASpark, a Windows mouse effect tool using WPF + WebView2 architecture to recreate Blue Archive UI interactions.',
    aboutIncluded: 'What\'s Included',
    aboutIncludedDesc: 'Core Canvas logic from src/Web/index.html extracted and refactored into a standalone React TypeScript component.',
    aboutVisual: 'Visual Style',
    aboutVisualDesc: 'Inspired by Nexon / Yostar Blue Archive. Visual style rights belong to the original game authors.',
    footerAuthors: 'Original: Doom (@DoomVoss) | React extraction: Sheyiyuan (@Sheyiyuan)',
    footerLicense: 'MIT License',
    documentation: 'Documentation',
    docTitle: 'BASpark-react Documentation',
    docIntro: 'React TSX component extracted from BASpark core canvas effect.',
    docFeatures: 'Features',
    docInstall: 'Install',
    docBasicUsage: 'Basic Usage',
    docConfig: 'Configuration',
    docConfigTable: [
      ['Property', 'Type', 'Default', 'Description'],
      ['color', 'string', "'45,175,255'", 'RGB color value, format: R,G,B'],
      ['scale', 'number', '1.5', 'Effect size ratio (0.5-3)'],
      ['opacity', 'number', '1.0', 'Overall opacity (0.1-1)'],
      ['speed', 'number', '1.0', 'Animation speed (0.2-3)'],
      ['maxTrail', 'number', '16', 'Max mouse drag trail length'],
      ['enableTrail', 'boolean', 'false', 'Always show mouse movement trail'],
      ['className', 'string', '-', 'Container CSS class'],
      ['style', 'CSSProperties', '-', 'Container style'],
      ['containerRef', 'RefObject', '-', 'Container DOM reference'],
    ],
    docHook: 'Using Hook',
    docHookDesc: 'Use useMouseSpark hook for custom event handling:',
    docHookManual: '// Manually trigger effect',
    docBackDemo: 'Back to Demo',
  }
}

type Lang = 'zh' | 'en'

function App() {
  const [lang, setLang] = useState<Lang>('zh')
  const [config, setConfig] = useState({
    color: '45,175,255',
    scale: 1.5,
    opacity: 1.0,
    speed: 1.0,
    maxTrail: 16,
    enableTrail: true,
  })
  const [showDoc, setShowDoc] = useState(false)

  const t = i18n[lang]

  const presets = [
    { name: t.presetBlue, color: '45,175,255', rgb: 'rgb(45,175,255)' },
    { name: t.presetPink, color: '255,107,157', rgb: 'rgb(255,107,157)' },
    { name: t.presetGreen, color: '92,214,163', rgb: 'rgb(92,214,163)' },
    { name: t.presetGold, color: '255,179,71', rgb: 'rgb(255,179,71)' },
    { name: t.presetTwilight, color: '180,100,255', rgb: 'rgb(180,100,255)' },
  ]

  if (showDoc) {
    return (
      <>
        <MouseSparkReact {...config} />
        <div style={{ 
          position: 'fixed', 
          top: 0, 
          right: 0, 
          padding: '16px 20px', 
          display: 'flex', 
          gap: '16px', 
          alignItems: 'center',
          zIndex: 10000,
          pointerEvents: 'auto',
        }}>
          <button 
            onClick={() => setLang(lang === 'zh' ? 'en' : 'zh')}
            className="ba-button-outline"
            style={{ padding: '8px 16px', fontSize: '13px' }}
          >
            {lang === 'zh' ? 'EN' : '中文'}
          </button>
          <button 
            onClick={() => setShowDoc(false)}
            className="ba-button"
            style={{ padding: '8px 16px', fontSize: '13px' }}
          >
            {t.docBackDemo}
          </button>
        </div>

        <section className="hero-section" style={{ minHeight: '30vh' }}>
          <h1 className="hero-title">{t.docTitle}</h1>
          <p className="hero-subtitle">{t.docIntro}</p>
        </section>

        <div className="ba-section-divider" />

        <section className="quickstart-section">
          <h2>{t.docFeatures}</h2>
          <div className="features-grid">
            <div className="ba-card feature-card">
              <h3>{t.featureClick}</h3>
              <p>{t.featureClickDesc}</p>
            </div>
            <div className="ba-card feature-card">
              <h3>{t.featureCustom}</h3>
              <p>{t.featureCustomDesc}</p>
            </div>
            <div className="ba-card feature-card">
              <h3>{t.featureTrail}</h3>
              <p>{t.featureTrailDesc}</p>
            </div>
            <div className="ba-card feature-card">
              <h3>{t.featurePerf}</h3>
              <p>{t.featurePerfDesc}</p>
            </div>
          </div>
        </section>

        <div className="ba-section-divider" />

        <section className="quickstart-section">
          <h2>{t.docInstall}</h2>
          <div className="ba-code-block">
            <code>npm install baspark-react</code>
          </div>
        </section>

        <div className="ba-section-divider" />

        <section className="quickstart-section">
          <h2>{t.docBasicUsage}</h2>
          <div className="ba-code-block">
            <code>{`import MouseSparkReact from 'baspark-react';

function App() {
  return <MouseSparkReact />;
}`}</code>
          </div>
        </section>

        <div className="ba-section-divider" />

        <section className="quickstart-section">
          <h2>{t.docConfig}</h2>
          <div className="ba-card" style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--ba-blue)' }}>
                  {t.docConfigTable[0].map((header, i) => (
                    <th key={i} style={{ padding: '12px', textAlign: i === 0 ? 'left' : 'left', fontWeight: 600 }}>
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {t.docConfigTable.slice(1).map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--border)' }}>
                    {row.map((cell, j) => (
                      <td key={j} style={{ padding: '12px', color: j === 0 ? 'var(--ba-blue)' : 'var(--text-secondary)' }}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <div className="ba-section-divider" />

        <section className="quickstart-section">
          <h2>{t.docHook}</h2>
          <p style={{ marginBottom: '16px', color: 'var(--text-secondary)' }}>{t.docHookDesc}</p>
          <div className="ba-code-block">
            <code>{`import { useMouseSpark } from 'baspark-react';

function CustomComponent() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { boom } = useMouseSpark(canvasRef, {
    color: '255,200,100',
    scale: 1.8,
  });

  ${t.docHookManual}
  const trigger = (x, y) => boom(x, y);

  return <canvas ref={canvasRef} />;
}`}</code>
          </div>
        </section>

        <div className="ba-section-divider" />

        <footer className="footer">
          <p>{t.footerAuthors}</p>
          <p className="footer-note">{t.footerLicense} • <a href="https://github.com/DoomVoss/BASpark" target="_blank">BASpark</a></p>
        </footer>
      </>
    )
  }

  return (
    <>
      <MouseSparkReact {...config} />
      
      <div style={{ 
        position: 'fixed', 
        top: 0, 
        right: 0, 
        padding: '16px 20px', 
        zIndex: 10000,
        pointerEvents: 'auto',
      }}>
        <button 
          onClick={() => setLang(lang === 'zh' ? 'en' : 'zh')}
          className="ba-button-outline"
          style={{ padding: '8px 16px', fontSize: '13px' }}
        >
          {lang === 'zh' ? 'EN' : '中文'}
        </button>
      </div>

      <section className="hero-section">
        <h1 className="hero-title">{t.heroTitle}</h1>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <img src="https://img.shields.io/npm/v/baspark-react.svg?style=flat-square" alt="npm version" />
          <img src="https://img.shields.io/badge/React-16.8%2B-61dafb?logo=react&style=flat-square" alt="React" />
          <img src="https://img.shields.io/badge/TypeScript-5.0%2B-3178c6?logo=typescript&style=flat-square" alt="TypeScript" />
        </div>
        <p className="hero-subtitle">{t.heroSubtitle}</p>
        <p className="hero-link">
          {t.heroLink} (<a href="https://github.com/DoomVoss/BASpark" target="_blank">BASpark</a>)
        </p>
        <p className="hero-link" style={{ marginTop: '4px' }}>
          {t.heroLinkTrail}
        </p>
        
        <div className="hero-actions">
          <a href="https://github.com/DoomVoss/BASpark" target="_blank" className="ba-button">
            {t.btnGithub}
          </a>
          <button onClick={() => setShowDoc(true)} className="ba-button-outline">
            {t.btnQuickStart}
          </button>
        </div>
      </section>

      <div className="ba-section-divider" />

      <section className="settings-section">
        <div className="settings-grid">
          <div className="ba-card settings-card">
            <span className="section-badge">{t.liveDemo}</span>
            <h2>{t.effectSettings}</h2>
            <p>{t.effectSettingsDesc}</p>
            
            <div className="setting-item">
              <span className="setting-label">{t.color}</span>
              <input
                type="text"
                value={config.color}
                onChange={(e) => setConfig({ ...config, color: e.target.value })}
                className="ba-text-input"
                style={{ flex: 1 }}
                placeholder="R,G,B"
              />
            </div>
            
            <div className="setting-item">
              <span className="setting-label">{t.scale}</span>
              <input
                type="range"
                min="0.5"
                max="3"
                step="0.1"
                value={config.scale}
                onChange={(e) => setConfig({ ...config, scale: parseFloat(e.target.value) })}
                className="ba-slider"
                style={{ flex: 1 }}
              />
              <span className="setting-value">{config.scale.toFixed(1)}</span>
            </div>
            
            <div className="setting-item">
              <span className="setting-label">{t.opacity}</span>
              <input
                type="range"
                min="0.1"
                max="1"
                step="0.1"
                value={config.opacity}
                onChange={(e) => setConfig({ ...config, opacity: parseFloat(e.target.value) })}
                className="ba-slider"
                style={{ flex: 1 }}
              />
              <span className="setting-value">{config.opacity.toFixed(1)}</span>
            </div>
            
            <div className="setting-item">
              <span className="setting-label">{t.speed}</span>
              <input
                type="range"
                min="0.2"
                max="3"
                step="0.1"
                value={config.speed}
                onChange={(e) => setConfig({ ...config, speed: parseFloat(e.target.value) })}
                className="ba-slider"
                style={{ flex: 1 }}
              />
              <span className="setting-value">{config.speed.toFixed(1)}</span>
            </div>
            
            <label className="ba-checkbox" style={{ marginTop: '12px' }}>
              <input
                type="checkbox"
                checked={config.enableTrail}
                onChange={(e) => setConfig({ ...config, enableTrail: e.target.checked })}
              />
              <span>{t.alwaysTrail}</span>
            </label>
          </div>

          <div className="ba-card settings-card">
            <span className="section-badge">{t.colors}</span>
            <h2>{t.colorsDesc}</h2>
            <p style={{ marginBottom: '24px' }}></p>
            
            <div className="preset-grid">
              {presets.map((preset) => (
                <button
                  key={preset.color}
                  onClick={() => setConfig({ ...config, color: preset.color })}
                  className="preset-button"
                  style={{
                    borderColor: preset.rgb,
                    color: preset.rgb,
                    background: config.color === preset.color 
                      ? `rgba(${preset.color}, 0.15)` 
                      : 'transparent',
                  }}
                >
                  {preset.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="ba-section-divider" />

      <section className="about-section">
        <h2>{t.about}</h2>
        
        <div className="ba-card about-card">
          <h3>{t.aboutOrigin}</h3>
          <p>{t.aboutOriginDesc}</p>
        </div>
        
        <div className="ba-card about-card">
          <h3>{t.aboutIncluded}</h3>
          <p>{t.aboutIncludedDesc}</p>
        </div>
        
        <div className="ba-card about-card">
          <h3>{t.aboutVisual}</h3>
          <p>{t.aboutVisualDesc}</p>
        </div>
        
        <div style={{ textAlign: 'center', marginTop: '32px' }}>
          <button 
            onClick={() => setShowDoc(true)}
            className="ba-button-outline"
          >
            {t.btnFullDoc} →
          </button>
        </div>
      </section>

      <footer className="footer">
        <p>{t.footerAuthors}</p>
        <p className="footer-note">{t.footerLicense} • <a href="https://github.com/DoomVoss/BASpark" target="_blank">BASpark</a></p>
      </footer>
    </>
  )
}

export default App