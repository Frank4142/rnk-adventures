// pages/api/upload.js
import { createClient } from '@supabase/supabase-js';
import formidable from 'formidable';
import fs from 'fs';
import { getAuth } from 'firebase-admin/auth';
import { initializeApp, getApps, cert } from 'firebase-admin/app';

export const config = { api: { bodyParser: false } };

// Firebase Admin init (use exact env names below)
if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
      clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
      privateKey: (process.env.FIREBASE_ADMIN_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
    }),
  });
}

// Supabase server client (use server env names)
const supabase = createClient(
  process.env.SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    // --- Auth check ---
    const authHeader = req.headers.authorization || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
    if (!token) return res.status(401).json({ error: 'Missing auth token' });

    try {
      await getAuth().verifyIdToken(token);
    } catch (e) {
      return res.status(401).json({ error: 'Invalid or expired ID token' });
    }

    // --- Parse multipart ---
    const form = formidable({ multiples: false });
    const { files, fields } = await new Promise((resolve, reject) =>
      form.parse(req, (err, fields, files) => (err ? reject(err) : resolve({ fields, files })))
    );

    // debug: log files shape (remove in production)

    const file = files.file || files.image;
    if (!file) return res.status(400).json({ error: 'No file uploaded (expected field "file" or "image")' });

    // Support both formidable versions
    const filePath = file.filepath || file.path;
    if (!filePath) return res.status(400).json({ error: 'Uploaded file path missing' });

    // --- Upload to Supabase ---
    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return res.status(500).json({ error: 'Supabase server env vars not configured' });
    }

    const stream = fs.createReadStream(filePath);
    const originalName = file.originalFilename || file.name || 'upload';
    const safeName = originalName.replace(/\s+/g, '_');
    const folder = (req.query?.folder && String(req.query.folder)) || 'gallery';
    const fileName = `${folder}/${Date.now()}_${safeName}`;

    const { error: uploadError } = await supabase.storage
      .from('rnk-adventures')
      .upload(fileName, stream, { contentType: file.mimetype || 'application/octet-stream' });

    if (uploadError) {
      console.error('Supabase upload error:', uploadError);
      return res.status(500).json({ error: uploadError.message || 'Upload failed' });
    }

    const { data } = supabase.storage.from('rnk-adventures').getPublicUrl(fileName);
    return res.status(200).json({ url: data.publicUrl, path: fileName });
  } catch (err) {
    console.error('Upload error:', err);
    return res.status(500).json({ error: err.message || 'Internal server error' });
  }
}
