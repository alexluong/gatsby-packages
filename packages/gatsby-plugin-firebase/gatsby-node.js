exports.onCreateWebpackConfig = ({ plugins, actions }, pluginOptions) => {
  const {
    credentials: {
      apiKey,
      authDomain,
      databaseURL,
      projectId,
      storageBucket,
      messagingSenderId,
      appId,
      measurementId
    }
  } = pluginOptions;

  actions.setWebpackConfig({
    plugins: [
      plugins.define({
        "process.env": {
          FIREBASE_API_KEY: JSON.stringify(apiKey),
          FIREBASE_AUTH_DOMAIN: JSON.stringify(authDomain),
          FIREBASE_DATABASE_URL: JSON.stringify(databaseURL),
          FIREBASE_PROJECT_ID: JSON.stringify(projectId),
          FIREBASE_STORAGE_BUCKET: JSON.stringify(storageBucket),
          FIREBASE_MESSAGING_SENDER_ID: JSON.stringify(messagingSenderId),
          FIREBASE_APP_ID: JSON.stringify(appId),
          FIREBASE_MEASUREMENT_ID: JSON.stringify(measurementId)
        }
      })
    ]
  });
};
