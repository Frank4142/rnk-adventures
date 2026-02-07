# 📋 Production Deployment Checklist

## Pre-Deployment

### Content
- [ ] Add your logo to `/public/logo.png`
- [ ] Update company information in components
- [ ] Add at least 3-6 tours via admin dashboard
- [ ] Upload 10+ gallery images
- [ ] Customize testimonials with real reviews
- [ ] Update contact information (phone, email, address)
- [ ] Add social media links in footer

### Configuration
- [ ] All environment variables set in `.env.local`
- [ ] Firebase Authentication user created
- [ ] Firestore rules deployed
- [ ] Storage rules deployed
- [ ] Firebase project billing enabled (free tier OK)

### Testing
- [ ] Test website on desktop (Chrome, Firefox, Safari)
- [ ] Test website on mobile (iOS, Android)
- [ ] Test admin login
- [ ] Test adding a tour
- [ ] Test uploading gallery images
- [ ] Test editing a tour
- [ ] Test deleting content
- [ ] Check all images load properly
- [ ] Test contact form (if implemented)
- [ ] Verify responsive design on all screen sizes

### SEO & Performance
- [ ] Add meta descriptions
- [ ] Add Open Graph tags for social sharing
- [ ] Optimize images (compress before upload)
- [ ] Test site speed with Google PageSpeed Insights
- [ ] Add Google Analytics (optional)
- [ ] Create sitemap.xml (optional)
- [ ] Add robots.txt (optional)

## Deployment Steps

### Option 1: Vercel (Recommended - Easiest)

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Add Environment Variables**
   - Go to Vercel Dashboard
   - Select your project
   - Settings → Environment Variables
   - Add all variables from `.env.local`
   - **Important:** Select all environments (Production, Preview, Development)

5. **Deploy to Production**
   ```bash
   vercel --prod
   ```

6. **Custom Domain (Optional)**
   - Vercel Dashboard → Domains
   - Add your custom domain
   - Update DNS records as instructed

### Option 2: Netlify

1. **Build the Project**
   ```bash
   npm run build
   ```

2. **Deploy via Netlify CLI**
   ```bash
   npm install -g netlify-cli
   netlify login
   netlify deploy --prod
   ```

3. **Or Deploy via GitHub**
   - Push code to GitHub
   - Connect repository in Netlify dashboard
   - Set build command: `npm run build`
   - Set publish directory: `.next`

4. **Add Environment Variables**
   - Netlify Dashboard → Site settings → Environment variables
   - Add all variables from `.env.local`

### Option 3: Self-Hosted (VPS/Dedicated Server)

1. **Build Project**
   ```bash
   npm run build
   ```

2. **Start Production Server**
   ```bash
   npm start
   ```

3. **Use PM2 for Process Management**
   ```bash
   npm install -g pm2
   pm2 start npm --name "rnk-adventures" -- start
   pm2 save
   pm2 startup
   ```

4. **Configure Nginx**
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

5. **Setup SSL with Certbot**
   ```bash
   sudo certbot --nginx -d yourdomain.com
   ```

## Post-Deployment

### Verification
- [ ] Visit your live URL
- [ ] Test all pages load correctly
- [ ] Test admin login on production
- [ ] Add a test tour to verify database connection
- [ ] Upload a test image to gallery
- [ ] Test on mobile devices
- [ ] Check browser console for errors
- [ ] Verify SSL certificate (https://)

### Firebase Production Settings
- [ ] Update Firebase authorized domains:
  - Firebase Console → Authentication → Settings
  - Add your production domain

### SEO Setup
- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Set up Google Analytics (optional)
- [ ] Add Facebook Pixel (optional)

### Monitoring
- [ ] Set up uptime monitoring (UptimeRobot, Pingdom)
- [ ] Configure error tracking (Sentry - optional)
- [ ] Set up Firebase usage alerts
- [ ] Monitor Firebase quota usage

### Backup
- [ ] Export Firestore data (Firestore → Import/Export)
- [ ] Backup Firebase Storage (download via console)
- [ ] Save environment variables securely
- [ ] Document admin credentials securely

## Security Checklist

- [ ] Admin password is strong (12+ characters)
- [ ] `.env.local` is in `.gitignore`
- [ ] Firebase rules tested and working
- [ ] HTTPS enabled on production
- [ ] API keys are using domain restrictions
- [ ] Regular security updates scheduled

## Performance Optimization

- [ ] Enable Firebase caching
- [ ] Implement image lazy loading (already done)
- [ ] Compress images before upload
- [ ] Use WebP format for images (optional)
- [ ] Enable CDN (Vercel includes this)
- [ ] Monitor Core Web Vitals

## Marketing Setup

- [ ] Add Google Analytics
- [ ] Set up Google Tag Manager (optional)
- [ ] Add Facebook Pixel (optional)
- [ ] Configure social media meta tags
- [ ] Create og:image for social sharing
- [ ] Set up email marketing integration

## Maintenance Schedule

### Daily
- Check for new booking inquiries (if integrated)
- Monitor Firebase usage

### Weekly
- Review analytics
- Backup Firestore data
- Check for security updates

### Monthly
- Update tour information
- Add new gallery photos
- Review and respond to customer testimonials
- Update seasonal offers

### Quarterly
- Security audit
- Performance review
- Update dependencies
- Review Firebase costs

## Emergency Contacts

- Firebase Support: https://firebase.google.com/support
- Vercel Support: https://vercel.com/support
- Next.js Documentation: https://nextjs.org/docs

## Rollback Procedure

If something goes wrong:

### Vercel
```bash
# List deployments
vercel ls

# Rollback to previous
vercel rollback [deployment-url]
```

### Manual
1. Keep previous build in separate directory
2. Restore from backup
3. Redeploy known working version

---

## 🎉 Launch Day!

Once all items are checked:
1. Announce on social media
2. Send email to existing customers
3. Update Google Business listing
4. Share with adventure travel communities
5. Celebrate! 🎊

**Your adventure website is live! Time to explore! 🏔️**
