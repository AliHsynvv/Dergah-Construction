import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// Unsplash API
async function searchUnsplash(query: string, page: number = 1, perPage: number = 30) {
  const accessKey = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;
  
  if (!accessKey || accessKey === 'your_unsplash_access_key_here') {
    throw new Error('Unsplash API key not configured');
  }

  const url = new URL('https://api.unsplash.com/search/photos');
  url.searchParams.append('query', query);
  url.searchParams.append('page', page.toString());
  url.searchParams.append('per_page', perPage.toString());
  url.searchParams.append('orientation', 'landscape');

  const response = await fetch(url.toString(), {
    headers: {
      'Authorization': `Client-ID ${accessKey}`,
    },
    next: { revalidate: 3600 }, // Cache for 1 hour
  });

  if (!response.ok) {
    throw new Error(`Unsplash API error: ${response.statusText}`);
  }

  const data: {
    results: Array<{
      id: string;
      description?: string | null;
      alt_description?: string | null;
      urls: { regular: string; small: string; thumb: string };
      user: { name: string; links: { html: string } };
      links: { download_location: string };
      tags?: Array<{ title: string }>;
    }>;
    total: number;
    total_pages: number;
  } = await response.json();
  
  return {
    results: data.results.map((photo) => ({
      id: photo.id,
      title: photo.description || photo.alt_description || 'Untitled',
      description: photo.alt_description || '',
      image: photo.urls.regular,
      imageSmall: photo.urls.small,
      imageThumb: photo.urls.thumb,
      photographer: photo.user.name,
      photographerUrl: photo.user.links.html,
      downloadUrl: photo.links.download_location,
      tags: photo.tags?.map((t) => t.title) || [],
    })),
    total: data.total,
    totalPages: data.total_pages,
  };
}

// Pexels API (alternative)
async function searchPexels(query: string, page: number = 1, perPage: number = 30) {
  const apiKey = process.env.NEXT_PUBLIC_PEXELS_API_KEY;
  
  if (!apiKey || apiKey === 'your_pexels_api_key_here') {
    throw new Error('Pexels API key not configured');
  }

  const url = new URL('https://api.pexels.com/v1/search');
  url.searchParams.append('query', query);
  url.searchParams.append('page', page.toString());
  url.searchParams.append('per_page', perPage.toString());
  url.searchParams.append('orientation', 'landscape');

  const response = await fetch(url.toString(), {
    headers: {
      'Authorization': apiKey,
    },
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`Pexels API error: ${response.statusText}`);
  }

  const data: {
    photos: Array<{
      id: number;
      alt?: string | null;
      src: { large: string; medium: string; small: string };
      photographer: string;
      photographer_url: string;
      url: string;
    }>;
    total_results: number;
  } = await response.json();
  
  return {
    results: data.photos.map((photo) => ({
      id: photo.id.toString(),
      title: photo.alt || 'Untitled',
      description: photo.alt || '',
      image: photo.src.large,
      imageSmall: photo.src.medium,
      imageThumb: photo.src.small,
      photographer: photo.photographer,
      photographerUrl: photo.photographer_url,
      downloadUrl: photo.url,
      tags: [],
    })),
    total: data.total_results,
    totalPages: Math.ceil(data.total_results / perPage),
  };
}

// Demo mode - returns mock data when no API key is configured
function getDemoResults(_query: string) {
  const demoImages = [
    {
      id: 'demo-1',
      title: 'Modern Living Room Design',
      description: 'Contemporary living space with minimalist furniture',
      image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200',
      photographer: 'Demo',
      photographerUrl: '',
      tags: ['modern', 'living room', 'interior'],
    },
    {
      id: 'demo-2',
      title: 'Minimalist Kitchen Interior',
      description: 'Clean and simple kitchen design',
      image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1200',
      photographer: 'Demo',
      photographerUrl: '',
      tags: ['minimalist', 'kitchen', 'white'],
    },
    {
      id: 'demo-3',
      title: 'Luxury Villa Architecture',
      description: 'Modern villa with pool',
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200',
      photographer: 'Demo',
      photographerUrl: '',
      tags: ['villa', 'architecture', 'luxury'],
    },
    {
      id: 'demo-4',
      title: 'Contemporary Office Space',
      description: 'Modern office interior design',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200',
      photographer: 'Demo',
      photographerUrl: '',
      tags: ['office', 'workspace', 'modern'],
    },
    {
      id: 'demo-5',
      title: 'Classic Bedroom Design',
      description: 'Elegant bedroom with classic furniture',
      image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1200',
      photographer: 'Demo',
      photographerUrl: '',
      tags: ['bedroom', 'classic', 'elegant'],
    },
  ];

  return {
    results: demoImages,
    total: demoImages.length,
    totalPages: 1,
    isDemo: true,
  };
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const query = searchParams.get('q') || 'interior design';
    const page = parseInt(searchParams.get('page') || '1');
    const perPage = parseInt(searchParams.get('per_page') || '30');
    const provider = searchParams.get('provider') || 'unsplash'; // 'unsplash' or 'pexels'

    console.log(`🔍 Image search request: query="${query}", provider="${provider}"`);

    let data:
      | {
          results: Array<{
            id: string;
            title: string;
            description: string;
            image: string;
            imageSmall: string;
            imageThumb: string;
            photographer: string;
            photographerUrl: string;
            downloadUrl: string;
            tags: string[];
          }>;
          total: number;
          totalPages: number;
        }
      | {
          results: Array<{
            id: string;
            title: string;
            description: string;
            image: string;
            imageSmall: string;
            imageThumb: string;
            photographer: string;
            photographerUrl: string;
            downloadUrl: string;
            tags: string[];
          }>;
          total: number;
          totalPages: number;
          isDemo: true;
        };
    
    try {
      if (provider === 'pexels') {
        data = await searchPexels(query, page, perPage);
      } else {
        data = await searchUnsplash(query, page, perPage);
      }
    } catch (apiError: unknown) {
      // If API key is not configured, return demo data
      const message = apiError instanceof Error ? apiError.message : String(apiError);
      if (message.includes('not configured')) {
        console.warn('⚠️ API key not configured, using demo mode');
        data = getDemoResults(query);
      } else {
        throw apiError;
      }
    }

    console.log(`✅ Found ${data.results.length} images`);

    return NextResponse.json({
      success: true,
      ...data,
      provider: data.isDemo ? 'demo' : provider,
      query,
      page,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('❌ Image search error:', error);
    return NextResponse.json(
      {
        success: false,
        error: message || 'Failed to search images',
        results: [],
        total: 0,
        totalPages: 0,
      },
      { status: 500 }
    );
  }
}

