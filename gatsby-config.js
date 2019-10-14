require("dotenv").config();

module.exports = {
  plugins: [
    {
      resolve: "gatsby-plugin-firebase",
      options: {
        features: {
          database: true
        }
      }
    }
  ]
};
