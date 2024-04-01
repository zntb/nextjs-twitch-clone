'use client';
import { toast } from 'sonner';
import { onFollow, onUnFollow } from '@/actions/follow';
import { Button } from '@/components/ui/button';
import { useTransition } from 'react';

interface ActionsProps {
  isFollowing: boolean;
  userId: string;
}

export const Actions = ({ isFollowing, userId }: ActionsProps) => {
  const [isPending, startTransition] = useTransition();

  const handleFollow: React.MouseEventHandler<HTMLButtonElement> = async () => {
    startTransition(() => {
      onFollow(userId)
        .then((data) => {
          toast.success(`You are now following ${data.following.username}`);
        })
        .catch(() => {
          toast.error('Something went wrong');
        });
    });
  };

  const handleUnFollow: React.MouseEventHandler<
    HTMLButtonElement
  > = async () => {
    startTransition(() => {
      onUnFollow(userId)
        .then((data) => {
          toast.success(`You have unfollowed ${data.following.username}`);
        })
        .catch(() => {
          toast.error('Something went wrong');
        });
    });
  };

  const onClick = isFollowing ? handleUnFollow : handleFollow;

  return (
    <Button variant="primary" onClick={onClick} disabled={isPending}>
      {isFollowing ? 'Unfollow' : 'Follow'}
    </Button>
  );
};
