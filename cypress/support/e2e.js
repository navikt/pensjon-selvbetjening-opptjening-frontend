// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

require('cypress-failed-log')
// cypress/plugins/index.js
module.exports = (on, config) => {
    on('task', {
        failed: require('cypress-failed-log/src/failed')(),
    })
}

Cypress.on('uncaught:exception', (err) => {
  if (
    err.stack?.includes(
      'representasjon-banner-frontend-borger'
    )
  ) {
    // prevents Representasjon banner errors to fail tests
    return false
  }
  return true
})
