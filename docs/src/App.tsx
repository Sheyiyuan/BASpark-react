import { useState } from 'react'
import MouseSparkReact from './MouseSparkReact'
import './App.css'

function App() {
  const [config, setConfig] = useState({
    color: '45,175,255',
    scale: 1.5,
    opacity: 1.0,
    speed: 1.0,
    maxTrail: 16,
    enableTrail: false,
  })

  return (
    <>
      <MouseSparkReact {...config} />
      
      <section id="center">
        <div className="hero">
          <div style={{ fontSize: '64px', marginBottom: '20px' }}>✨</div>
        </div>
        <div>
          <h1 style={{ margin: '0 0 16px 0', fontSize: '48px' }}>BASpark React</h1>
          <p style={{ fontSize: '18px', maxWidth: '600px', lineHeight: '1.6', marginBottom: '16px' }}>
            Blue Archive style mouse spark effect React component.
            Click anywhere to see the spark effect!
          </p>
          <p style={{ fontSize: '14px', marginTop: '12px', color: '#666' }}>
            Extracted from <a href="https://github.com/DoomVoss/BASpark" target="_blank" style={{ color: 'var(--accent)' }}>BASpark</a> Windows mouse effect tool
          </p>
          <p style={{ fontSize: '14px', marginTop: '8px', color: '#888' }}>
            Drag mouse while clicking to see trail effect
          </p>
        </div>
        
        <div style={{ marginTop: '32px', display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a 
            href="https://github.com/DoomVoss/BASpark" 
            target="_blank"
            style={{
              padding: '12px 24px',
              background: '#24292f',
              color: '#fff',
              borderRadius: '6px',
              textDecoration: 'none',
              fontWeight: '500',
              pointerEvents: 'auto',
            }}
          >
            GitHub Repository
          </a>
          <a 
            href="#usage" 
            style={{
              padding: '12px 24px',
              background: 'rgba(45,175,255,0.2)',
              color: '#2dafff',
              borderRadius: '6px',
              textDecoration: 'none',
              fontWeight: '500',
              pointerEvents: 'auto',
            }}
          >
            Quick Start
          </a>
        </div>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <h2>⚡ Live Demo Settings</h2>
          <p style={{ marginBottom: '16px', color: '#666' }}>
            Adjust these settings to customize the effect
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
              <span style={{ width: '80px' }}>Color (RGB):</span>
              <input
                type="text"
                value={config.color}
                onChange={(e) => setConfig({ ...config, color: e.target.value })}
                placeholder="R,G,B"
                style={{ width: '120px', padding: '4px 8px' }}
              />
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
              <span style={{ width: '80px' }}>Scale:</span>
              <input
                type="range"
                min="0.5"
                max="3"
                step="0.1"
                value={config.scale}
                onChange={(e) => setConfig({ ...config, scale: parseFloat(e.target.value) })}
                style={{ width: '120px' }}
              />
              <span style={{ width: '40px' }}>{config.scale.toFixed(1)}</span>
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
              <span style={{ width: '80px' }}>Opacity:</span>
              <input
                type="range"
                min="0.1"
                max="1"
                step="0.1"
                value={config.opacity}
                onChange={(e) => setConfig({ ...config, opacity: parseFloat(e.target.value) })}
                style={{ width: '120px' }}
              />
              <span style={{ width: '40px' }}>{config.opacity.toFixed(1)}</span>
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
              <span style={{ width: '80px' }}>Speed:</span>
              <input
                type="range"
                min="0.2"
                max="3"
                step="0.1"
                value={config.speed}
                onChange={(e) => setConfig({ ...config, speed: parseFloat(e.target.value) })}
                style={{ width: '120px' }}
              />
              <span style={{ width: '40px' }}>{config.speed.toFixed(1)}</span>
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
              <input
                type="checkbox"
                checked={config.enableTrail}
                onChange={(e) => setConfig({ ...config, enableTrail: e.target.checked })}
              />
              <span>Always Trail Mode</span>
            </label>
          </div>
        </div>

        <div id="social">
          <h2>🎨 Preset Colors</h2>
          <p style={{ marginBottom: '16px', color: '#666' }}>
            Click to apply preset color themes
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[
              { name: 'Blue Archive Blue', color: '45,175,255' },
              { name: 'Pink', color: '255,100,150' },
              { name: 'Green', color: '100,255,150' },
              { name: 'Gold', color: '255,200,50' },
              { name: 'Purple', color: '180,100,255' },
            ].map((preset) => (
              <button
                key={preset.color}
                onClick={() => setConfig({ ...config, color: preset.color })}
                style={{
                  padding: '8px 16px',
                  border: '1px solid var(--border)',
                  borderRadius: '4px',
                  background: `rgba(${preset.color}, 0.2)`,
                  cursor: 'pointer',
                  fontFamily: 'var(--sans)',
                  transition: 'all 0.2s',
                }}
              >
                {preset.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="ticks"></div>

      <section id="usage" style={{ padding: '40px 20px', maxWidth: '800px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '24px' }}>📦 Quick Start</h2>
        
        <div style={{ background: 'var(--code-bg)', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
          <h3 style={{ marginTop: 0 }}>Installation</h3>
          <code style={{ display: 'block', whiteSpace: 'pre-wrap', fontSize: '14px' }}>
npm install baspark-react
          </code>
        </div>

        <div style={{ background: 'var(--code-bg)', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
          <h3 style={{ marginTop: 0 }}>Basic Usage</h3>
          <code style={{ display: 'block', whiteSpace: 'pre-wrap', fontSize: '14px' }}>
import MouseSparkReact from 'baspark-react';

function App() {
  return &lt;MouseSparkReact color="45,175,255" /&gt;;
}
          </code>
        </div>

        <div style={{ background: 'var(--code-bg)', padding: '20px', borderRadius: '8px' }}>
          <h3 style={{ marginTop: 0 }}>With Configuration</h3>
          <code style={{ display: 'block', whiteSpace: 'pre-wrap', fontSize: '14px' }}>
&lt;MouseSparkReact
  color="255,100,150"
  scale={2.0}
  opacity={0.8}
  speed={1.5}
  enableTrail={true}
/&gt;
          </code>
        </div>

        <div style={{ textAlign: 'center', marginTop: '32px' }}>
          <a 
            href="https://github.com/DoomVoss/BASpark#readme" 
            target="_blank"
            style={{ color: 'var(--accent)', textDecoration: 'none' }}
          >
            View Full Documentation →
          </a>
        </div>
      </section>

      <div className="ticks"></div>

      <section style={{ padding: '40px 20px', textAlign: 'center' }}>
        <h2 style={{ marginBottom: '16px' }}>✨ Features</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ padding: '16px', background: 'var(--code-bg)', borderRadius: '8px' }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>🎯</div>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '16px' }}>Click Effect</h3>
            <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>Particle burst with wave ripple</p>
          </div>
          <div style={{ padding: '16px', background: 'var(--code-bg)', borderRadius: '8px' }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>🌈</div>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '16px' }}>Customizable</h3>
            <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>Color, size, speed, opacity</p>
          </div>
          <div style={{ padding: '16px', background: 'var(--code-bg)', borderRadius: '8px' }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>✨</div>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '16px' }}>Trail Effect</h3>
            <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>Mouse drag trail particles</p>
          </div>
          <div style={{ padding: '16px', background: 'var(--code-bg)', borderRadius: '8px' }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>⚡</div>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '16px' }}>Performant</h3>
            <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>Object pooling optimization</p>
          </div>
        </div>
      </section>

      <div className="ticks"></div>

      <section style={{ padding: '40px 20px', maxWidth: '800px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '24px' }}>📖 About</h2>
        
        <div style={{ background: 'var(--code-bg)', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
          <h3 style={{ marginTop: 0, marginBottom: '12px' }}>Project Origin</h3>
          <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.6', color: '#666' }}>
            This React component is extracted from <a href="https://github.com/DoomVoss/BASpark" target="_blank" style={{ color: 'var(--accent)' }}>BASpark</a>, 
            a Windows mouse effect tool that uses <strong>WPF + WebView2</strong> hybrid architecture to recreate Blue Archive UI style interactions.
          </p>
        </div>

        <div style={{ background: 'var(--code-bg)', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
          <h3 style={{ marginTop: 0, marginBottom: '12px' }}>What's Extracted</h3>
          <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.6', color: '#666' }}>
            The core Canvas effect logic from <code style={{ background: '#fff', padding: '2px 6px', borderRadius: '3px' }}>src/Web/index.html</code> 
            has been extracted and refactored into a standalone React TypeScript component, making it usable in any React frontend project.
          </p>
        </div>

        <div style={{ background: 'var(--code-bg)', padding: '20px', borderRadius: '8px' }}>
          <h3 style={{ marginTop: 0, marginBottom: '12px' }}>Visual Style</h3>
          <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.6', color: '#666' }}>
            Visual style inspired by <strong>Nexon / Yostar Blue Archive</strong>. All rights belong to the original game author.
          </p>
        </div>
      </section>

      <div className="ticks"></div>
      
      <footer style={{ padding: '32px 20px', textAlign: 'center', borderTop: '1px solid var(--border)' }}>
        <p style={{ margin: 0, color: '#666' }}>
          Made with ❤️ by <a href="https://github.com/DoomVoss" target="_blank" style={{ color: 'var(--accent)' }}>Doom</a>
        </p>
        <p style={{ margin: '8px 0 0 0', fontSize: '12px', color: '#999' }}>
          MIT License • Extracted from <a href="https://github.com/DoomVoss/BASpark" target="_blank" style={{ color: 'var(--accent)' }}>BASpark</a>
        </p>
      </footer>
    </>
  )
}

export default App