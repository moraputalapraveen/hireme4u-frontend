# JobPortal - Modern Job Portal Website

A comprehensive, production-ready job portal built with React, TypeScript, and Tailwind CSS. Focused on freshers and developers with SEO optimization and AdSense integration.

![JobPortal](https://img.shields.io/badge/React-18.3.1-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.12-teal)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)

## 🎯 Features

### Core Features
- ✅ **Home Page** - Clean landing with hero section, search, and featured jobs
- ✅ **Job Listings** - Browse all jobs with advanced filters
- ✅ **Job Details** - Full job information with apply button
- ✅ **Freshers Section** - Dedicated page for entry-level positions
- ✅ **Search & Filters** - Real-time search with multiple filter options
- ✅ **Admin Panel** - Form to post new jobs
- ✅ **Bookmarks** - Save jobs for later (localStorage)
- ✅ **Share Jobs** - Share via native share or copy link

### Pages
- Home Page (`/`)
- Job Listings (`/jobs`)
- Job Details (`/jobs/:slug`)
- Freshers Jobs (`/freshers`)
- Post Job (`/admin`)
- About Us (`/about`)
- Contact Us (`/contact`)
- Privacy Policy (`/privacy`)
- Terms & Conditions (`/terms`)
- Blog (Coming Soon) (`/blog`)
- Tools (Coming Soon) (`/tools`)

### Technical Features
- 🎨 **Responsive Design** - Mobile-first approach
- 🔍 **SEO Optimized** - Meta tags, Open Graph, Twitter Cards
- 💰 **AdSense Ready** - Placeholder ad slots (banner, sidebar, in-content)
- 🚀 **React Router** - Client-side routing with data mode
- 💾 **State Management** - React Context API
- 🎯 **TypeScript** - Full type safety
- 🎨 **Tailwind CSS** - Modern, utility-first styling
- ⚡ **Performance** - Optimized bundle size
- 📱 **Mobile Friendly** - Fully responsive on all devices

## 📂 Project Structure

```
/src
├── /app
│   ├── App.tsx                 # Main app component
│   ├── routes.tsx              # Route configuration
│   ├── /components
│   │   ├── Navbar.tsx          # Navigation bar
│   │   ├── Footer.tsx          # Footer
│   │   ├── JobCard.tsx         # Job card component
│   │   ├── JobFilters.tsx      # Filter sidebar
│   │   ├── SearchBar.tsx       # Search input
│   │   ├── AdSenseSlot.tsx     # Ad placeholder
│   │   └── SEO.tsx             # SEO meta tags
│   ├── /pages
│   │   ├── Home.tsx            # Homepage
│   │   ├── Jobs.tsx            # Job listings
│   │   ├── JobDetail.tsx       # Job details
│   │   ├── Freshers.tsx        # Freshers page
│   │   ├── Admin.tsx           # Post job form
│   │   ├── About.tsx           # About us
│   │   ├── Contact.tsx         # Contact page
│   │   ├── Privacy.tsx         # Privacy policy
│   │   ├── Terms.tsx           # Terms & conditions
│   │   ├── Blog.tsx            # Blog (placeholder)
│   │   ├── Tools.tsx           # Tools (placeholder)
│   │   ├── NotFound.tsx        # 404 page
│   │   └── Layout.tsx          # Layout wrapper
│   ├── /context
│   │   └── JobContext.tsx      # Job state management
│   └── /data
│       └── jobs.ts             # Mock job data
└── /styles
    ├── index.css               # Global styles
    ├── tailwind.css            # Tailwind directives
    └── theme.css               # Theme variables
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or pnpm

### Installation

1. **Clone or download the project**

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

The app will be available at `http://localhost:5173`

## 💼 Usage Guide

### For Job Seekers

1. **Search Jobs** - Use the search bar on homepage or jobs page
2. **Filter Jobs** - Apply filters by date, type, experience, category
3. **View Details** - Click "View Details" on any job card
4. **Bookmark Jobs** - Save jobs for later viewing
5. **Share Jobs** - Share jobs via social media or copy link
6. **Apply** - Click "Apply Now" to visit company application page

### For Employers/Admin

1. Navigate to `/admin` or click "Post Job" button
2. Fill in the job posting form:
   - Job title, company, location
   - Description and requirements
   - Category, job type, experience level
   - Salary range (optional)
   - Application link
3. Click "Post Job" to publish

### Mock Data

The app comes with 12 sample jobs. You can:
- Add new jobs via the admin form
- Edit `/src/app/data/jobs.ts` to modify mock data
- Jobs are stored in React Context (you can persist to backend later)

## 🎨 Customization

### Colors & Branding

Edit `/src/styles/theme.css` to customize:
```css
:root {
  --primary: #2563eb;  /* Blue */
  --secondary: #10b981; /* Green */
  /* ... more variables */
}
```

### Logo

Replace in `/src/app/components/Navbar.tsx`:
```tsx
<Briefcase className="w-8 h-8 text-blue-600" />
<span className="font-bold text-xl">JobPortal</span>
```

### SEO

Update meta tags in each page component:
```tsx
<SEO
  title="Your Page Title"
  description="Your page description"
  keywords="your, keywords"
/>
```

## 💰 Google AdSense Integration

### Current Setup
The app includes AdSense placeholder components showing where ads should be placed:
- Banner ads (below navbar)
- Sidebar ads (job listing page)
- In-content ads (inside job details)

### To Add Real AdSense

1. **Get AdSense approval** from Google
2. **Replace AdSenseSlot component** in `/src/app/components/AdSenseSlot.tsx`:

```tsx
export function AdSenseSlot({ variant }: AdSenseSlotProps) {
  return (
    <ins 
      className="adsbygoogle"
      style={{ display: 'block' }}
      data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
      data-ad-slot="XXXXXXXXXX"
      data-ad-format="auto"
    />
  );
}
```

3. **Add AdSense script** to your `index.html`:
```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
     crossorigin="anonymous"></script>
```

## 📱 Pages Overview

### Home Page (`/`)
- Hero section with search
- Quick stats
- Job categories
- Latest job listings
- Why choose us section
- Call to action

### Jobs Page (`/jobs`)
- Search bar
- Filter sidebar (date, type, experience, category)
- Job listings with pagination-ready layout
- AdSense integration

### Job Detail Page (`/jobs/:slug`)
- Full job description
- Requirements list
- Company information
- Job overview sidebar
- Apply button
- Bookmark and share options
- SEO optimized with dynamic meta tags

### Freshers Page (`/freshers`)
- Filtered view of fresher-friendly jobs
- Tips for freshers section
- Search functionality

### Admin Page (`/admin`)
- Job posting form
- Form validation
- Dynamic slug generation
- Success notifications

### Legal Pages
- About Us - Company information
- Contact Us - Contact form with map placeholder
- Privacy Policy - Complete privacy policy
- Terms & Conditions - Legal terms

## 🔧 Backend Integration (Optional)

To connect to a real backend:

### 1. Update Job Context

Replace localStorage with API calls in `/src/app/context/JobContext.tsx`:

```tsx
// Fetch jobs from API
useEffect(() => {
  fetch('/api/jobs')
    .then(res => res.json())
    .then(data => setJobs(data));
}, []);

// Add job via API
const addJob = async (job: Job) => {
  const response = await fetch('/api/jobs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(job)
  });
  const newJob = await response.json();
  setJobs(prev => [newJob, ...prev]);
};
```

### 2. Suggested Backend Stack
- **Node.js + Express** - REST API
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication (for admin)

### 3. API Endpoints Needed
```
GET    /api/jobs              # Get all jobs
GET    /api/jobs/:id          # Get single job
POST   /api/jobs              # Create job (admin)
PUT    /api/jobs/:id          # Update job (admin)
DELETE /api/jobs/:id          # Delete job (admin)
GET    /api/jobs/search       # Search jobs
```

## 🌐 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Connect to Vercel
3. Deploy automatically

### Netlify

1. Build: `npm run build`
2. Publish directory: `dist`
3. Deploy

### Other Platforms
- AWS S3 + CloudFront
- GitHub Pages
- Cloudflare Pages

## 📊 SEO Best Practices

The app includes:
- ✅ Dynamic page titles
- ✅ Meta descriptions
- ✅ Open Graph tags
- ✅ Twitter Card tags
- ✅ Semantic HTML
- ✅ Clean URLs with slugs
- ✅ Mobile responsive
- ✅ Fast loading times

### Further SEO Improvements
1. Add sitemap.xml
2. Add robots.txt
3. Implement structured data (JSON-LD)
4. Add canonical URLs
5. Optimize images with lazy loading
6. Implement server-side rendering (SSR)

## 🐛 Troubleshooting

### Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Routing Issues
- Ensure your hosting supports client-side routing
- Add `_redirects` file for Netlify: `/* /index.html 200`
- Add `vercel.json` for Vercel

## 📝 License

This project is open source and available for personal and commercial use.

## 🤝 Contributing

Feel free to:
- Report bugs
- Suggest features
- Submit pull requests
- Improve documentation

## 📧 Support

For questions or support:
- Email: contact@jobportal.com
- GitHub Issues: [Create an issue]

---

**Built with ❤️ for job seekers and developers**

### Key Technologies
- React 18.3.1
- TypeScript
- Tailwind CSS 4.1.12
- React Router 7.13.0
- Lucide Icons
- Vite

---

## 🎯 Roadmap

- [ ] User authentication
- [ ] Email notifications
- [ ] Advanced search with autocomplete
- [ ] Company profiles
- [ ] Resume upload
- [ ] Job alerts
- [ ] Application tracking
- [ ] Analytics dashboard
- [ ] Multi-language support
- [ ] Dark mode

---

**Ready to launch your job portal? Start now! 🚀**
