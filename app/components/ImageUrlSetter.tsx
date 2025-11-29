'use client';

import { useEffect } from 'react';
import { getImageUrl } from '@/lib/supabase-storage';

/**
 * Component that sets CSS variables for background images
 * This allows CSS to use Supabase Storage URLs via CSS variables
 */
export function ImageUrlSetter() {
    useEffect(() => {
        // Set CSS variables for background images
        const root = document.documentElement;
        root.style.setProperty('--ministry-image-url', `url("${getImageUrl('general/ministry.jpg')}")`);
        root.style.setProperty('--professional-image-url', `url("${getImageUrl('general/civil.jpg')}")`);
    }, []);

    return null; // This component doesn't render anything
}

