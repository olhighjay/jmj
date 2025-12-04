import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

const PDF_STORAGE_BUCKET = process.env.NEXT_PUBLIC_SUPABASE_PDF_STORAGE_BUCKET || process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET || 'pdfs';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ path: string[] }> | { path: string[] } }
) {
    try {
        if (!supabase) {
            return NextResponse.json(
                { error: 'Supabase is not configured' },
                { status: 500 }
            );
        }

        // Handle both sync and async params (Next.js 15+ uses async params)
        const resolvedParams = params instanceof Promise ? await params : params;

        // Reconstruct the file path from the route parameters
        const filePath = resolvedParams.path.join('/');

        if (!filePath || !filePath.toLowerCase().endsWith('.pdf')) {
            return NextResponse.json(
                { error: 'Invalid file path. Only PDF files are allowed.' },
                { status: 400 }
            );
        }

        // Download the file from Supabase Storage
        const { data, error } = await supabase.storage
            .from(PDF_STORAGE_BUCKET)
            .download(filePath);

        if (error) {
            console.error('Error downloading PDF from storage:', error);
            return NextResponse.json(
                { error: 'PDF not found', details: error.message },
                { status: 404 }
            );
        }

        if (!data) {
            return NextResponse.json(
                { error: 'PDF not found' },
                { status: 404 }
            );
        }

        // Convert blob to array buffer
        const arrayBuffer = await data.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Get the filename from the path
        const filename = filePath.split('/').pop() || 'download.pdf';

        // Return the PDF with proper headers
        return new NextResponse(buffer, {
            status: 200,
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': `inline; filename="${filename}"`, // 'inline' to display in browser, 'attachment' to force download
                'Content-Length': buffer.length.toString(),
                'Cache-Control': 'public, max-age=3600, s-maxage=3600', // Cache for 1 hour
            },
        });
    } catch (error) {
        console.error('Unexpected error in PDF proxy:', error);
        const errorMessage = error instanceof Error ? error.message : 'Failed to fetch PDF';
        return NextResponse.json(
            { error: 'Failed to fetch PDF', details: errorMessage },
            { status: 500 }
        );
    }
}

