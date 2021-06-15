import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';

import BlogRoll from '../components/BlogRoll';
import Card from '../components/Card';
import { PureLayout as Layout } from '../components/Layout';
import { PureSEO as SEO } from '../components/SEO';
import { ExternalLink } from '../components/Link';

export default function Home({ data }) {
  return (
    <>
      <SEO
        data={data}
        title="Home"
        metadescription="Climate - Gatsby v3 Starter for MDX Gatsby Blog"
      />
      <Layout data={data}>
        <>
          <header>
            <h1>Gatsby Functions Fauna Demo</h1>
            <p>
              This is a demo site for showing how the{' '}
              <ExternalLink aria-label="Learn more about Fauna" href="https://fauna.com/">
                Fauna data API
              </ExternalLink>{' '}
              can be used with{' '}
              <ExternalLink
                aria-label="Learn more about Gatsby Functions"
                href="https://www.gatsbyjs.com/functions/"
              >
                brand new Gatsby Serverless Functions
              </ExternalLink>
              . Click on one of the blog posts below and then add a comment to the post. If your
              comment passes spam detection, a brand new static site, including your comment will
              build automatically. Keeping everything static keeps the page fast. We eliminate the
              need for using Java Script heavy, external services for managing the comments. API
              calls to Fauna are only invoked by the build server and serverless functions, freeing
              up resources on the user&apos;s device and creating a top notch user experience. Site
              is based on{' '}
              <ExternalLink
                aria-label="Open Gatsby starter Climate repo"
                href="https://github.com/rodneylab/gatsby-starter-climate"
              >
                gatsby-starter-climate
              </ExternalLink>
              . Code for this site is{' '}
              <ExternalLink
                aria-label="Open site code repo"
                href="https://github.com/rodneylab/gatsby-functions-fauna"
              >
                on the Rodney Lab GitHub site
              </ExternalLink>
              .
            </p>
            <p>
              Read more{' '}
              <ExternalLink
                aria-label="Open Rodney Lab post on Gatsby Cloud Functions"
                href="https://rodneylab.com/gatsby-cloud-functions-recaptcha/"
              >
                about how to use Gatsby Cloud Functions
              </ExternalLink>
              .
            </p>
          </header>
          <Card>
            <h2>About me</h2>
            <p>
              I live and breathe analogue photography. I show you my favourite analogue film cameras
              on this site. Hopefully if you are not into analogue photography yet, some of my
              enthusiasm will rub off onto you.
            </p>
          </Card>
          <BlogRoll />
        </>
      </Layout>
    </>
  );
}

Home.propTypes = {
  data: PropTypes.shape({
    site: PropTypes.shape({
      buildTime: PropTypes.string,
    }),
  }).isRequired,
};

export const query = graphql`
  query Home {
    site {
      ...LayoutFragment
      ...SEOFragment
    }
    ...BlogRollFragment
  }
`;
