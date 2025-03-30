import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

type SessionExpiryDialogProps = {
  open: boolean;
  onChange: (state: boolean) => void;
  countdown: number | null;
  refreshSession: () => void;
};

export const SessionExpiryDialog = ({
  open,
  onChange,
  countdown,
  refreshSession,
}: SessionExpiryDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you still there?</DialogTitle>
          <DialogDescription asChild>
            <div className="flex flex-col gap-2">
              <p>You are about to be automatically logged out. </p>
              <p>{Math.round(countdown || 0)} seconds remaining.</p>
            </div>
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-2 justify-end">
          <form action="/auth/logout" method="GET">
            <Button type="submit" variant={'secondary'}>
              Logout
            </Button>
          </form>
          <Button type="button" onClick={refreshSession}>
            Stay logged in
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
