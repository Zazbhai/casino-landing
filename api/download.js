import { list } from '@vercel/blob';

export default async function handler(request, response) {
  try {
    const { blobs } = await list();
    const latestBlob = blobs.find(b => b.pathname === 'latest.apk');
    
    if (latestBlob) {
      // Redirect to the actual Vercel Blob URL where the APK is hosted
      return response.redirect(302, latestBlob.url);
    } else {
      return response.status(404).send('APK not found in Blob storage');
    }
  } catch (err) {
    return response.status(500).json({ error: err.message });
  }
}
