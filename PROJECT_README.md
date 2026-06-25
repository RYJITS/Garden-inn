
# Garden Inn - Project Documentation

This document contains the critical configuration files and setup instructions for the Garden Inn application. Use this as a reference to restore the project environment if needed.

## 1. Getting Started

### Prerequisites
- Node.js (Latest LTS version recommended)
- npm (Node Package Manager)

### Installation
Open your terminal in the project folder and run:
```bash
npm install
```

### Running the Development Server
```bash
npm run dev
```

### Building for Production
```bash
npm run build
```

---

## 2. Critical Configuration Files

If you encounter `EJSONPARSE` or `TS2688` errors, ensure the files below contain exactly this code.

### `package.json`
*Fixes JSON syntax errors and defines dependencies.*

```json
{
  "name": "garden-inn-app",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.66",
    "@types/react-dom": "^18.2.22",
    "@types/node": "^20.12.0",
    "@vitejs/plugin-react": "^4.2.1",
    "typescript": "^5.2.2",
    "vite": "^5.2.0"
  }
}
```

### `vite.config.ts`
*Required for Vite to process React code.*

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})
```

### `tsconfig.json`
*Configures TypeScript and fixes type definition errors for Node.*

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    
    /* Types */
    "types": ["node"]
  },
  "include": ["**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
```

---

## 3. Cache Busting (Image Updates)

If you replace an image with a new file of the same name but the website still shows the old one, update the version number in this file.

**File:** `src/constants/version.ts`

```typescript
// Change this number to force all images to reload
export const APP_VERSION = '1'; 
```

---

## 4. Project Structure Overview

*   **`src/components/`**: Reusable UI parts (Header, Footer, RoomCard...).
*   **`src/pages/`**: Main pages (Home, Rooms, Contact...).
*   **`src/constants/`**: Static data (prices, texts structure, icons, version).
*   **`src/locales/`**: Translation files (`en.json`, `fr.json`).
*   **`src/contexts/`**: React Context for global state (Localization).

## 5. Theme Colors

*   **Sand (Light)**: `#FDFBF7` (Backgrounds)
*   **Sand (Medium)**: `#F2EFE9` (Cards, Menus)
*   **Sand (Dark/Bisque)**: `#E8E4DC` (Header, Bottom Nav)
*   **Green (Emerald)**: `text-emerald-800` (Headings), `text-emerald-600` (Accents)
*   **Orange (Action)**: `#E88A45` (Buttons, Borders, Focus rings)
