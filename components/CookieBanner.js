'use client';
import { useState, useEffect } from 'react';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div style={{position:'fixed',bottom:0,left:0,right:0,background:'rgba(15,15,25,0.97)',backdropFilter:'blur(10px)',borderTop:'1px solid rgba(255,255,255,0.1)',padding:'16px 24px',zIndex:9999,display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:'12px'}}>
      <p style={{color:'#ccc',fontSize:'14px',margin:0,flex:1,minWidth:'250px',lineHeight:'1.5'}}>We gebruiken cookies om je ervaring te verbeteren.</p>
      <div style={{display:'flex',gap:'8px'}}>
        <button onClick={decline} style={{padding:'8px 20px',borderRadius:'8px',border:'1px solid rgba(255,255,255,0.2)',background:'transparent',color:'#999',cursor:'pointer',fontSize:'14px'}}>Weigeren</button>
        <button onClick={accept} style={{padding:'8px 20px',borderRadius:'8px',border:'none',background:'linear-gradient(135deg,#4fd1c5,#38b2ac)',color:'#fff',cursor:'pointer',fontSize:'14px',fontWeight:'600'}}>Accepteren</button>
      </div>
    </div>
  );
}
