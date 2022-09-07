import React, { Suspense } from 'react';

import { useModal } from '@/hooks/useModal';
const Modal = React.lazy(() => import('@/hooks/useModal'));
import { CreateProjectForm } from '@/components/CreateProjectModalForm';
import { CardDeleteProject } from '@/components/DeleteProject';
import { Project, User } from '@/lib/client/graphql/generated';
import {
  Card,
  CardDetails,
  CardDetailsDescription,
  CardDetailsTitle,
  CardImage,
  ProfileTitle,
  ProjectCards,
  ProjectsContainer,
  ProfileTitleContainer,
  ProjectCardsContainer,
  CreateProjectTitle,
  CreateProjectButton,
  CardButtonWrapper,
  CreateProjectContainer,
  CardDetailsCreate,
} from './ProjectsBody.styles';
import { ProjectIcon } from '@/components/Icons';
import Image from 'next/image';

interface ProjectsBodyProps {
  user: User;
  userProjects: Array<Project>;
}

export function ProjectsBody({ user, userProjects }: ProjectsBodyProps) {
  return (
    <ProjectsContainer>
      <ProfileTitleContainer>
        <ProfileTitle>{user.profileTitle}</ProfileTitle>
      </ProfileTitleContainer>
      <ProjectCardsContainer>
        <ProjectCards>
          <CreateProjectCard />
          {userProjects.map((project) => {
            return (
              <Card key={project.projectId}>
                <CardDeleteProject projectId={project.projectId} />
                <CardImage>
                  <Image
                    src={project.imageUrl}
                    quality={60}
                    alt={`Cover image for ${project.title}`}
                    width={352}
                    height={264}
                    objectFit="cover"
                    placeholder="blur"
                    blurDataURL={`${project.imageUrl}?auto=format,compress&q=1&blur=500&w=2`}
                    priority
                  />
                </CardImage>
                <CardDetails>
                  <CardDetailsTitle>{project.title}</CardDetailsTitle>
                  <CardDetailsDescription>
                    {project.description}
                  </CardDetailsDescription>
                </CardDetails>
              </Card>
            );
          })}
        </ProjectCards>
      </ProjectCardsContainer>
    </ProjectsContainer>
  );
}

const CreateProjectCard = () => {
  const [modalOptions, toggle] = useModal({
    animated: true,
    closeButton: true,
    icon: <ProjectIcon />,
  });

  return (
    <>
      <CreateProjectContainer>
        <CardButtonWrapper onClick={toggle}>
          <CreateProjectButton>
            <p>+</p>
          </CreateProjectButton>
        </CardButtonWrapper>
        <CardDetailsCreate>
          <CreateProjectTitle>Create a Project</CreateProjectTitle>
          <CardDetailsDescription>
            Projects highlight your best skills and experience. ⭐️
          </CardDetailsDescription>
          <CardDetailsDescription>
            Need project inspiration?
          </CardDetailsDescription>
        </CardDetailsCreate>
      </CreateProjectContainer>
      <Suspense fallback={<div>Loading...</div>}>
        <Modal {...modalOptions}>
          <CreateProjectForm hide={toggle} />
        </Modal>
      </Suspense>
    </>
  );
};
