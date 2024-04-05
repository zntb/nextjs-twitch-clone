'use client';

import { useTransition } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

import { onFollow, onUnFollow } from '@/actions/follow';
import { onUnblock } from '@/actions/block';

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

  const handleBlock = () => {
    startTransition(() => {
      onUnblock(userId)
        .then((data) => {
          toast.success(`You have blocked ${data.blocked.username}`);
        })
        .catch(() => {
          toast.error('Something went wrong');
        });
    });
  };

  return (
    <>
      <Button variant="primary" onClick={onClick} disabled={isPending}>
        {isFollowing ? 'Unfollow' : 'Follow'}
      </Button>
      <Button onClick={handleBlock} disabled={isPending}>
        Block
      </Button>
    </>
  );
};
