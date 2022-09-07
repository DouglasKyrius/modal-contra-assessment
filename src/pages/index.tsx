/* eslint-disable canonical/filename-match-exported */
import React from 'react';
import Head from 'next/head';
import type { NextPage } from 'next';
import styled from 'styled-components';
import tw from 'twin.macro';

// import { useGetUserQuery } from '@/lib/client/graphql/generated';
import { LoadingScreen } from '@/components/Loading';
const HomePage = React.lazy(() => import('@/containers/HomePage'));

const PageContainer = styled.div`
  ${tw`
    flex
    flex-1
    min-h-screen
    pt-16
    transition-all
    lg:pt-20
  `}
`;

const ContentContainer = styled.div`
  ${tw`
    flex-1
    w-full
    relative
  `}
`;

const Index: NextPage = () => {
  // const { data, loading } = useGetUserQuery({
  //   variables: {
  //     userId: '668ee510-4bfe-49fe-9552-a4becaf35c6c',
  //   },
  // });

  // if (loading) return <LoadingScreen />;
  // if (!data) return <h1>Error loading data...</h1>;

  return (
    <React.Fragment>
      <Head>
        <title>Projects created by Douglas Eduardo</title>
        <meta
          property="og:title"
          content="Projects created by Douglas Eduardo"
          key="title"
        />
        <link
          href="https://builds.contra.com/92361a558/favicon.svg"
          rel="icon"
          type="image/svg+xml"
        />
      </Head>

      <PageContainer>
        <ContentContainer>
          <React.Suspense fallback={<LoadingScreen />}>
            <HomePage />
          </React.Suspense>
        </ContentContainer>
      </PageContainer>
    </React.Fragment>
  );
};

export default Index;
