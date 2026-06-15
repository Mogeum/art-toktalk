import { supabase } from '@/src/lib/supabase';
import { Art } from '@/src/feature/art/models';

export async function fetchArtworks(): Promise<Art[]> {
  const { data, error } = await supabase
    .from('artworks')
    .select(`
      id, title, artist, year, description, image_url, location, medium, dimensions,
      tags:artwork_tags(tag:tags(id, name)),
      hotspots(id, art_id, x, y, title, summary, image_url)
    `);

  if (error) throw error;

  return data.map((item: any) => ({
    id: item.id,
    title: item.title,
    artist: item.artist,
    year: item.year,
    description: item.description,
    imageUrl: item.image_url,
    location: item.location,
    medium: item.medium,
    dimensions: item.dimensions,
    tags: item.tags.map((t: any) => t.tag),
    hotspots: item.hotspots.map((h: any) => ({
      id: h.id,
      artId: h.art_id,
      x: h.x,
      y: h.y,
      title: h.title,
      summary: h.summary,
      imageUrl: h.image_url,
    })),
  }));
}

export async function fetchArtwork(id: number): Promise<Art | null> {
  const { data, error } = await supabase
    .from('artworks')
    .select(`
      id, title, artist, year, description, image_url, location, medium, dimensions,
      tags:artwork_tags(tag:tags(id, name)),
      hotspots(id, art_id, x, y, title, summary, image_url)
    `)
    .eq('id', id)
    .single();

  if (error) throw error;
  if (!data) return null;

  return {
    id: data.id,
    title: data.title,
    artist: data.artist,
    year: data.year,
    description: data.description,
    imageUrl: data.image_url,
    location: data.location,
    medium: data.medium,
    dimensions: data.dimensions,
    tags: data.tags.map((t: any) => t.tag),
    hotspots: data.hotspots.map((h: any) => ({
      id: h.id,
      artId: h.art_id,
      x: h.x,
      y: h.y,
      title: h.title,
      summary: h.summary,
      imageUrl: h.image_url,
    })),
  };
}