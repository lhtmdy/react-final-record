// import icons from '../utils/iconLoader';
import icons from '../utils/iconLoader';
import '../components/style/AppIcon.css';
import { useState, useEffect } from 'react';

const AppIcon = ({ name = '' }) => {
  const [iconContent, setIconContent] = useState('');
  
  useEffect(() => {
    const loadIcon = async () => {
      if (name && icons[name]) {
        setIconContent(icons[name]);
      } else if (name) {
        // Try to load icon if not yet available
        const iconUrl = icons[name];
        if (iconUrl && iconUrl.includes('/static/media/')) {
          try {
            const response = await fetch(iconUrl);
            const svgContent = await response.text();
            setIconContent(svgContent);
          } catch (error) {
            console.error(`[app-icons] Failed to load icon '${name}':`, error);
          }
        } else {
          console.error(`[app-icons] Icon '${name}' doesn't exist in 'assets/icons'`);
        }
      }
    };
    
    loadIcon();
  }, [name]);

  return (
    <span 
      className="i flex" 
      dangerouslySetInnerHTML={{ __html: iconContent }}
    />
  );
};

export default AppIcon;