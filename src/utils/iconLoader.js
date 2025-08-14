// Load SVG content as text
const iconModules = require.context('../assets/icons/', true, /\.svg$/);

const icons = {};

// Function to fetch SVG content
const loadSVGContent = async () => {
  const promises = iconModules.keys().map(async (path) => {
    const iconName = path.replace('./', '').replace('.svg', '');
    const iconUrl = iconModules(path).default || iconModules(path);
    
    try {
      const response = await fetch(iconUrl);
      const svgContent = await response.text();
      icons[iconName] = svgContent;
    } catch (error) {
      console.error(`Failed to load icon ${iconName}:`, error);
      icons[iconName] = '';
    }
  });
  
  await Promise.all(promises);
};

// Load icons immediately
loadSVGContent();

export default icons;