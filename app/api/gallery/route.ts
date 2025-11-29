import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
    try {
        if (!supabase) {
            return NextResponse.json(
                { error: 'Supabase is not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables.' },
                { status: 500 }
            );
        }

        const { data, error } = await supabase
            .from('gallery')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Supabase error:', error);
            return NextResponse.json(
                { error: 'Failed to fetch gallery photos', details: error.message },
                { status: 500 }
            );
        }

        // Handle empty data
        if (!data || data.length === 0) {
            return NextResponse.json([]);
        }

        // Transform data to match the expected format
        const photos = data.map((photo) => ({
            id: photo.id,
            src: photo.src,
            alt: photo.alt,
            caption: photo.caption || '',
            category: photo.category,
            type: photo.type || (photo.src?.toLowerCase().endsWith('.mp4') || photo.src?.toLowerCase().endsWith('.webm') || photo.src?.toLowerCase().endsWith('.ogg') || photo.src?.toLowerCase().endsWith('.mov') || photo.src?.toLowerCase().endsWith('.avi') ? 'video' : 'image'),
        }));

        return NextResponse.json(photos);
    } catch (error) {
        console.error('Unexpected error:', error);
        const errorMessage = error instanceof Error ? error.message : 'Failed to fetch gallery photos';
        return NextResponse.json(
            { error: 'Failed to fetch gallery photos', details: errorMessage },
            { status: 500 }
        );
    }
}

