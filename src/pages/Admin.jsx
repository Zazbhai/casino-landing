import React, { useState, useEffect } from 'react';
import '../index.css';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [config, setConfig] = useState({ appName: '', appLogo: '', downloads: 0 });
  
  const [newName, setNewName] = useState('');
  const [logoFile, setLogoFile] = useState(null);
  const [apkFile, setApkFile] = useState(null);
  const [message, setMessage] = useState('');

  const API_BASE = import.meta.env.VITE_API_URL || (window.location.hostname === 'localhost' ? 'http://localhost:3000' : '');

  const fetchConfig = () => {
    fetch(`${API_BASE}/api/landing-config`)
      .then(res => res.json())
      .then(data => {
        if (data.appName) {
          setConfig(data);
          setNewName(data.appName);
        }
      })
      .catch(err => console.error("Could not fetch landing config:", err));
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchConfig();
    }
  }, [isAuthenticated]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAuthenticated(true);
    } else {
      alert('Invalid password');
    }
  };

  const handleConfigUpdate = async (e) => {
    e.preventDefault();
    setMessage('Updating config...');
    
    try {
      const formData = new FormData();
      formData.append('appName', newName);
      if (logoFile) {
        formData.append('appLogo', logoFile);
      }

      const res = await fetch(`${API_BASE}/api/landing-config`, {
        method: 'POST',
        body: formData
      });
      
      if (res.ok) {
        setMessage('Configuration updated successfully!');
        setLogoFile(null);
        fetchConfig();
      } else {
        setMessage('Failed to update configuration.');
      }
    } catch (err) {
      console.error(err);
      setMessage('Error updating configuration.');
    }
  };

  const handleApkUpload = async (e) => {
    e.preventDefault();
    if (!apkFile) return alert('Please select an APK file first');
    
    setMessage('Uploading APK...');
    try {
      const VPS_URL = import.meta.env.VITE_VPS_URL || 'http://localhost:4000';
      const formData = new FormData();
      formData.append('apk', apkFile);

      const res = await fetch(`${VPS_URL}/upload`, {
        method: 'POST',
        body: formData
      });

      if (res.ok) {
        setMessage('APK uploaded successfully!');
        setApkFile(null);
        e.target.reset();
      } else {
        setMessage('Failed to upload APK.');
      }
    } catch (err) {
      console.error(err);
      setMessage('Error uploading APK.');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="app-container" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center', maxWidth: '400px', width: '100%' }}>
          <h2 style={{ color: 'var(--theme-gold)', marginBottom: '1.5rem' }}>Admin Access</h2>
          <form onSubmit={handleLogin}>
            <input 
              type="password" 
              placeholder="Enter Admin Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--theme-green)', background: 'rgba(0,0,0,0.5)', color: '#fff', marginBottom: '1rem' }}
            />
            <button type="submit" className="download-btn" style={{ width: '100%', justifyContent: 'center' }}>Login</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container" style={{ paddingTop: '2rem' }}>
      <h1 className="hero-title" style={{ fontSize: '2.5rem', textAlign: 'center' }}>Landing Page <span className="flashy-text">Admin</span></h1>
      
      {message && <div style={{ background: 'rgba(0,255,136,0.1)', color: '#00ff88', padding: '1rem', borderRadius: '8px', textAlign: 'center', marginBottom: '2rem', border: '1px solid #00ff88' }}>{message}</div>}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        
        {/* Metrics */}
        <div className="glass-panel tilt-effect" style={{ padding: '1.5rem', textAlign: 'center' }}>
          <h3 style={{ color: 'var(--theme-gold)', marginBottom: '1rem' }}>Total APK Downloads</h3>
          <h2 style={{ fontSize: '4rem', color: '#fff', textShadow: '0 0 10px rgba(255,255,255,0.5)' }}>{config.downloads}</h2>
        </div>

        {/* Config Update Form */}
        <div className="glass-panel tilt-effect" style={{ padding: '1.5rem' }}>
          <h3 style={{ color: 'var(--theme-gold)', marginBottom: '1rem' }}>Site Configuration</h3>
          <form onSubmit={handleConfigUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', color: '#aaa', marginBottom: '0.5rem', fontSize: '0.9rem' }}>App Name</label>
              <input 
                type="text" 
                value={newName} 
                onChange={e => setNewName(e.target.value)}
                style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--theme-green)', background: 'rgba(0,0,0,0.5)', color: '#fff' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', color: '#aaa', marginBottom: '0.5rem', fontSize: '0.9rem' }}>App Logo (Image)</label>
              <input 
                type="file" 
                accept="image/*"
                onChange={e => setLogoFile(e.target.files[0])}
                style={{ color: '#fff' }}
              />
              <p style={{ fontSize: '0.8rem', color: '#666', marginTop: '0.5rem' }}>Current: {config.appLogo}</p>
            </div>
            <button type="submit" className="download-btn" style={{ padding: '0.8rem 1.5rem', fontSize: '1rem', marginTop: '0.5rem' }}>Update Config</button>
          </form>
        </div>

        {/* APK Upload Form */}
        <div className="glass-panel tilt-effect" style={{ padding: '1.5rem' }}>
          <h3 style={{ color: 'var(--theme-gold)', marginBottom: '1rem' }}>Upload Latest APK</h3>
          <form onSubmit={handleApkUpload} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', color: '#aaa', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Select .apk File</label>
              <input 
                type="file" 
                accept=".apk"
                onChange={e => setApkFile(e.target.files[0])}
                style={{ color: '#fff' }}
              />
            </div>
            <button type="submit" className="download-btn" style={{ padding: '0.8rem 1.5rem', fontSize: '1rem', marginTop: '0.5rem', background: 'linear-gradient(180deg, #00ff88, #00b377)' }}>Upload APK</button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Admin;
