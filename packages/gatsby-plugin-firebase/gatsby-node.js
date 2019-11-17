const ERROR_MESSAGE = `For "gatsby-plugin-firebase", you must pass a valid option field "features".

Here is a sample valid set up:

  {
    resolve: "gatsby-plugin-firebase",
    options: {
      features: {
        auth: true,
        database: true,
        firestore: false,
        storage: false,
        messaging: false,
        functions: true,
        performance: false,
        analytics: false,
      },
    },
  },

Learn more at https://github.com/alexluong/gatsby-plugin-firebase.
`

exports.onPreBootstrap = ({ reporter }, options) => {
  if (!options.features) {
    reporter.panic(ERROR_MESSAGE)
  }

  const { features } = options

  if (
    !features.auth &&
    !features.database &&
    !features.firestore &&
    !features.storage &&
    !features.messaging &&
    !features.functions &&
    !features.performance && 
    !features.analytics
  ) {
    reporter.panic(ERROR_MESSAGE)
  }
}
