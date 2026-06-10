import { put } from '@vercel/blob';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const blob = await put('latest.apk', request, {
      access: 'public',
      addRandomSuffix: false
    });
    return response.status(200).json(blob);
  } catch (err) {
    return response.status(500).json({ error: err.message });
  }
}
