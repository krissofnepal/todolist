# 📝 TODO List App

A modern, responsive task management web application built with React and Vite. Perfect for organizing your daily tasks with a clean, intuitive interface.

## ✨ Features

- ✅ **Add Tasks** - Create new tasks with ease
- ✎ **Edit Tasks** - Modify existing tasks
- 🗑 **Delete Tasks** - Remove tasks you no longer need
- ✓ **Mark Complete** - Check off completed tasks
- 🔍 **Filter Tasks** - View all, active, or completed tasks
- 💾 **Local Storage** - Tasks persist automatically in your browser
- 📱 **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- 🎨 **Modern UI** - Beautiful gradient design with smooth animations
- ⚡ **Fast Performance** - Built with Vite for instant HMR and fast builds

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone or download this project
2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and visit `http://localhost:3000`

## 📦 Available Scripts

- `npm run dev` - Start the development server with hot reload
- `npm run build` - Build for production (creates `dist` folder)
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check code quality

## 🌐 Deployment

This app can be deployed to various platforms. Here are the most popular options:

### **Vercel (Recommended - Easiest)**

1. Push your code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Click "New Project" and import your repository
4. Vercel auto-detects Vite and deploys automatically
5. Get a live URL instantly

### **Netlify**

1. Push your code to GitHub
2. Visit [netlify.com](https://netlify.com)
3. Click "Add new site" and select "Import an existing project"
4. Connect your GitHub account and select the repository
5. Build command: `npm run build`
6. Publish directory: `dist`

### **GitHub Pages**

1. Update `vite.config.js` to add base path:

```javascript
export default defineConfig({
  base: "/repository-name/",
  // ...existing code...
});
```

2. Add this to `package.json` scripts:

```json
"deploy": "npm run build && gh-pages -d dist"
```

3. Run: `npm run deploy`

### **Docker Deployment**

Create a `Dockerfile`:

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

Build and run:

```bash
docker build -t todolist-app .
docker run -p 3000:3000 todolist-app
```

### **Traditional Hosting (cPanel, etc.)**

1. Run: `npm run build`
2. Upload the `dist` folder contents to your hosting provider
3. Ensure your hosting supports static site serving

## 🏗 Project Structure

```
todolist/
├── src/
│   ├── App.jsx          # Main app component
│   ├── App.css          # App styles
│   ├── index.css        # Global styles
│   ├── main.jsx         # React entry point
│   └── assets/          # Static assets
├── public/              # Public assets
├── vite.config.js       # Vite configuration
├── package.json         # Dependencies and scripts
└── index.html           # HTML entry point
```

## 🎯 How to Use

1. **Add a Task**: Type in the input field and click "Add" or press Enter
2. **Mark Complete**: Click the checkbox next to a task
3. **Edit a Task**: Click the edit button (✎) and modify the text
4. **Delete a Task**: Click the delete button (🗑)
5. **Filter Tasks**: Use the filter buttons to view All, Active, or Completed tasks

## 💾 Data Storage
