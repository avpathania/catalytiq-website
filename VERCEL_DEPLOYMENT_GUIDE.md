# Vercel Deployment Guide for Supabase CMS

This guide will help you deploy your updated CatalytIQ website with the new Supabase CMS to Vercel.

## 🚀 Deployment Options

### Option 1: Update Existing Vercel Project (Recommended)

If your current website is already deployed on Vercel, this is the safest approach:

#### Step 1: Set Up Environment Variables in Vercel

1. **Go to your Vercel Dashboard**
   - Visit [vercel.com/dashboard](https://vercel.com/dashboard)
   - Select your CatalytIQ project

2. **Add Environment Variables**
   - Go to **Settings** → **Environment Variables**
   - Add the following variables:
     ```
     NEXT_PUBLIC_SUPABASE_URL = your_supabase_project_url
     NEXT_PUBLIC_SUPABASE_ANON_KEY = your_supabase_anon_key
     NEXT_PUBLIC_SITE_URL = https://your-domain.com
     ```
   - Set these for **Production**, **Preview**, and **Development** environments

#### Step 2: Deploy the Updated Code

**Method A: Git Push (if connected to GitHub/GitLab/Bitbucket)**
```bash
# Commit your changes
git add .
git commit -m "Add Supabase CMS implementation"
git push origin main
```
Vercel will automatically detect the changes and deploy.

**Method B: Vercel CLI**
```bash
# Install Vercel CLI if you haven't
npm i -g vercel

# Deploy from your project directory
vercel --prod
```

**Method C: Manual Upload**
```bash
# Build the project locally
npm run build

# Upload via Vercel dashboard
# Go to your project → Deployments → "Deploy" button
# Upload the .next folder or entire project
```

### Option 2: Create New Vercel Project

If you want a fresh deployment:

#### Step 1: Prepare Your Repository

```bash
# Make sure your code is in a Git repository
git init
git add .
git commit -m "Initial commit with Supabase CMS"

# Push to GitHub/GitLab/Bitbucket
git remote add origin your-repo-url
git push -u origin main
```

#### Step 2: Create New Vercel Project

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your repository
3. Configure the project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./` (if your Next.js app is in the root)
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

#### Step 3: Add Environment Variables

During setup or after deployment:
```
NEXT_PUBLIC_SUPABASE_URL = your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY = your_supabase_anon_key
NEXT_PUBLIC_SITE_URL = https://your-new-domain.vercel.app
```

## 🔧 Pre-Deployment Checklist

### 1. **Test Locally First**
```bash
# Set up environment variables
cp .env.local.example .env.local
# Add your Supabase credentials to .env.local

# Test the build
npm run build
npm start

# Verify everything works at http://localhost:3000
```

### 2. **Verify Supabase Setup**
- ✅ Database schema created
- ✅ Row Level Security (RLS) policies enabled
- ✅ Sample data added (optional)
- ✅ Environment variables configured

### 3. **Check Build Success**
```bash
# Ensure the build completes without errors
npm run build
```

## 🌐 Domain Configuration

### If Keeping Your Current Domain

1. **Vercel Dashboard** → **Your Project** → **Settings** → **Domains**
2. Your existing domain should remain connected
3. The new deployment will automatically use your custom domain

### If Using a New Domain

1. Add your new domain in Vercel settings
2. Update DNS records to point to Vercel
3. Update `NEXT_PUBLIC_SITE_URL` environment variable

## 📊 Post-Deployment Verification

### 1. **Test Blog Functionality**
- Visit `/blog` - Should load blog listing
- Visit `/it/blog` - Should load Italian blog
- Test search and filtering
- Verify featured posts on homepage

### 2. **Check Console for Errors**
- Open browser developer tools
- Look for any JavaScript errors
- Verify Supabase connection

### 3. **Test Content Management**
- Add a test blog post via Supabase dashboard
- Verify it appears on your website
- Test categories and tags

## 🔄 Rollback Plan (If Needed)

If something goes wrong, you can quickly rollback:

### Option 1: Vercel Dashboard Rollback
1. Go to **Deployments** in your Vercel project
2. Find your previous working deployment
3. Click **"Promote to Production"**

### Option 2: Git Rollback
```bash
# Find the last working commit
git log --oneline

# Rollback to previous commit
git reset --hard <previous-commit-hash>
git push --force-with-lease origin main
```

## 🚨 Troubleshooting

### Common Issues and Solutions

**1. Build Fails with Supabase Errors**
- Check environment variables are set correctly
- Verify Supabase URL and key are valid
- The fallback configuration should handle missing env vars

**2. Blog Pages Show No Content**
- Verify Supabase database has sample data
- Check RLS policies are set up correctly
- Ensure environment variables are in Production environment

**3. 404 Errors on Blog Routes**
- Verify dynamic routes are properly configured
- Check that blog pages are being generated correctly

**4. Environment Variables Not Working**
- Ensure variables start with `NEXT_PUBLIC_` for client-side access
- Redeploy after adding environment variables
- Check variables are set for correct environment (Production/Preview)

## 📞 Support

If you encounter issues:

1. **Check Vercel Function Logs**
   - Go to your project → Functions → View logs

2. **Check Build Logs**
   - Go to Deployments → Click on failed deployment → View build logs

3. **Verify Environment Variables**
   - Settings → Environment Variables → Ensure all are set correctly

## 🎉 Success Checklist

After deployment, verify:
- ✅ Website loads correctly
- ✅ Blog pages work (`/blog` and `/it/blog`)
- ✅ Featured posts appear on homepage
- ✅ Search and filtering work
- ✅ Individual blog posts load
- ✅ No console errors
- ✅ Supabase connection working
- ✅ Content management via Supabase dashboard works

Your CatalytIQ website with Supabase CMS is now live on Vercel! 🚀