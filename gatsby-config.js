/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

const path = require('path');

const postCssPlugins = require('./postcss-config.js');

const maxImageWidth = 672;
const website = require('./config/website');

module.exports = {
  flags: {
    FUNCTIONS: true,
  },
  siteMetadata: {
    siteLanguage: website.siteLanguage,
    siteTitle: website.siteTitle,
    siteUrl: website.siteUrl,

    contactEmailAddress: website.contactEmailAddress,
    facebookPage: `https://www.facebook.com/${website.facebookPage}`,
    facebookPageName: website.facebookPage,
    githubPage: website.githubPage,
    linkedinProfile: website.linkedinProfile,
    telegramUsername: website.telegramUsername,
    twitterUserId: website.twitterUserId,
    twitterUsername: website.twitterUsername,
    wireUsername: website.wireUsername,
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        postCssPlugins: [...postCssPlugins],
        sassOptions: {
          precision: 4,
        },
      },
    },
    {
      resolve: 'gatsby-plugin-gatsby-cloud',
      options: {
        headers: {
          '/': [
            'Permissions-Policy: accelerometer=(), autoplay=(), camera=(), document-domain=(), encrypted-media=(), fullscreen=(), gyroscope=(), interest-cohort=(), magnetometer=(), microphone=(), midi=(), payment=(), picture-in-picture=(), publickey-credentials-get=(), sync-xhr=(), usb=(), xr-spatial-tracking=(), geolocation=()',
            'Strict-Transport-Security: max-age=31536000; includeSubDomains; preload',
            'X-Robots-Tag: index',
          ],
        },
        mergeSecurityHeaders: true,
        mergeLinkHeaders: true,
        mergeCachingHeaders: true,
        transformHeaders: (headers) => headers,
        generateMatchPathRewrites: true,
      },
    },
    'gatsby-plugin-image',
    {
      resolve: 'gatsby-plugin-sharp',
      options: {
        defaults: {
          placeholder: 'tracedSVG',
          formats: ['auto', 'webp', 'avif'],
          quality: 100,
          avifOptions: { lossless: true, quality: 100, speed: 0 },
          jpgOptions: { quality: 100, progressive: true },
          pngOptions: { quality: 100, compressionSpeed: 1 },
          webpOptions: { quality: 100 },
          tracedSVGOptions: {
            color: '#5cc8ff',
            background: '#fff275',
          },
        },
        defaultQuality: 100,
        stripMetadata: false,
        useMozJpeg: true,
      },
    },
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-remark-images',
      options: {
        linkImagesToOriginal: false,
        maxWidth: maxImageWidth,
        showCaptions: true,
      },
    },
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'blog',
        path: `${__dirname}/content/blog`,
      },
    },
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        defaultLayouts: {
          blog: path.resolve('./src/templates/blog-post.jsx'),
          default: path.resolve('./src/templates/blog-post.jsx'),
        },
        extensions: ['.mdx', '.md'],
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              linkImagesToOriginal: false,
              maxWidth: maxImageWidth,
              showCaptions: ['title'],
              withWebp: { quality: 100 },
              tracedSVG: { color: '#5cc8ff', background: '#fff275' },
            },
          },
        ],
        gatsbyRemarkPlugins: [],
      },
    },
  ],
};
