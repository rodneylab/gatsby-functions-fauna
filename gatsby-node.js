const { createNodeHelpers } = require('gatsby-node-helpers');
const faunadb = require('faunadb');

const { GATSBY_FAUNA_SECRET } = process.env;

const getComments = async ({ secret, reporter }) => {
  try {
    const q = faunadb.query;
    const client = new faunadb.Client({
      secret,
    });
    const results = await client.query(
      // Search for the get-comments index and filter for data.markedSpam set to false
      q.Paginate(q.Match(q.Index('get-comments'), false)),
    );
    console.log(JSON.stringify(results, null, 2));
    return results.data.map(([ref, date, name, parentCommentId, slug, text]) => ({
      id: ref.id,
      date,
      name,
      parentCommentId: parentCommentId || null,
      slug,
      text,
    }));
  } catch (error) {
    reporter.warn(error);
  }
  return {};
};

exports.sourceNodes = async ({
  actions,
  createNodeId,
  createContentDigest,
  reporter,
}) => {
  const nodeHelpers = createNodeHelpers({
    typePrefix: 'Comment',
    createNodeId,
    createContentDigest,
  });
  const CommentEntryNode = nodeHelpers.createNodeFactory('Entry');
  const { createNode, createTypes } = actions;

  const typeDefs = `
    type CommentEntry implements Node {
      id: String
      date: Date @dateformat
      name: String
      parentCommentId: String
      text: String
      slug: String
    }
  `;
  createTypes(typeDefs);

  const comments = await getComments({
    secret: GATSBY_FAUNA_SECRET,
    reporter,
  });
  if (comments !== null) {
    comments.forEach(async (element) => {
      const node = CommentEntryNode({
        ...element,
      });
      createNode(node);
    });
  }
};
