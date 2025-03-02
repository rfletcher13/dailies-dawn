PRODUCT ROADMAP: JAVVY COFFEE PRODUCT PAGE WITH SKIO SUBSCRIPTIONS
Objective
Recreate the Javvy Coffee product page within a Shopify Dawn theme, enabling customers to:
Select a number of coffee items.

Choose flavors equal to the selected number of items.

Opt for a subscription (with savings) or a one-time purchase.

Add their selections to the cart.
This will leverage the Skio build-a-box API for product options and selectors, styled to match the original Javvy Coffee product page, with modern tooling (Tailwind CSS, Vite, npm-run-all) integrated into the existing Dawn theme repository.

Tech Stack
Shopify: Platform for the online store.

Liquid: Templating language for dynamic content.

JavaScript: For interactivity, including Skio API integration.

HTML: Core markup for the theme structure.

Skio Subscriptions: Integration for subscription and build-a-box functionality (code.skio.com).

Tailwind CSS: Utility-first CSS framework for styling.

Vite: Build tool for bundling and optimizing assets.

npm-run-all: Tool to run multiple npm scripts in parallel.

Directory Structure
The project builds on Shopify’s standard structure within the existing Dawn theme repository:
assets/: Compiled CSS and JS files (e.g., styles.css, main.js).

config/: Configuration files (e.g., settings_schema.json).

layout/: Main layout file (theme.liquid).

sections/: Reusable sections (possibly a custom build-a-box section).

snippets/: Smaller code snippets for reuse.

templates/: Product template (product.liquid or a custom product.build-a-box.liquid).

src/: Source files for CSS and JS (e.g., styles.css, main.js), processed by Vite.

Project Phases and Timeline
The project is divided into five phases, streamlined to focus on the product page. Assuming a focused scope, the timeline is estimated at 6-8 weeks, adjustable based on complexity and team resources.
Phase 1: Initial Setup (1 Week)
Objective: Establish the development environment with modern tooling on the existing Dawn theme.
Tasks:
Install Shopify CLI for theme management (if not already set up).

Install dependencies via npm:
vite, tailwindcss, postcss, autoprefixer, npm-run-all.

Set up Tailwind CSS:
Create tailwind.config.js and configure it for the theme.

Add a src/styles.css file with Tailwind imports (@tailwind base;, @tailwind components;, @tailwind utilities;).

Configure Vite:
Create vite.config.js to build from src/ to assets/:
javascript

export default {
  build: {
    outDir: '../assets',
    emptyOutDir: false,
    rollupOptions: {
      input: {
        main: './src/main.js',
        styles: './src/styles.css'
      },
      output: {
        entryFileNames: '[name].js',
        assetFileNames: '[name].[ext]'
      }
    }
  }
};

Update package.json with scripts:
json

{
  "scripts": {
    "dev": "npm-run-all --parallel vite shopify",
    "vite": "vite build --watch",
    "shopify": "shopify theme dev",
    "build": "vite build"
  }
}

Verify the Dawn theme structure and ensure no conflicts with existing files.
Deliverable: A working development environment with Tailwind CSS and Vite integrated into the Dawn theme.

Phase 2: Theme Styling with CSS (2 Weeks)
Objective: Style the product page to match the original Javvy Coffee design, focusing on the build-a-box feature.
Tasks:
Analyze the Javvy Coffee product page design (colors, typography, layout, especially the build-a-box section).

Use Tailwind CSS to style:
Number of items selector (e.g., buttons or dropdown).

Flavor selection UI (e.g., dropdowns or checkboxes, dynamically shown).

Subscription vs. one-time purchase toggle or radio buttons.

Product page layout (images, descriptions, add-to-cart button).

Reference compiled assets in theme.liquid:
liquid

{{ 'styles.css' | asset_url | stylesheet_tag }}
{{ 'main.js' | asset_url | script_tag }}

Adjust styles based on Skio API-provided components (if any).
Deliverable: A styled product page visually aligned with Javvy Coffee’s original design.

Phase 3: Functionality Implementation (2-3 Weeks)
Objective: Build the build-a-box feature using the Skio API within the Dawn theme.
Tasks:
Modify templates/product.liquid (or create product.build-a-box.liquid) to include the build-a-box UI.

Implement JavaScript in src/main.js:
Fetch available flavors and options from the Skio build-a-box API.

Create UI for:
Selecting the number of items (e.g., dropdown or buttons).

Dynamically displaying flavor selectors based on the number chosen (e.g., if 3 items, show 3 flavor dropdowns).

Choosing subscription or one-time purchase (e.g., radio buttons).

On "Add to Cart":
Collect selections (items, flavors, subscription choice).

Send data to the Skio API to create the cart item (subscription or one-time).

Add the returned product/variant to the Shopify cart.

Ensure cart integration:
Validate that Skio selections sync with Shopify’s cart system.

Replicate any observed interactivity from the original site specific to the product page.
Deliverable: A functional product page with build-a-box selections and cart integration via Skio.

Phase 4: User Experience Enhancement (1 Week)
Objective: Enhance interactivity and ensure responsiveness.
Tasks:
Add JavaScript for dynamic updates:
Update flavor selectors instantly when the item number changes.

Include validation (e.g., must select exactly the number of flavors matching items).

Add subtle animations (e.g., fade-in for flavor selectors) using CSS or JS.

Ensure responsiveness:
Test and adjust Tailwind classes for mobile, tablet, and desktop layouts.
Deliverable: A polished, responsive product page with smooth interactions.

Phase 5: Testing and Optimization (1 Week)
Objective: Verify functionality and optimize performance.
Tasks:
Test scenarios:
Different item numbers and flavor combinations.

Subscription vs. one-time purchase options.

Cart and checkout flow with Skio integration.

Cross-browser and device testing (Chrome, Safari, mobile).

Optimize:
Ensure Vite minifies CSS/JS outputs.

Compress any custom images used.

Validate Skio subscriptions setup and one-time purchase handling.
Deliverable: A fully tested and optimized product page ready for deployment.

Key Milestones
Setup Complete: Development environment with Tailwind and Vite ready (Week 1).

Styling Done: Product page matches Javvy Coffee design (Week 3).

Functionality Live: Build-a-box feature operational with Skio (Week 5-6).

UX Enhanced: Responsive and interactive elements finalized (Week 6-7).

Testing Complete: Product page deployed and verified (Week 7-8).

Resources Required
Development Team:
Frontend Developer: Skilled in Shopify Liquid, JavaScript, Tailwind CSS, and API integration.

Tools and Access:
Shopify CLI: For theme development.

Access to Javvy Coffee site: For design reference.

Skio Documentation: For build-a-box API details (code.skio.com).

Conclusion
This adjusted roadmap focuses on recreating the Javvy Coffee product page with Skio subscriptions, streamlining the original 12-week plan into a 6-8 week timeline by targeting only the product page. It integrates the Skio build-a-box API for dynamic selections, uses Tailwind CSS and Vite for efficient styling and building, and ensures a user-friendly experience matching the original design. Regular progress checks against milestones will keep the project on track for a successful launch.

