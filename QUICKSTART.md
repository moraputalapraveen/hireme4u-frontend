# JobPortal - Quick Start Guide

## 🚀 Run Locally in 3 Steps

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Start Development Server
```bash
npm run dev
```

### Step 3: Open in Browser
Navigate to: `http://localhost:5173`

---

## 📋 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

---

## 🎯 Quick Navigation

### Main Pages
- **Home**: `http://localhost:5173/`
- **All Jobs**: `http://localhost:5173/jobs`
- **Freshers**: `http://localhost:5173/freshers`
- **Post Job**: `http://localhost:5173/admin`

### Legal Pages
- **About**: `http://localhost:5173/about`
- **Contact**: `http://localhost:5173/contact`
- **Privacy**: `http://localhost:5173/privacy`
- **Terms**: `http://localhost:5173/terms`

---

## 🔧 Key Features to Test

1. **Search Jobs** - Use search bar on homepage or jobs page
2. **Filter Jobs** - Try different filters (date, type, experience)
3. **Bookmark Jobs** - Click bookmark icon on job cards
4. **Share Jobs** - Click share button on job details
5. **Post New Job** - Go to /admin and submit the form
6. **Responsive Design** - Resize browser to test mobile view

---

## 📦 What's Included

- ✅ 12 Sample Jobs (IT, Non-IT, Remote, Freshers)
- ✅ Full Search & Filter System
- ✅ Bookmark Functionality (localStorage)
- ✅ Share Jobs Feature
- ✅ Admin Panel to Add Jobs
- ✅ SEO Optimized Pages
- ✅ AdSense Placeholder Ads
- ✅ Mobile Responsive Design
- ✅ All Legal Pages (Privacy, Terms, etc.)

---

## 🎨 Customization Tips

### Change Brand Colors
Edit: `/src/styles/theme.css`

### Edit Mock Jobs
Edit: `/src/app/data/jobs.ts`

### Update Company Info
Edit: `/src/app/pages/About.tsx`

### Change Logo/Name
Edit: `/src/app/components/Navbar.tsx`

---

## 📱 Test Mobile View

Open DevTools (F12) → Toggle device toolbar (Ctrl+Shift+M)

Test these screen sizes:
- Mobile: 375px
- Tablet: 768px
- Desktop: 1024px+

---

## 💡 Pro Tips

1. **Bookmark feature** uses localStorage - try bookmarking jobs and refreshing
2. **Search is real-time** - no need to press enter
3. **Filters work together** - combine multiple filters
4. **URL-based search** - Share `/jobs?search=react` links
5. **Dynamic slugs** - Jobs have SEO-friendly URLs

---

## 🐛 Common Issues

### Port Already in Use?
```bash
# Change port in vite.config.ts or use:
npm run dev -- --port 3000
```

### Build Errors?
```bash
# Clear cache and reinstall
rm -rf node_modules
npm install
```

### Styles Not Loading?
- Clear browser cache (Ctrl+Shift+R)
- Check if Tailwind is configured properly

---

## 🚀 Ready to Deploy?

### Build Production Version
```bash
npm run build
```

### Output Location
`/dist` folder (deploy this to your hosting)

### Recommended Hosting
- Vercel (best for React)
- Netlify
- Cloudflare Pages
- AWS S3 + CloudFront

---

## 📧 Need Help?

Check the full README.md for detailed documentation!

---

**Enjoy building your job portal! 🎉**
