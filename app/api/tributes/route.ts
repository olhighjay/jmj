import { NextRequest, NextResponse } from 'next/server';
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
            .from('tributes')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Supabase error:', error);
            return NextResponse.json(
                { error: 'Failed to fetch tributes', details: error.message },
                { status: 500 }
            );
        }

        // Handle empty data
        if (!data || data.length === 0) {
            return NextResponse.json([]);
        }

        // Transform data to match the expected format
        const tributes = data.map((tribute) => ({
            id: tribute.id,
            name: tribute.name,
            relationship: tribute.relationship,
            message: tribute.message,
            date: tribute.date || tribute.created_at,
            isChild: tribute.is_child || false,
        }));

        return NextResponse.json(tributes);
    } catch (error) {
        console.error('Unexpected error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch tributes' },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        if (!supabase) {
            return NextResponse.json(
                { error: 'Supabase is not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables.' },
                { status: 500 }
            );
        }

        const body = await request.json();
        const { name, relationship, message } = body;

        // Validate input
        if (!name || !relationship || !message) {
            return NextResponse.json(
                { error: 'All fields are required' },
                { status: 400 }
            );
        }

        // Trim whitespace
        const trimmedName = name.trim();
        const trimmedRelationship = relationship.trim();
        const trimmedMessage = message.trim();

        if (!trimmedName || !trimmedRelationship || !trimmedMessage) {
            return NextResponse.json(
                { error: 'All fields must not be empty' },
                { status: 400 }
            );
        }

        // Insert new tribute
        const { data, error } = await supabase
            .from('tributes')
            .insert([
                {
                    name: trimmedName,
                    relationship: trimmedRelationship,
                    message: trimmedMessage,
                    is_child: false, // User submissions default to false
                },
            ])
            .select()
            .single();

        if (error) {
            console.error('Supabase error:', error);
            return NextResponse.json(
                { error: 'Failed to submit tribute' },
                { status: 500 }
            );
        }

        // Transform response to match expected format
        const tribute = {
            id: data.id,
            name: data.name,
            relationship: data.relationship,
            message: data.message,
            date: data.date || data.created_at,
            isChild: data.is_child || false,
        };

        return NextResponse.json(
            { success: true, tribute },
            { status: 201 }
        );
    } catch (error) {
        console.error('Unexpected error:', error);
        return NextResponse.json(
            { error: 'Failed to submit tribute' },
            { status: 500 }
        );
    }
}

