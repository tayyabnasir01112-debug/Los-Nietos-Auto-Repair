# Los Nietos Auto Repair - Modern Portfolio Website

A stunning, ultra-modern, fully responsive single-page website for Los Nietos Auto Repair in Santa Fe Springs, CA.

## Features

- 🎨 Modern, premium design with dark blue/gray theme and red accents
- 📱 Fully responsive and optimized for all devices (including Safari on iPhone)
- ⚡ Fast loading with optimized assets
- 🎯 Interactive service calculator
- 💬 Customer testimonials carousel
- 📝 Contact form with backend integration
- 🚀 Deployed on Netlify with serverless functions
- 💾 PostgreSQL database (free tier with Supabase/Neon)

## Tech Stack

- **Frontend**: React, TypeScript, Vite, Tailwind CSS
- **Backend**: Netlify Functions (serverless)
- **Database**: PostgreSQL (via Supabase/Neon)
- **Styling**: Tailwind CSS with custom components
- **Animations**: Framer Motion

## Quick Start

### Prerequisites

- Node.js 20+ 
- PostgreSQL database (free tier from Supabase or Neon)
- Netlify account (free tier)

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/tayyabnasir01112-debug/Los-Nietos-Auto-Repair.git
   cd Los-Nietos-Auto-Repair
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up the database**
   - See [SETUP_DATABASE.md](./SETUP_DATABASE.md) for detailed instructions
   - Create a free PostgreSQL database on Supabase or Neon
   - Run the SQL migration: `migrations/001_initial_schema.sql`

4. **Configure environment variables in Netlify**
   - Go to your Netlify site dashboard
   - Navigate to Site settings > Environment variables
   - Add `DATABASE_URL` with your PostgreSQL connection string

5. **Deploy to Netlify**
   ```bash
   netlify deploy --prod
   ```

   Or connect your GitHub repository to Netlify for automatic deployments.

## Local Development

1. **Set up environment variables**
   ```bash
   export DATABASE_URL="your-postgres-connection-string"
   ```

2. **Run database migrations** (if using Drizzle)
   ```bash
   npm run db:push
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

   The site will be available at `http://localhost:5000`

## Database Setup

See [SETUP_DATABASE.md](./SETUP_DATABASE.md) for detailed database setup instructions.

### Quick Database Setup (Supabase)

1. Sign up at [supabase.com](https://supabase.com)
2. Create a new project
3. Go to Project Settings > Database
4. Copy the connection string
5. Run the SQL from `migrations/001_initial_schema.sql` in the SQL Editor
6. Add `DATABASE_URL` to Netlify environment variables

## Project Structure

```
├── client/              # Frontend React application
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── hooks/       # Custom React hooks
│   │   ├── pages/       # Page components
│   │   └── lib/         # Utilities
│   └── index.html
├── netlify/
│   └── functions/       # Netlify serverless functions
│       ├── contact.ts   # Contact form handler
│       ├── services.ts  # Services API
│       └── testimonials.ts # Testimonials API
├── server/              # Express server (for local dev)
├── shared/              # Shared types and utilities
└── migrations/          # Database migrations

```

## Browser Compatibility

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest, including iOS)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Optimized images with lazy loading
- Code splitting and tree shaking
- Minimal bundle size
- Fast page load times

## License

MIT

## Support

For issues or questions, please open an issue on GitHub.

