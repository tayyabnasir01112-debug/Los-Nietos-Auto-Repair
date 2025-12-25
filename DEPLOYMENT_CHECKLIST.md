# Deployment Checklist

Follow these steps to deploy your fully functional Los Nietos Auto Repair site:

## ✅ Pre-Deployment Checklist

### 1. Database Setup
- [ ] Sign up for a free Supabase account at https://supabase.com
- [ ] Create a new project
- [ ] Go to Project Settings > Database
- [ ] Copy your connection string (looks like: `postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres`)
- [ ] Open the SQL Editor in Supabase
- [ ] Run the SQL from `migrations/001_initial_schema.sql`
- [ ] Verify tables were created (you should see `inquiries`, `services`, `testimonials`)

### 2. Netlify Setup
- [ ] Push your code to GitHub (already done: https://github.com/tayyabnasir01112-debug/Los-Nietos-Auto-Repair)
- [ ] Go to your Netlify site dashboard: https://app.netlify.com/projects/los-nietos-auto-repair
- [ ] Navigate to Site settings > Environment variables
- [ ] Add environment variable:
  - Key: `DATABASE_URL`
  - Value: Your PostgreSQL connection string from Supabase
  - Scope: All scopes
- [ ] Save the environment variable

### 3. Verify Configuration
- [ ] Check that `netlify.toml` exists and has correct configuration
- [ ] Verify `package.json` includes `@netlify/functions` dependency
- [ ] Ensure all Netlify Functions are in `netlify/functions/` directory

## 🚀 Deployment Steps

### Option 1: Deploy via CLI (Current Method)
```bash
# Already deployed, but to redeploy:
npm install
npx vite build
netlify deploy --prod --dir=dist/public
```

### Option 2: Connect GitHub for Auto-Deploy (Recommended)
1. Go to Netlify dashboard
2. Site settings > Build & deploy > Continuous Deployment
3. Connect to GitHub repository
4. Build settings:
   - Build command: `npm install && npx vite build`
   - Publish directory: `dist/public`
   - Functions directory: `netlify/functions`
5. Save and deploy

## ✅ Post-Deployment Verification

### Test the Site
- [ ] Visit https://los-nietos-auto-repair.netlify.app
- [ ] Check that the site loads correctly
- [ ] Test on mobile device (especially Safari on iPhone)
- [ ] Verify all sections are visible and working

### Test API Functions
- [ ] Go to `https://los-nietos-auto-repair.netlify.app/.netlify/functions/services`
  - Should return JSON array of services
- [ ] Go to `https://los-nietos-auto-repair.netlify.app/.netlify/functions/testimonials`
  - Should return JSON array of testimonials
- [ ] Submit the contact form
  - Check Netlify Function logs for any errors
  - Verify data appears in your Supabase database

### Check Function Logs
- [ ] Go to Netlify dashboard > Functions > View logs
- [ ] Look for any errors or warnings
- [ ] Verify functions are executing successfully

### Database Verification
- [ ] Go to Supabase dashboard > Table Editor
- [ ] Check that initial seed data appears in `services` and `testimonials` tables
- [ ] Submit a test contact form and verify it appears in `inquiries` table

## 🔧 Troubleshooting

### Functions Not Working
- Check Netlify Function logs for errors
- Verify `DATABASE_URL` environment variable is set correctly
- Ensure database connection string is correct
- Check that database tables exist

### Database Connection Errors
- Verify connection string format is correct
- Check Supabase project is active (not paused)
- Ensure IP allowlist allows connections (Supabase should allow all by default)
- Test connection string locally with `psql` or similar tool

### Frontend Not Loading
- Check build logs in Netlify
- Verify `dist/public` directory exists after build
- Check browser console for errors
- Verify all assets are loading correctly

### Mobile/Safari Issues
- Test on actual device (not just browser dev tools)
- Check viewport meta tag is correct
- Verify CSS prefixes are applied for Safari
- Check for any console errors in Safari

## 📝 Notes

- **Free Tier Limits**:
  - Netlify: 100GB bandwidth/month, 300 build minutes/month (should be more than enough)
  - Supabase: 500MB database, 2GB bandwidth/month (should be sufficient for small business)
  
- **Auto-seeding**: The functions automatically seed initial data on first request if tables are empty

- **Environment Variables**: Must be set in Netlify dashboard, not in code (for security)

## 🎉 Success!

Once all checks pass, your site is fully functional with:
- ✅ Static frontend deployed on Netlify
- ✅ Serverless API functions working
- ✅ Database connected and functional
- ✅ Mobile-responsive design
- ✅ Cross-browser compatibility

