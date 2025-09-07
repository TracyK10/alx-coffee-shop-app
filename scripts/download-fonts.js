const fs = require('fs');
const path = require('path');
const https = require('https');
const { execSync } = require('child_process');

// Ensure the fonts directory exists
const fontsDir = path.join(__dirname, '../assets/fonts');
if (!fs.existsSync(fontsDir)) {
  fs.mkdirSync(fontsDir, { recursive: true });
}

// Font files to download
const fontFiles = [
  {
    url: 'https://github.com/sora-foundation/sora-fonts/raw/main/fonts/otf/Sora-Regular.otf',
    filename: 'Sora-Regular.ttf'
  },
  {
    url: 'https://github.com/sora-foundation/sora-fonts/raw/main/fonts/otf/Sora-SemiBold.otf',
    filename: 'Sora-SemiBold.ttf'
  },
  {
    url: 'https://github.com/sora-foundation/sora-fonts/raw/main/fonts/otf/Sora-Bold.otf',
    filename: 'Sora-Bold.ttf'
  }
];

// Download function
function downloadFile(url, destination) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destination);
    
    https.get(url, response => {
      response.pipe(file);
      
      file.on('finish', () => {
        file.close(resolve);
      });
      
    }).on('error', error => {
      fs.unlink(destination, () => {});
      reject(error);
    });
  });
}

// Download all font files
async function downloadFonts() {
  console.log('Downloading Sora font files...');
  
  try {
    for (const font of fontFiles) {
      const destination = path.join(fontsDir, font.filename);
      
      // Skip if file already exists
      if (fs.existsSync(destination)) {
        console.log(`✓ ${font.filename} already exists`);
        continue;
      }
      
      console.log(`Downloading ${font.filename}...`);
      await downloadFile(font.url, destination);
      console.log(`✓ Downloaded ${font.filename}`);
    }
    
    console.log('\nAll font files downloaded successfully!');
    
    // Link the font files in the native projects
    console.log('\nLinking fonts...');
    try {
      execSync('npx expo install expo-font');
      execSync('npx expo install expo-splash-screen');
      console.log('✓ Fonts linked successfully!');
    } catch (error) {
      console.warn('⚠ Could not automatically link fonts. You may need to run these commands manually:');
      console.warn('npx expo install expo-font expo-splash-screen');
    }
    
  } catch (error) {
    console.error('Error downloading fonts:', error);
    process.exit(1);
  }
}

// Run the download
downloadFonts();
