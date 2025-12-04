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

        // Option 1: Try to fetch from database table first (recommended)
        const { data: dbPdfs, error: dbError } = await supabase
            .from('programs')
            .select('*')
            .order('created_at', { ascending: false });

        // Helper function to create proxy URL
        const getProxyUrl = (filePath: string): string => {
            // Encode the path for URL (handles spaces and special characters)
            const encodedPath = filePath.split('/').map(segment => encodeURIComponent(segment)).join('/');
            return `/api/pdf/${encodedPath}`;
        };

        // If database table exists and has data, use it
        if (!dbError && dbPdfs && dbPdfs.length > 0) {
            const pdfFiles = dbPdfs.map((pdf) => ({
                name: pdf.name,
                url: getProxyUrl(pdf.path), // Use proxy URL instead of direct storage URL
                size: pdf.size || 0,
                updatedAt: pdf.updated_at || pdf.created_at,
            }));

            return NextResponse.json(pdfFiles);
        }

        // Option 2: Fallback to hardcoded list (if database table doesn't exist yet)
        // This works immediately without needing to set up a database table
        const knownPdfs = [
            {
                name: 'JMJ Order of Wake Keep Service.pdf',
                path: 'JMJ Order of Wake Keep Service.pdf',
            },
            {
                name: 'The Funeral Service of JMJ  .pdf',
                path: 'The Funeral Service of JMJ  .pdf',
            },
        ];

        const pdfFiles = knownPdfs.map((pdf) => ({
            name: pdf.name,
            url: getProxyUrl(pdf.path), // Use proxy URL instead of direct storage URL
            size: 0, // Size not available without listing
            updatedAt: new Date().toISOString(),
        }));

        return NextResponse.json(pdfFiles);
    } catch (error) {
        console.error('Unexpected error:', error);
        const errorMessage = error instanceof Error ? error.message : 'Failed to fetch PDF files';
        return NextResponse.json(
            { error: 'Failed to fetch PDF files', details: errorMessage },
            { status: 500 }
        );
    }
}
