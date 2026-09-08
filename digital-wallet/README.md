# PayFlow Digital Wallet

PayFlow is a React-based digital wallet interface for managing a wallet balance, sending and adding money, reviewing transactions, and viewing account notifications.

## Features

- User login and registration
- Wallet balance dashboard
- Send money to another user
- Add money to the wallet
- Transaction history
- Profile page
- Notification center with:
  - Sent and received payment notifications
  - Unread notification count
  - Mark individual notifications as read
  - Mark all notifications as read
  - Read state persisted per user in local storage
- Responsive layout for desktop and mobile screens

## Tech Stack

- React 18
- Vite
- React Router
- Axios
- Lucide React icons

## Prerequisites

- Node.js 18 or later
- npm
- The PayFlow backend running at `http://localhost:8080`

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

3. Open the URL shown by Vite, usually:

   ```text
   http://localhost:5173
   ```

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Create a production build |
| `npm run preview` | Preview the production build locally |

## Application Routes

| Route | Description |
| --- | --- |
| `/login` | Sign in |
| `/register` | Create an account |
| `/` | Wallet dashboard |
| `/send` | Send money |
| `/add-money` | Add money to the wallet |
| `/transactions` | View transaction history |
| `/profile` | View profile information |

## Backend Configuration

API requests are configured in `src/api/api.js` and currently use:

```text
http://localhost:8080/api
```

The authenticated user is read from `localStorage` and its token is attached to API requests. Make sure the backend is running before using authenticated wallet features.

## Project Structure

```text
src/
├── api/              API client configuration
├── components/       Shared UI components
├── pages/            Application pages
├── App.jsx           Authentication, wallet data, and routing
├── App.css           Component styles
└── index.css         Global styles
```

## Production Build

Create a production build with:

```bash
npm run build
```

The generated files are placed in the `dist/` directory.
