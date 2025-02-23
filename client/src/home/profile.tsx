import { getMe } from '@/service/api';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import moment from 'moment';

type MeType = {
  id: number;
  created_at: string;
  updated_at: string;
  username: string;
  first_name: string | null;
  last_name: string | null;
};

type MeResponse = {
  user: MeType;
  token: string;
};

export default function ProfilePage() {
  const [me, setMe] = useState<MeResponse>();
  const [error, setError] = useState('');

  useEffect(() => {
    const get = async () => {
      try {
        const data = await getMe<MeResponse>();
        setMe(data);
      } catch (error) {
        if (error instanceof Response) {
          const b = await error.json();
          setError(b.message);
        } else {
          setError('Something went wrong');
        }
      }
    };
    get();
  }, []);

  const user = me?.user;
  const token = me?.token;

  if (!me || !token) {
    return <p>Loading</p>;
  }
  const decodedToken = jwtDecode(token);

  return (
    <div className="size-full flex items-start gap-5 justify-start pt-10 flex-col overflow-auto px-5">
      <div className="bg-background/90">
        <h2 className="text-lg text-primary/70">Profile:</h2>
        <pre>{JSON.stringify(user, null, 4)}</pre>
      </div>
      <div className="flex flex-col gap-5 pl-5 w-full">
        <div className="max-w-[900px] break-all">
          <h2 className="text-lg text-primary/70">Token:</h2>
          <p className="">{token}</p>
        </div>
        <div>
          <h2 className="text-lg text-primary/70">Decoded:</h2>
          <pre>{decodedToken ? JSON.stringify(decodedToken, null, 4) : ''}</pre>
        </div>
        <div>
          <h2 className="text-lg text-primary/70">Expires</h2>
          <section className="flex gap-2">
            <p>
              {new Date((decodedToken.exp || 0) * 1000).toLocaleTimeString()}
            </p>
            <p>
              {'('}
              {decodedToken
                ? moment(new Date((decodedToken.exp || 0) * 1000)).fromNow()
                : null}
              {')'}
            </p>
          </section>
        </div>
      </div>

      {error ? <p>{error}</p> : null}
    </div>
  );
}
