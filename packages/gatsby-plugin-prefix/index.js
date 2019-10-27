const { useStaticQuery, graphql } = require("gatsby");

function usePrefix() {
  const { allPrefix } = useStaticQuery(graphql`
    {
      allPrefix {
        nodes {
          name
          value
        }
      }
    }
  `);

  const prefixObj = allPrefix.nodes.reduce((acc, v) => {
    acc[v.name] = v.value;
    return acc;
  }, {});

  return prefixObj;
}

exports.usePrefix = usePrefix;
