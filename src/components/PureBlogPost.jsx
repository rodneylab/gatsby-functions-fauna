import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'gatsby';
import { MDXProvider } from '@mdx-js/react';
import PropTypes from 'prop-types';

import BannerImage from './BannerImage';
import CommentForm from './CommentForm';
import Comments from './Comments';

import { ExternalLink, TwitterMessageLink } from './Link';
import { PureLayout as Layout } from './Layout';
import { PureSEO as SEO } from './SEO';

const shortcodes = {
  ExternalLink,
  Link,
  TwitterMessageLink,
};

const PureBlogPost = ({ children, data }) => {
  const { comments } = data;
  const { frontmatter, slug } = data.post;
  const {
    bannerImage, featuredImageAlt, seoMetaDescription, postTitle,
  } = frontmatter;
  const { siteUrl } = data.site.siteMetadata;

  return (
    <>
      <SEO data={data} title={postTitle} metadescription={seoMetaDescription} />
      <Helmet>
        <link rel="canonical" href={`${siteUrl}/${slug}`} />
      </Helmet>
      <Layout data={data}>
        <article>
          <h1>{postTitle}</h1>
          <BannerImage imageData={bannerImage} alt={featuredImageAlt} />
          <section itemProp="articleBody">
            <MDXProvider components={shortcodes}>{children}</MDXProvider>
          </section>
          <section>
            <CommentForm slug={slug} />
            {comments.edges.length > 0 ? <Comments comments={comments.edges} /> : null}
          </section>
        </article>
      </Layout>
    </>
  );
};

PureBlogPost.propTypes = {
  data: PropTypes.shape({
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        siteUrl: PropTypes.string,
      }),
    }),
    comments: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            commentId: PropTypes.string,
            date: PropTypes.string,
            name: PropTypes.string,
            text: PropTypes.text,
          }),
        }),
      ),
    }),
    post: PropTypes.shape({
      slug: PropTypes.string,
      frontmatter: PropTypes.shape({
        postTitle: PropTypes.string,
        featuredImageAlt: PropTypes.string,
        seoMetaDescription: PropTypes.string,
        bannerImage: PropTypes.shape({
          localFile: PropTypes.shape({
            childImageSharp: PropTypes.shape({
              gatsbyImageData: PropTypes.shape({
                layout: PropTypes.string,
              }),
            }),
          }),
        }).isRequired,
      }),
    }),
  }).isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export { PureBlogPost as default };
