# 🚀 Quick Start Guide

## Get Running in 5 Minutes!

### Step 1: Firebase Setup (2 minutes)

1. Go to https://console.firebase.google.com
2. Click **"Add Project"** → Name it → Disable Analytics
3. **Enable Authentication:**
   - Authentication → Sign-in method → Enable "Email/Password"
   - Users → Add user → `admin@rnkadventures.com` + your password
4. **Create Firestore Database:**
   - Firestore Database → Create → Production mode → Choose region
5. **Enable Storage:**
   - Storage → Get Started → Production mode
6. **Get Config:**
   - Project Settings (⚙️) → General → Your apps → Web (</>)
   - Copy the config values

### Step 2: Local Setup (2 minutes)

```bash
# Already in your project, so just:
npm install

# Create environment file
cp .env.local.example .env.local

# Edit .env.local and paste your Firebase config
nano .env.local  # or use your editor

# Run the app!
npm run dev
```

### Step 3: First Login (1 minute)

1. Open http://localhost:3000
2. Click **"Admin"** in navigation
3. Login with admin@rnkadventures.com
4. Add your first tour!

## 🎯 What You Get

✅ Beautiful responsive website with your brand colors
✅ Dynamic tours that you can add/edit/delete
✅ Photo gallery you can update anytime
✅ Secure admin dashboard
✅ Mobile-friendly design
✅ Production-ready code

## 📋 Firebase Rules (Copy-Paste)

**Firestore Rules:**
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
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

**Storage Rules:**
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

## 🎨 Brand Colors Used

From your logo:
- **Orange**: #E89B5C (sunset/primary)
- **Rust**: #C4683B (accent)
- **Dark**: #0A1F1F (mountains/text)
- **Cream**: #F5F1E8 (backgrounds)

## 📝 Example Tour Data

Title: Mount Kilimanjaro Trek
Location: Tanzania
Duration: 7 days
Price: 1500
Description: Conquer Africa's highest peak on this incredible 7-day adventure...

## 🚀 Deploy to Production

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Add environment variables in Vercel dashboard
# Then deploy to production
vercel --prod
```

## ❓ Need Help?

Common issues:
- **Can't login?** Check user exists in Firebase Authentication
- **No tours showing?** Check Firestore rules are set
- **Images not loading?** Verify Storage rules are configured

Check README.md for full documentation!

---

**You're all set! Start adding your amazing adventures! 🏔️**
