# Charlie's Portfolio Website

Personal portfolio website showcasing projects, skills, and journey in web development and AI.

## 🎨 Design

- **Aesthetic:** Aero-influenced design with depth, translucency, and soft glows
- **Inspiration:** Late-2000s optimism (Windows 7 Aero, iOS 4-6) with modern restraint
- **Tech Stack:** React + Vite, Tailwind CSS v4, Lucide React icons

## 🚀 Features

- Responsive single-page design with smooth scrolling
- Glass-effect cards with backdrop blur
- Status indicators showing active development
- Project showcase with version numbers and tech stacks
- Hardware setup display (built for local AI workloads)
- Journey timeline visualization

## 📁 Project Structure

```
portfolio-site/
├── src/
│   ├── components/
│   │   ├── Hero.jsx          # Landing section with name and status
│   │   ├── Projects.jsx      # Project showcase with cards
│   │   ├── About.jsx         # Bio, hardware setup, and journey
│   │   ├── Skills.jsx        # Tech skills categorized by proficiency
│   │   ├── Contact.jsx       # Contact links (email, GitHub, LinkedIn)
│   │   ├── Footer.jsx        # Footer with version info
│   │   └── Navigation.jsx    # Sticky navigation bar
│   ├── CONTENT_DATA.json     # All content in structured format
│   ├── index.css             # Global styles and Tailwind config
│   ├── App.jsx               # Main app component
│   └── main.jsx              # Entry point
├── public/
├── index.html                # HTML template
├── tailwind.config.js        # Tailwind CSS configuration
├── postcss.config.js         # PostCSS configuration
├── vercel.json               # Vercel deployment config
└── package.json
```

## 🛠️ Development

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

The site will be available at `http://localhost:5173/` (or another port if 5173 is in use).

### Build for Production

```bash
npm run build
```

The optimized build will be in the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

## 🌐 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel dashboard
3. Vercel will auto-detect Vite and use the correct settings
4. Deploy!

The `vercel.json` config is already set up.

### Manual Deployment

Build the project and deploy the `dist/` folder to any static hosting service:

- Netlify
- GitHub Pages
- Cloudflare Pages
- AWS S3 + CloudFront

## 📝 Content Updates

All content is centralized in `src/CONTENT_DATA.json`. To update:

1. Edit the JSON file with new project info, skills, or bio updates
2. Update `meta.last_updated` to current date
3. Rebuild and redeploy

No code changes needed for content updates!

## 🎨 Design System

### Colors

- **Aero Base:** `#F8FAFB` - Light background
- **Aero Light:** `#EEF2F5` - Lighter background
- **Aero Blue:** `#4A9EFF` - Primary accent
- **Aero Dark:** `#2A2F3A` - Text color
- **Depth 100-300:** Grey-blue shades for layering

### Components

- **Glass Cards:** `.glass-card` - Translucent cards with backdrop blur
- **Status Badges:** `.status-active`, `.status-experimental`, `.status-exploring`
- **Tech Badges:** `.tech-badge` - Pills for technology tags
- **Buttons:** `.btn-glow` - Buttons with glow effect on hover

### Shadows

- `shadow-aero` - Subtle elevation
- `shadow-aero-md` - Medium elevation (cards)
- `shadow-aero-lg` - High elevation (modals)
- `shadow-glow-blue` - Blue glow effect

## 📦 Dependencies

### Main

- React 18
- Lucide React (icons)

### Dev

- Vite (build tool)
- Tailwind CSS v4
- @tailwindcss/postcss
- PostCSS
- Autoprefixer

## 🔧 Configuration

### Tailwind CSS v4

This project uses Tailwind CSS v4, which has a different configuration approach:

- Custom theme values defined in `@theme` directive in `index.css`
- No separate `tailwind.config.js` needed for theme
- Uses `@import "tailwindcss"` instead of `@tailwind` directives

### Fonts

- **Sans-serif:** Inter (from Google Fonts)
- **Monospace:** JetBrains Mono (from Google Fonts)

## 📄 License

Personal portfolio - all rights reserved.

## 👤 Author

**Charlie**
- Email: charlieg.deburiatte@gmail.com
- GitHub: [@charliegdeburiatte-hub](https://github.com/charliegdeburiatte-hub)
- LinkedIn: [charliedeburiatte-it](https://www.linkedin.com/in/charliedeburiatte-it/)

---

**Portfolio Version:** 2.0
**Last Updated:** 2025-02-11
**Status:** Active development
