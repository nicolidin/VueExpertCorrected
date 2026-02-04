import { axiosClient } from '@/api/axios';
import { fromStrapiTag } from '@/utils/strapiMappers';
import type { StrapiTagType } from '@/types/StrapiTagType';
import type { TagType } from '@/types/TagType';

/**
 * Appels API Strapi - Tags (via proxy /api/strapi/tags)
 * Exposés en modèle front (TagType).
 */

export async function fetchTags(): Promise<TagType[]> {
  const { data: res } = await axiosClient.get<{ data: StrapiTagType[] }>(
    '/api/strapi/tags',
  );
  return res.data.map(fromStrapiTag);
}

export async function createTagFront(body: {
  title: string;
  color?: string;
}): Promise<TagType> {
  const { data: res } = await axiosClient.post<{ data: StrapiTagType }>(
    '/api/strapi/tags',
    { data: body },
  );
  return fromStrapiTag(res.data);
}
