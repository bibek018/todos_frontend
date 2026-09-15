# ✅ Todos App

> A modern, authenticated todo dashboard built with Next.js, TypeScript, and a JWT-powered API.

This web application helps users create, update, organize, and complete daily tasks from a clean personal workspace. It includes account authentication, protected routes, automatic access-token refresh, profile settings, and light/dark theme support.

## ✨ Features

- 🔐 Register and log in with JWT authentication
- 🛡️ Protected dashboard and settings routes
- 🔄 Automatic access-token refresh on expired sessions
- 📝 Create, edit, complete, and delete todos
- 📊 View tasks from a focused dashboard
- ⚙️ Manage profile and password settings
- 🌓 Light and dark theme support
- 🔔 Toast notifications for important actions
- 📱 Responsive interface for desktop and mobile

## 🧰 Tech Stack

- **Framework:** Next.js 16 with App Router
- **Language:** TypeScript
- **UI:** React 19, Tailwind CSS 4, shadcn/ui, Base UI
- **Icons:** Lucide React and React Icons
- **Networking:** Axios with automatic retry and refresh handling
- **Authentication:** JWT access tokens with refresh-token cookies
- **Quality:** ESLint

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- npm, pnpm, yarn, or Bun
- A running backend API that supports the authentication and todo endpoints

### Installation

```bash
git clone <your-repository-url>
cd jwt-project-frontend
npm install
```

### Environment variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Set `NEXT_PUBLIC_API_URL` to the base URL of your backend API. The frontend sends credentials with requests, so the API must be configured to allow the frontend origin and credentials.

### Run the app

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📜 Available Scripts

| Command         | Description                  |
| --------------- | ---------------------------- |
| `npm run dev`   | Start the development server |
| `npm run build` | Create a production build    |
| `npm run start` | Start the production server  |
| `npm run lint`  | Run ESLint                   |

## 🗂️ Project Structure

```text
jwt-project-frontend/
├── app/
│   ├── (auth)/
│   │   ├── login/page.tsx       # Login page
│   │   └── register/page.tsx    # Registration page
│   ├── (main)/
│   │   ├── page.tsx             # Main landing page
│   │   ├── dashboard/page.tsx   # Authenticated todo dashboard
│   │   ├── settings/page.tsx    # User settings page
│   │   ├── Header.tsx           # Main navigation
│   │   └── layout.tsx           # Main route layout
│   ├── globals.css              # Global styles and theme tokens
│   ├── layout.tsx               # Root layout and providers
│   └── page.tsx                 # Landing page
├── components/
│   ├── auth/                    # Login and registration components
│   ├── settingscomp/            # Profile, password, and logout controls
│   ├── todo/                    # Todo creation, display, and dialogs
│   ├── ui/                      # Reusable UI primitives
│   └── utils/                   # Shared UI utilities
├── context/                     # Authentication context definition
├── lib/
│   ├── app.ts                   # Axios API client and token refresh logic
│   ├── Token.ts                 # In-memory access-token helpers
│   └── utils.ts                 # Shared utilities
├── providers/                   # Auth and theme providers
├── public/                      # Static assets
├── types/                       # Shared TypeScript types
├── next.config.ts
├── package.json
└── tsconfig.json
```

## 🔒 Authentication Flow

1. The user signs in or registers through the auth pages.
2. The API returns an access token and sets a refresh-token cookie.
3. Requests include the access token in the `Authorization` header.
4. A `401` response triggers a refresh request and retries the original request.
5. If refreshing fails, the local token is cleared and the request is rejected.

## 🧪 Before Opening a Pull Request

```bash
npm run lint
npm run build
```

Check authentication, route protection, todo CRUD actions, settings updates, and both color themes in the browser.

## 📄 License

This project is private and intended for learning and development purposes.
