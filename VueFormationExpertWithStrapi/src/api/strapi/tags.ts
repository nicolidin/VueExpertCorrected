import { axiosClient } from '@/api/axios';
import { fromStrapiTag, toStrapiTagWrite } from '@/mapper/strapiMappers';
import type { StrapiTagReadDTO } from '@/types/StrapiTagType';
import type { TagType } from '@/types/TagType';

/**
 * Appels API Strapi - Tags (baseURL = Strapi, chemins /api/tags).
 */

export async function fetchTagsApi(): Promise<TagType[]> {
  const { data: res } = await axiosClient.get<{ data?: StrapiTagReadDTO[] }>(
    '/api/tags',
  );
  const list = res?.data ?? [];
  return Array.isArray(list) ? list.map(fromStrapiTag) : [];
}

export async function postTagApi(body: {
  title: string;
  color?: string;
}): Promise<TagType> {
  const { data: res } = await axiosClient.post<{ data: StrapiTagReadDTO }>(
    '/api/tags',
    toStrapiTagWrite(body),
  );
  return fromStrapiTag(res.data);
}
