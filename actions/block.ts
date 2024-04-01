'use server';
import { getSelf } from '@/lib/auth-service';
import { blockUser, unblockUser } from '@/lib/block-service';
import { revalidatePath } from 'next/cache';

export const onBlock = async (id: string) => {
  // TODO: Adapt to disconnect from livestream firstly
  // TODO: Allow ability to kick the guest

  const blockedUser = await blockUser(id);

  revalidatePath('/');

  if (blockedUser) {
    revalidatePath(`/${blockedUser.blocked.username}`);
  }

  return blockedUser;
};

export const onUnblock = async (id: string) => {
  const self = await getSelf();
  const unblockedUser = await unblockUser(id);

  revalidatePath(`/u/${self.username}/community`);
  return unblockedUser;
};
