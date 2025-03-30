import { RandomProfilePicture } from '@/components/profilepicture';
import { useOidc } from '@/service/oidc';

export default function ProfilePage() {
  const { decodedIdToken: user } = useOidc();

  return (
    <div className="size-full flex items-center justify-center pt-10 flex-col overflow-auto px-5">
      <div className="grid grid-cols-6 grid-rows-[20px_20px_repeat(5,auto)] gap-4">
        <div className="col-span-2 row-span-3">
          <RandomProfilePicture />
        </div>
        <div className="col-span-4 col-start-3 pt-2">
          <div className="flex flex-col leading-5">
            <p className="text-lg">{user.name}</p>
            <p className="text-primary/60">@{user.preferred_username}</p>
          </div>
        </div>
        <div className="col-span-4 col-start-3 row-start-2 text-primary/70"></div>
        <div className="col-span-6 row-start-4 ">
          <h1 className="text-lg text-primary/70">User id:</h1>
          {user.sub}
        </div>
        <div className="col-span-6 row-start-5">
          <h1 className="text-lg text-primary/70">Full name:</h1>
          {user.given_name} {user.family_name}
        </div>
        <div className="col-span-6 row-start-6 flex flex-col gap-2">
          <h1 className="text-lg text-primary/70">Email adresses:</h1>
          {user.email}
        </div>
      </div>
    </div>
  );
}
