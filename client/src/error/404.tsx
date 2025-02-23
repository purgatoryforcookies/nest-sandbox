import { Button } from '@/components/ui/button';

export default function NotFoundPage() {
  return (
    <div className="size-full flex justify-center items-center">
      <div className="flex flex-col items-center gap-3">
        <h1 className="text-2xl font-semibold tracking-tight md:tracking-wide md:text-5xl">
          Oops! Lost in Cyberspace
        </h1>
        <p className="text-primary/70">
          Looks like something you were looking for does not exist
        </p>
        <Button>
          <a href="/">Go back home</a>
        </Button>
      </div>
    </div>
  );
}
