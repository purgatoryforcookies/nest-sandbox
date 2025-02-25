import { getMe } from '@/service/api';
import { useContext, createContext, useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router';

type MeType = {
  sub: string;
  email_verified?: boolean;
  name?: string;
  preferred_username?: string;
  given_name?: string;
  family_name?: string;
  email?: string;
};

type ContextType = {
  user: MeType | null;
  logOut: () => void;
};

const AuthContext = createContext<ContextType>({
  user: null,
  logOut: () => {},
});

const AuthProvider = () => {
  const [user, setUser] = useState<MeType | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const get = async () => {
      try {
        const response = await getMe<MeType>();
        setUser(response);
      } catch (error) {
        console.error(error);
      }
    };
    get();
  }, []);

  const logOut = () => {
    setUser(null);
    navigate('/auth/logout');
  };

  return (
    <AuthContext.Provider value={{ user, logOut }}>
      {!user ? (
        <div className="size-full flex justify-center items-center ">
          <div className="relative px-4">
            Loading
            <span
              className="absolute inline-flex left-0 top-[9px] size-2 animate-ping 
            duration-[1500ms] rounded-full bg-white opacity-95"
            ></span>
          </div>
        </div>
      ) : (
        <Outlet />
      )}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
