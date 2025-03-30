import { fetchWithAuth } from './oidc';

export const fetchBookmarks = async <T>(): Promise<T> => {
  const resp = await fetchWithAuth('/api/bookmark', {
    method: 'GET',
  });

  if (resp.status !== 200) {
    throw resp;
  }

  const body = await resp.json();

  return body;
};

export const addbookmark = async <T>(): Promise<T> => {
  const resp = await fetchWithAuth('/api/bookmark', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ title: 'new title', link: 'new link' }),
  });

  if (resp.status !== 201) {
    throw resp;
  }

  const body = await resp.json();

  return body;
};

export const editBookmark = async <T>(
  id: number,
  data: Partial<T>,
): Promise<T> => {
  const resp = await fetchWithAuth('/api/bookmark/' + id, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (resp.status !== 200) {
    throw resp;
  }

  const body = await resp.json();

  return body;
};

export const deleteBookmark = async (id: number) => {
  const resp = await fetchWithAuth('/api/bookmark/' + id, {
    method: 'DELETE',
  });

  if (resp.status !== 200) {
    throw resp;
  }
  return;
};
