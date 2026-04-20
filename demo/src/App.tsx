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
        <div>
          <h1>BASpark React Demo</h1>
          <p>Click anywhere to see the Blue Archive style spark effect!</p>
          <p style={{ fontSize: '14px', marginTop: '10px', color: '#666' }}>
            Drag mouse while clicking to see trail effect
          </p>
        </div>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <h2>Effect Settings</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px' }}>
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
          <h2>Preset Colors</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '16px' }}>
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
                }}
              >
                {preset.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App