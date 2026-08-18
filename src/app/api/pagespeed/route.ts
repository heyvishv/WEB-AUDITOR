import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const { url, strategy = 'desktop' } = await request.json();

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    // Use environment variable for Google API Key (optional but recommended for production)
    const apiKey = process.env.GOOGLE_API_KEY || '';
    
    // Construct the PageSpeed Insights API URL
    // We request multiple categories to get a complete Lighthouse score profile
    const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&strategy=${strategy}&category=PERFORMANCE&category=ACCESSIBILITY&category=BEST_PRACTICES&category=SEO${apiKey ? `&key=${apiKey}` : ''}`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.error) {
        if (data.error.message.includes('Quota exceeded')) {
             return NextResponse.json({ error: 'Google API Quota Exceeded. You need to add your GOOGLE_API_KEY in your Netlify Environment Variables to fix this!' }, { status: 500 });
        }
        return NextResponse.json({ error: data.error.message }, { status: 500 });
    }

    // Extract categories from Lighthouse Result
    const categories = data.lighthouseResult?.categories;
    if (!categories) {
       return NextResponse.json({ error: 'No lighthouse results found for this URL.' }, { status: 500 });
    }

    // Map the scores (Lighthouse returns them as 0.0 to 1.0, so we multiply by 100)
    const metrics = {
      performance: categories.performance?.score ? Math.round(categories.performance.score * 100) : null,
      accessibility: categories.accessibility?.score ? Math.round(categories.accessibility.score * 100) : null,
      bestPractices: categories['best-practices']?.score ? Math.round(categories['best-practices'].score * 100) : null,
      seo: categories.seo?.score ? Math.round(categories.seo.score * 100) : null,
    };

    return NextResponse.json({ strategy, metrics });
  } catch (error: any) {
    console.error('PageSpeed API Error:', error);
    return NextResponse.json({ error: 'Failed to fetch PageSpeed insights' }, { status: 500 });
  }
}
