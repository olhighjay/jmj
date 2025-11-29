/**
 * Supabase Storage Utilities
 * 
 * Helper functions for working with images stored in Supabase Storage
 */

import { supabase } from './supabase';

// Use a single bucket name, fallback to 'images' if not set
const IMG_STORAGE_BUCKET = process.env.NEXT_PUBLIC_SUPABASE_IMAGE_STORAGE_BUCKET || process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET || 'images';
const VID_STORAGE_BUCKET = process.env.NEXT_PUBLIC_SUPABASE_VIDEO_STORAGE_BUCKET || process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET || 'videos';

/**
 * Get the public URL for an image stored in Supabase Storage
 * @param path - Path to the image in the bucket (e.g., 'header/Daddy-hero-1.jpg')
 * @param video - Whether the path is for a video (default is false)
 * @returns Public URL to the image
 */
export function getImageUrl(path: string, video: boolean = false): string {
    if (!supabase) {
        // Fallback to local path if Supabase is not configured
        return `/images/${path}`;
    }

    const { data } = supabase.storage
        .from(video ? VID_STORAGE_BUCKET : IMG_STORAGE_BUCKET)
        .getPublicUrl(path);

    return data.publicUrl;
}

/**
 * Get multiple image URLs at once
 * @param paths - Array of image paths
 * @returns Array of public URLs
 */
export function getImageUrls(paths: string[]): string[] {
    return paths.map(path => getImageUrl(path));
}

/**
 * Upload an image to Supabase Storage
 * @param file - File to upload
 * @param path - Destination path in the bucket (e.g., 'header/Daddy-hero-1.jpg')
 * @returns Public URL of the uploaded image
 */
export async function uploadImage(
    file: File,
    path: string,
    video: boolean = false
): Promise<{ url: string; error: null } | { url: null; error: string }> {
    if (!supabase) {
        return { url: null, error: 'Supabase is not configured' };
    }

    try {
        const STORAGE_BUCKET = video ? VID_STORAGE_BUCKET : IMG_STORAGE_BUCKET;
        // Upload the file
        const { data, error } = await supabase.storage
            .from(STORAGE_BUCKET)
            .upload(path, file, {
                cacheControl: '3600',
                upsert: true, // Replace if file already exists
            });

        if (error) {
            return { url: null, error: error.message };
        }

        // Get the public URL
        const { data: urlData } = supabase.storage
            .from(STORAGE_BUCKET)
            .getPublicUrl(data.path);

        return { url: urlData.publicUrl, error: null };
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to upload image';
        return { url: null, error: errorMessage };
    }
}

/**
 * Delete an image from Supabase Storage
 * @param path - Path to the image in the bucket
 */
export async function deleteImage(path: string, video: boolean = false): Promise<{ success: boolean; error: string | null }> {
    if (!supabase) {
        return { success: false, error: 'Supabase is not configured' };
    }

    try {
        const STORAGE_BUCKET = video ? VID_STORAGE_BUCKET : IMG_STORAGE_BUCKET;
        const { error } = await supabase.storage
            .from(STORAGE_BUCKET)
            .remove([path]);

        if (error) {
            return { success: false, error: error.message };
        }

        return { success: true, error: null };
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to delete image';
        return { success: false, error: errorMessage };
    }
}

