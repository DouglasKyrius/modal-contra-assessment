import React, { useState } from 'react';
import { Button } from '@/components/Button';
import {
  ButtonGroup,
  Container,
  ErrorMessage,
  FormContainer,
  HeaderTitle,
  SubTitle,
  TextField,
  TextFieldArea,
  TextFieldLabel,
  TextFieldTitle,
} from './CreateProjectForm.styles';
import {
  namedOperations,
  useCreateProjectMutation,
} from '@/lib/client/graphql/generated';

interface CreateProjectFormProps {
  hide: () => void;
}

const imagesObj = [
  'https://builds.contra.com/e2d802cb3/assets/VAPOR_GRADIENT_BLUE_LIGHT@2x.ba1c5933.webp',
  'https://builds.contra.com/e2d802cb3/assets/VAPOR_GRADIENT_GREEN_DARK@2x.e15f7484.webp',
  'https://builds.contra.com/e2d802cb3/assets/VAPOR_GRADIENT_GREEN_LIGHT@2x.8833d00c.webp',
  'https://builds.contra.com/e2d802cb3/assets/VAPOR_GRADIENT_PURPLE_DARK@2x.77cc71e0.webp',
  'https://builds.contra.com/e2d802cb3/assets/VAPOR_GRADIENT_PURPLE_LIGHT@2x.e88ac64e.webp',
  'https://builds.contra.com/e2d802cb3/assets/VAPOR_GRADIENT_SALMON_DARK@2x.00c08da5.webp',
  'https://builds.contra.com/e2d802cb3/assets/VAPOR_GRADIENT_SALMON_LIGHT@2x.0bb8ad9d.webp',
  'https://builds.contra.com/e2d802cb3/assets/VAPOR_GRADIENT_WATERMELON_DARK@2x.92227270.webp',
  'https://builds.contra.com/e2d802cb3/assets/VAPOR_GRADIENT_WATERMELON_LIGHT@2x.49a7b073.webp',
  'https://builds.contra.com/e2d802cb3/assets/VAPOR_GRADIENT_WHITE_DARK@2x.e68bc3f7.webp',
];

export function CreateProjectForm({ hide }: CreateProjectFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [formErrors, setFormErrors] = useState({
    title: '',
    description: '',
  });
  const [createProject, { loading }] = useCreateProjectMutation();

  const onSubmitHandler = async () => {
    if (!title && !description) {
      return setFormErrors({
        title: 'Title is required',
        description: 'Description is required',
      });
    }
    if (!title) {
      return setFormErrors((prev) => ({ ...prev, title: 'Title is required' }));
    }
    if (!description) {
      return setFormErrors((prev) => ({
        ...prev,
        description: 'Description is required',
      }));
    }

    const randomIndex = Math.floor(Math.random() * imagesObj.length); // Randomly returns an integer from 0 to 4
    const imageUrl = imagesObj[randomIndex] as string;
    const userId = '668ee510-4bfe-49fe-9552-a4becaf35c6c';
    const variables = { title, description, imageUrl, userId };

    try {
      await createProject({
        variables,
        refetchQueries: [namedOperations.Query.GetProjectsByUserId],
      });
      hide();
    } catch (err) {
      console.error(err);
    }
  };

  const handleChangeTitle = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(e.target.value);
    setFormErrors((prev) => ({ ...prev, title: '' }));
  };

  const handleChangeDescription = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(e.target.value);
    setFormErrors((prev) => ({ ...prev, description: '' }));
  };

  return (
    <Container>
      <HeaderTitle>Create a new project</HeaderTitle>
      <SubTitle>Fill out the form below to create a new project.</SubTitle>

      <FormContainer>
        <TextFieldTitle
          placeholder="Add a project title"
          maxLength={64}
          onChange={handleChangeTitle}
        />
        {formErrors.title && <ErrorMessage>{formErrors.title}</ErrorMessage>}
        <TextField>
          <TextFieldLabel>Preview Text</TextFieldLabel>
          <TextFieldArea
            placeholder="Add a short project description"
            onChange={handleChangeDescription}
          />
        </TextField>
        {formErrors.description && (
          <ErrorMessage>{formErrors.description}</ErrorMessage>
        )}

        <ButtonGroup>
          <Button
            label="Add project"
            isLoading={loading}
            onClickHandler={onSubmitHandler}
          />
          <Button label="Cancel" isCancel onClickHandler={hide} />
        </ButtonGroup>
      </FormContainer>
    </Container>
  );
}
