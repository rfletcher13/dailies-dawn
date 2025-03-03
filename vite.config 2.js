export default {
    build: {
      outDir: './assets', // Output to Shopify's assets folder
      emptyOutDir: false, // Prevent wiping the assets folder
      rollupOptions: {
        input: {
          main: './src/main.js', // Your JS entry point
          styles: './src/styles.css' // Your CSS entry point with Tailwind
        },
        output: {
          entryFileNames: '[name].js', // Output as main.js
          assetFileNames: '[name].[ext]' // Output as styles.css
        }
      }
    }
  };