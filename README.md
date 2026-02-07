# RNK Adventures - Production-Ready Tours Website

A modern, dynamic tours and adventure company website built with Next.js 14, Firebase, and Tailwind CSS. Features a fully functional admin dashboard for managing tours and gallery images.

## 🎨 Features

### Frontend
- **Responsive Design**: Beautiful, mobile-first design matching your brand colors
- **Dynamic Hero Slider**: Auto-rotating hero images with smooth transitions
- **Tours Section**: Dynamically loaded from Firebase database
- **Interactive Gallery**: Lightbox gallery with admin-managed photos
- **Testimonials Carousel**: Customer reviews section
- **Contact Form**: Ready for integration with your email service
- **Smooth Animations**: Professional transitions and hover effects

### Admin Dashboard
- **Secure Login**: Firebase Authentication protected
- **Tour Management**: Add, edit, delete tours with image upload
- **Gallery Management**: Bulk image upload with captions
- **Real-time Updates**: Changes reflect immediately on the website
- **Image Storage**: Firebase Storage for all media files

## 🚀 Setup Instructions

### 1. Firebase Setup

1. **Create Firebase Project**
   - Go to [Firebase Console](https://console.firebase.google.com)
   - Click "Add Project"
   - Name it "rnk-adventures"
   - Disable Google Analytics (optional)

2. **Enable Authentication**
   - In Firebase Console, go to Authentication → Sign-in method
   - Enable "Email/Password" provider
   - Go to Users tab → Add user
   - Create admin account: `admin@rnkadventures.com` with a secure password

3. **Create Firestore Database**
   - Go to Firestore Database → Create database
   - Start in **production mode**
   - Choose your region (select closest to your location)
   - Update Firestore Rules:
   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       // Allow public read access to tours and gallery
       match /tours/{document=**} {
         allow read: if true;
         allow write: if request.auth != null;
       }
       match /gallery/{document=**} {
         allow read: if true;
         allow write: if request.auth != null;
       }
     }
   }
   ```

4. **Enable Storage**
   - Go to Storage → Get Started
   - Start in **production mode**
   - Update Storage Rules:
   ```
   rules_version = '2';
   service firebase.storage {
     match /b/{bucket}/o {
       match /tours/{allPaths=**} {
         allow read: if true;
         allow write: if request.auth != null;
       }
       match /gallery/{allPaths=**} {
         allow read: if true;
         allow write: if request.auth != null;
       }
     }
   }
   ```

5. **Get Firebase Config**
   - Go to Project Settings (gear icon) → General
   - Scroll to "Your apps" → Click Web icon (</>)
   - Register app as "RNK Adventures Web"
   - Copy the firebaseConfig object

### 2. Local Development Setup

1. **Clone/Navigate to Project**
   ```bash
   cd rnk-adventures
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   - Copy `.env.local.example` to `.env.local`
   ```bash
   cp .env.local.example .env.local
   ```
   
   - Edit `.env.local` and add your Firebase credentials:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

4. **Add Logo**
   - Place your logo file in `/public/logo.png`

5. **Run Development Server**
   ```bash
   npm run dev
   ```
   - Visit `http://localhost:3000`

### 3. Admin Access

1. Navigate to `http://localhost:3000/admin`
2. Login with the credentials you created in Firebase Authentication
3. Start adding tours and gallery images!

## 📁 Project Structure

```
rnk-adventures/
├── app/
│   ├── admin/
│   │   └── page.js          # Admin dashboard page
│   ├── layout.js            # Root layout
│   ├── page.js              # Home page
│   └── globals.css          # Global styles
├── components/
│   ├── admin/
│   │   ├── AdminDashboard.js
│   │   ├── AdminLogin.js
│   │   ├── GalleryManager.js
│   │   └── TourManager.js
│   ├── ContactSection.js
│   ├── Footer.js
│   ├── GallerySection.js
│   ├── Hero.js
│   ├── Navigation.js
│   ├── Testimonials.js
│   └── TourCard.js
├── lib/
│   └── firebase.js          # Firebase configuration
├── public/
│   └── logo.png            # Your logo
├── .env.local              # Environment variables (create this)
├── .env.local.example      # Environment template
├── next.config.js
├── package.json
├── postcss.config.js
└── tailwind.config.js
```

## 🎨 Customization

### Colors
Brand colors are defined in `tailwind.config.js`:
- **Orange**: `#E89B5C` (Primary CTA buttons, accents)
- **Rust**: `#C4683B` (Hover states)
- **Dark**: `#0A1F1F` (Text, navigation)
- **Teal**: `#1A3A3A` (Secondary elements)
- **Cream**: `#F5F1E8` (Backgrounds)

### Content
- **Hero Slider**: Edit images in `components/Hero.js`
- **Testimonials**: Update in `components/Testimonials.js`
- **Contact Info**: Modify in `components/ContactSection.js`
- **Footer**: Customize in `components/Footer.js`

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Add Environment Variables**
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Add all variables from `.env.local`

4. **Redeploy**
   ```bash
   vercel --prod
   ```

### Alternative: Deploy to Netlify, AWS, etc.

1. Build the project:
   ```bash
   npm run build
   ```

2. The output folder is `.next`

3. Configure your hosting platform to:
   - Build command: `npm run build`
   - Output directory: `.next`
   - Add environment variables

## 📝 Usage Guide

### Adding Tours
1. Login to admin dashboard
2. Click "Manage Tours" tab
3. Click "Add New Tour"
4. Fill in:
   - Tour Title
   - Location
   - Duration (e.g., "7 days")
   - Price (USD)
   - Description
   - Upload image
5. Click "Add Tour"

### Managing Gallery
1. Login to admin dashboard
2. Click "Manage Gallery" tab
3. Select multiple images (bulk upload supported)
4. Add optional caption
5. Click "Upload"

### Editing Content
- **Tours**: Click "Edit" on any tour card
- **Delete**: Click "Delete" (confirmation required)
- **Gallery**: Hover over image → Click "Delete"

## 🔒 Security

- Admin routes protected by Firebase Authentication
- Firestore rules restrict writes to authenticated users
- Storage rules protect against unauthorized uploads
- Environment variables keep credentials secure
- HTTPS enforced in production

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🐛 Troubleshooting

### Images Not Loading
- Check Firebase Storage rules
- Verify image URLs in Firestore
- Add domain to `next.config.js` images.domains

### Admin Can't Login
- Verify user exists in Firebase Authentication
- Check environment variables are set
- Ensure Firebase config is correct

### Tours/Gallery Not Showing
- Check Firestore rules allow public read
- Verify data exists in Firestore collections
- Check browser console for errors

## 📞 Support

For issues or questions:
- Check Firebase Console for errors
- Review browser console (F12)
- Verify all environment variables are set
- Ensure Firebase project has billing enabled (free tier is sufficient)

## 🎯 Next Steps

1. **Contact Form Integration**: Integrate with EmailJS, SendGrid, or Nodemailer
2. **Booking System**: Add tour booking functionality
3. **Payment Gateway**: Integrate Stripe or PayPal
4. **Email Notifications**: Send booking confirmations
5. **Analytics**: Add Google Analytics
6. **SEO**: Add meta tags, sitemap, robots.txt
7. **Blog**: Add blog section for adventure stories

## 📄 License

Private - RNK Adventures © 2024

---

Built with ❤️ using Next.js, Firebase & Tailwind CSS
