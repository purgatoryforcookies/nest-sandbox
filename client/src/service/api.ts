export const fetchBookmarks = async <T>(): Promise<T> => {
  const resp = await fetch('/api/bookmark', {
    method: 'GET',
    credentials: 'same-origin',
    redirect: 'follow',
  });

  if (resp.status !== 200) {
    throw resp;
  }

  const body = await resp.json();

  return body;
};

export const addbookmark = async <T>(): Promise<T> => {
  const resp = await fetch('/api/bookmark', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ title: 'new title', link: 'new link' }),
    credentials: 'same-origin',
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
  const resp = await fetch('/api/bookmark/' + id, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(data),
    credentials: 'same-origin',
  });

  if (resp.status !== 200) {
    throw resp;
  }

  const body = await resp.json();

  return body;
};

export const deleteBookmark = async (id: number) => {
  const resp = await fetch('/api/bookmark/' + id, {
    method: 'DELETE',
    credentials: 'same-origin',
    redirect: 'follow',
  });

  if (resp.status !== 200) {
    throw resp;
  }
  return;
};
export const getMe = async <T>(): Promise<T> => {
  const resp = await fetch('/api/user/me', {
    method: 'GET',
    credentials: 'same-origin',
  });

  if (resp.status === 200) {
    const body = await resp.json();
    return body;
  }

  window.location.href = '/auth/login';
  throw resp;
};
