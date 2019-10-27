const crypto = require("crypto");

exports.sourceNodes = ({ actions, createNodeId }, pluginOptions) => {
  delete pluginOptions.plugins;

  const { createNode } = actions;

  const prefixes = Object.keys(pluginOptions).map(key => ({
    name: key,
    value: pluginOptions[key]
  }));

  prefixes.forEach(prefix => {
    createNode({
      ...prefix,
      id: createNodeId(`${prefix.name} >>> Prefix`),
      parent: null,
      children: [],
      internal: {
        type: "Prefix",
        content: JSON.stringify(prefix),
        contentDigest: crypto
          .createHash("md5")
          .update(JSON.stringify(prefix))
          .digest("hex")
      }
    });
  });
};
