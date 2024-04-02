'use client';

import { useViewerToken } from '@/hooks/use-viewer-token';
import { User, Stream } from '@prisma/client';

interface StreamPlayerProps {
  user: User & { stream: Stream | null };
  stream: Stream;
  isFollowing: boolean;
}

export const StreamPlayer = ({
  user,
  stream,
  isFollowing,
}: StreamPlayerProps) => {
  const { identity, name, token } = useViewerToken(user.id);
  console.log({ token, identity, name });

  if (!token || !identity || !name) {
    return <div>Cannot watch the stream!</div>;
  }

  return <div>Allowed to watch the stream</div>;
};
