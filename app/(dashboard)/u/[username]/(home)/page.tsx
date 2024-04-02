import { currentUser } from '@clerk/nextjs';

import { getUserByUsername } from '@/lib/user-service';

interface CreatorPageProps {
  params: {
    username: string;
  };
}

const CreatorPage = async ({ params }: CreatorPageProps) => {
  const externalUser = await currentUser();
  const user = await getUserByUsername(params.username);

  return (
    <div className="h-full">
      <h1>Creator Page</h1>
    </div>
  );
};

export default CreatorPage;
