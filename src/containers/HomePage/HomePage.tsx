import {
  useGetProjectsByUserIdQuery,
  useGetUserQuery,
} from '@/lib/client/graphql/generated';

import { ProjectsBody } from './ProjectsBody';
import { UserSidebar } from './UserSidebar';
import { HomePageContainer } from './HomePage.styles';
import { LoadingScreen } from '@/components/Loading';

export function HomePage() {
  const { data: getUserQuery, loading: loadingUser } = useGetUserQuery({
    variables: {
      userId: '668ee510-4bfe-49fe-9552-a4becaf35c6c',
    },
  });
  const { data: getProjectsByUser, loading: loadingProjects } =
    useGetProjectsByUserIdQuery({
      variables: {
        userId: '668ee510-4bfe-49fe-9552-a4becaf35c6c',
      },
    });

  if (loadingUser || loadingProjects) return <LoadingScreen />;

  if (!getUserQuery) return <h1>Error loading user data!</h1>;
  if (!getProjectsByUser) return <h1>Error loading user projects!</h1>;
  const { getUser: user } = getUserQuery;
  const { getProjectsByUserId: userProjects } = getProjectsByUser;

  return (
    <HomePageContainer>
      <UserSidebar user={user} />
      <ProjectsBody user={user} userProjects={userProjects} />
    </HomePageContainer>
  );
}
