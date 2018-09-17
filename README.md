# README

## Base technology
* [graphql-ruby](http://graphql-ruby.org/)
* React
* [Apollo](https://www.apollographql.com/docs/react/)
* [Atlaskit](https://atlaskit.atlassian.com/)

## GDPR
* a [solid guide from HubSpot](https://www.hubspot.com/data-privacy/gdpr/product-readiness)
* removed `trackable` and made `email` optional, added `username` for users (Devise)
* added relationships to turn on/off individual communications. add a `CommunicationMethod` and use `user.can_send?(method_id)` to determine if a user can be communicated with that method. Everything is default off.

## TODO
* grep `react_apollo_on_rails_starter` and `ReactApolloOnRailsStarter` and replace with your app name
* set `ENV['ROLLBAR_ACCESS_TOKEN']` (sign up for Rollbar first)
