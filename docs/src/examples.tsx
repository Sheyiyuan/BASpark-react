import React, { useState } from 'react';
import MouseSparkReact, { type MouseSparkConfig } from './MouseSparkReact';

export const BasicExample: React.FC = () => {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <MouseSparkReact />
      <div style={{ padding: '20px' }}>
        <h1>Basic MouseSpark Example</h1>
        <p>Click anywhere to see the spark effect!</p>
      </div>
    </div>
  );
};

export const CustomConfigExample: React.FC = () => {
  const [config, setConfig] = useState<MouseSparkConfig>({
    color: '45,175,255',
    scale: 1.5,
    opacity: 1.0,
    speed: 1.0,
    maxTrail: 16,
    enableTrail: false,
  });

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <MouseSparkReact {...config} />
      
      <div
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          background: 'rgba(0,0,0,0.8)',
          padding: '20px',
          borderRadius: '8px',
          color: 'white',
          pointerEvents: 'auto',
          zIndex: 1000,
        }}
      >
        <h3 style={{ margin: '0 0 15px 0' }}>Effect Settings</h3>
        
        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>
            Color (RGB):
          </label>
          <input
            type="text"
            value={config.color}
            onChange={(e) => setConfig({ ...config, color: e.target.value })}
            placeholder="e.g., 255,0,128"
            style={{ width: '150px' }}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>
            Scale: {config.scale?.toFixed(1)}
          </label>
          <input
            type="range"
            min="0.5"
            max="3"
            step="0.1"
            value={config.scale}
            onChange={(e) =>
              setConfig({ ...config, scale: parseFloat(e.target.value) })
            }
            style={{ width: '150px' }}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>
            Opacity: {config.opacity?.toFixed(1)}
          </label>
          <input
            type="range"
            min="0.1"
            max="1"
            step="0.1"
            value={config.opacity}
            onChange={(e) =>
              setConfig({ ...config, opacity: parseFloat(e.target.value) })
            }
            style={{ width: '150px' }}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>
            Speed: {config.speed?.toFixed(1)}
          </label>
          <input
            type="range"
            min="0.2"
            max="3"
            step="0.1"
            value={config.speed}
            onChange={(e) =>
              setConfig({ ...config, speed: parseFloat(e.target.value) })
            }
            style={{ width: '150px' }}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>
            Max Trail: {config.maxTrail}
          </label>
          <input
            type="range"
            min="5"
            max="30"
            step="1"
            value={config.maxTrail}
            onChange={(e) =>
              setConfig({ ...config, maxTrail: parseInt(e.target.value) })
            }
            style={{ width: '150px' }}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input
              type="checkbox"
              checked={config.enableTrail}
              onChange={(e) =>
                setConfig({ ...config, enableTrail: e.target.checked })
              }
            />
            Enable Always Trail
          </label>
        </div>
      </div>
    </div>
  );
};

export default BasicExample;