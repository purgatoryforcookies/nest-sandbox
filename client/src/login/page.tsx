import { GalleryVerticalEnd } from 'lucide-react';
import video from '../assets/Timeline.mp4';
import { LoginForm } from '@/components/login-form';
import { useState } from 'react';
import { RegisterForm } from '@/components/register-form';

export default function LoginPage() {
  const [isRegistering, setIsRegistering] = useState(false);

  return (
    <div className="grid min-h-svh lg:grid-cols-2 bg-gradient-to-r from-[#0a0a0a] to-[#21190d] to-99%">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Purgatoryforcookies Inc.
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            {isRegistering ? (
              <RegisterForm
                toggleSignUp={() => setIsRegistering(!isRegistering)}
              />
            ) : (
              <LoginForm
                toggleSignUp={() => setIsRegistering(!isRegistering)}
              />
            )}
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <video
          autoPlay
          muted
          loop
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src={video} type="video/mp4" />
        </video>
      </div>
    </div>
  );
}
