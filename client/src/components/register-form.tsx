import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from './ui/label';
import { useForm } from 'react-hook-form';
import { signup } from '@/service/api';
import { ErrorMessage } from '@hookform/error-message';

type RegisterFormProps = {
  toggleSignUp: () => void;
};

type FormValues = {
  username: string;
  password: string;
  confirmPassword: string;
};

/**
 * Form to register with username-password flow.
 */
export function RegisterForm({ toggleSignUp }: RegisterFormProps) {
  const { register, handleSubmit, formState, setError } = useForm<FormValues>({
    defaultValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
  });

  const { errors } = formState;

  const onSubmit = async (formData: FormValues) => {
    if (formData.password !== formData.confirmPassword) {
      setError('password', { message: 'Passwords do not match' });
      setError('confirmPassword', { message: 'Passwords do not match' });
      return;
    }

    try {
      await signup(formData);
    } catch (error) {
      if (error instanceof Response) {
        const err = await error.json();
        setError('root', { message: err.message });
      } else {
        setError('root', { message: 'Something went wrong' });
      }
    }
  };

  return (
    <form className={'flex flex-col gap-6'} onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Register</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Choose an email and password below.
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2 relative">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            type="username"
            placeholder="m@example.com"
            required
            {...register('username', {
              required: { value: true, message: 'Username is required' },
            })}
          />
          <ErrorMessage
            errors={errors}
            name="username"
            render={({ message }) => (
              <p className="text-red-500 p-0 absolute">{message}</p>
            )}
          />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
          </div>
          <Input
            id="password"
            type="password"
            {...register('password', {
              required: {
                value: true,
                message: 'Password is required',
              },
            })}
            required
            autoComplete="new-password"
          />
          <ErrorMessage
            errors={errors}
            name="password"
            render={({ message }) => <p className="text-red-500">{message}</p>}
          />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="confirm-password">Confirm password</Label>
          </div>
          <Input
            id="confirm-password"
            type="password"
            {...register('confirmPassword', {
              required: {
                value: true,
                message: 'Password is required',
              },
            })}
            required
            autoComplete="new-password"
          />
          <ErrorMessage
            errors={errors}
            name="confirmPassword"
            render={({ message }) => <p className="text-red-500">{message}</p>}
          />
        </div>
        <Button type="submit" className="w-full">
          Register
        </Button>
        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border"></div>
      </div>
      <div className="text-center text-sm">
        {errors.root ? (
          <p className="text-red-500">{errors.root.message}</p>
        ) : null}
        <div>
          Already have an account?{' '}
          <Button
            onClick={toggleSignUp}
            variant={'link'}
            type="button"
            className="underline underline-offset-4 p-0"
          >
            Log in
          </Button>
        </div>
      </div>
    </form>
  );
}
