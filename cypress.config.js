const {
  defineConfig
} = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here

    },
    env: {
      validEmail: "nekimail@gmail.com",
      validPassword: "nekipassword1"
    },

    baseUrl: 'https://gallery-app.vivifyideas.com',
    //watchForFileChanges: false
  },
});