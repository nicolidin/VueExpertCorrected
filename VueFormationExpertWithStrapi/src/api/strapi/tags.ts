import { axiosClient } from '@/api/axios';
import { fromStrapiTag } from '@/mapper/strapiMappers';
import type { StrapiTagType } from '@/types/StrapiTagType';
import type { TagType } from '@/types/TagType';

/**
 * Appels API Strapi - Tags (baseURL = Strapi, chemins /api/tags).
 */

export async function fetchTagsApi(): Promise<TagType[]> {
  const { data: res } = await axiosClient.get<{ data?: StrapiTagType[] }>(
    '/api/tags',
  );
  const list = res?.data ?? [];
  return Array.isArray(list) ? list.map(fromStrapiTag) : [];
}

export async function postTagApi(body: {
  title: string;
  color?: string;
}): Promise<TagType> {
  const { data: res } = await axiosClient.post<{ data: StrapiTagType }>(
    '/api/tags',
    { data: body },
  );
  return fromStrapiTag(res.data);
}
