# IP. Mixing Digital Inspection

Abnormal Process Program - Digital Inspection Management System

Built with **Next.js 15**, **React 19**, **TypeScript**, and **Tailwind CSS 4**.

---

## 🚀 Deployment to Vercel

### Option 1: Deploy via Vercel CLI

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Navigate to project folder:
```bash
cd ip-mixing-inspection
```

3. Install dependencies:
```bash
pnpm install
```

4. Deploy:
```bash
vercel
```

### Option 2: Deploy via GitHub

1. Push this folder to a GitHub repository
2. Go to [vercel.com](https://vercel.com)
3. Click **New Project**
4. Import your GitHub repository
5. Vercel will auto-detect **Next.js** and deploy automatically

### Option 3: Deploy via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click **New Project**
3. Upload this folder directly
4. Vercel will handle the rest

---

## 🔧 Local Development

```bash
# Install dependencies
pnpm install

# Start development server (with Turbopack)
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Lint
pnpm lint
```

> **Note:** This project uses `pnpm` as the package manager. You can also use `npm install` / `npm run dev` etc. if preferred.

---

## 📱 Features

- ✅ New Inspection with form validation
- ✅ Status workflow: Open → In Progress → Closed
- ✅ Priority levels (High / Medium / Low)
- ✅ 5M Root Cause Analysis
- ✅ Photo evidence upload
- ✅ Export to Excel
- ✅ Analytics Dashboard
- ✅ History with detail view
- ✅ Responsive design (Mobile / Tablet / Desktop)
- ✅ LocalStorage persistence

---

## 📂 Project Structure

```
ip-mixing-inspection/
├── app/                  # Next.js App Router pages & layouts
├── components/           # Reusable React components
├── public/               # Static assets
├── .gitignore
├── next.config.ts
├── package.json
├── pnpm-lock.yaml
├── postcss.config.mjs
├── tailwind.config.ts
├── tsconfig.json
└── vercel.json
```

---

## 📝 Status Flow

```
NEW INSPECTION
      │
      ▼
┌─────────────┐     ┌─────────────┐
│  🔴 OPEN    │ or  │  🟡 PENDING │
│ High/Critical│     │  Medium/Low │
└──────┬──────┘     └──────┬──────┘
       │                    │
       └────────┬───────────┘
                │
                ▼ 🔧 Start Work
        ┌───────────────┐
        │  🔵 IN        │
        │   PROGRESS    │
        └───────┬───────┘
                │
                ▼ ✅ Mark Complete
        ┌───────────────┐
        │  🟢 CLOSED    │
        └───────────────┘
```

---

## 📊 Ticket ID Format

`Mix-DD/MM/YY-XXX`

Example: `Mix-10/02/25-042`

---

Built with Next.js ⚡ & React ⚛️
