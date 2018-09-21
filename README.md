# README

## General
This project is an example of a SaaS app, using the following tech (and more):

* Rails
  * [graphql-ruby](http://graphql-ruby.org/)
  * Devise
  * Rollbar
* React
  * [Apollo](https://www.apollographql.com/docs/react/)
  * [Atlaskit](https://atlaskit.atlassian.com/)

This project is intended to be used as a reference or starter app. In no way is it intended to have 100% functionality.

## Why React/Apollo/Rails?
Rails has been around since 2005, and now has a good spread of dependable gems and ecosystem. Ruby is an eloquent language that is easy to read and is fairly powerful out of the box. React fills some of the gaps that Rails has. GraphQL (via [Apollo](https://www.apollographql.com/docs/react/)) is a flexible way to build an API to power a React front-end without having to define a bunch of routes.

## Authentication
Authentication is done through Devise - while it would be smoother UX to implement a solution on the SPA side, handling authentication before serving the SPA pack reduces complexity. There's also so many plugins for Devise that leveraging the existing ecosystem makes sense.

With the assumption that a user is logged in, we don't have to worry about a non-logged-in state when working in React.

Make sure to pass along your cookies + CSRF token to the GraphQL endpoint. `rails-ujs` does [something similar](https://github.com/rails/rails/blob/ad3a47759e67a411f3534309cdd704f12f6930a7/actionview/app/assets/javascripts/utils/csrf.coffee) with the CSRF token.

```js
const httpLink = createHttpLink({
  uri: '/graphql',
  credentials: 'same-origin',
});

const authLink = setContext((_, { headers }) => (
  {
    headers: {
      ...headers,
      'X-CSRF-TOKEN': document.getElementsByName('csrf-token')[0].getAttribute('content'),
    },
  }
));
```

## Navigation
Using the [navigation-next](https://atlaskit.atlassian.com/packages/core/navigation-next) package, there's a 3-tier navigation: `Global`, `Product`, `Container`.

* `Global` refers to the top-most (or left-most) nav bar, e.g. Search, User Menu, +Add Widget.
* `Product` refers to general sections that would be in your app, e.g. Dashboards, Reports, Widgets. This menu can go away if there's a more specific container menu for a view.
* `Container` refers to a navigation that is specific to one section, e.g. Square Widgets, Circle Widgets. This menu can take priority over the product menu if necessary.

## GDPR
* Wanted to build things with GDPR in mind
* A [solid guide from HubSpot](https://www.hubspot.com/data-privacy/gdpr/product-readiness)
* Removed `trackable` and made `email` optional, added `username` for users (Devise)
* added relationships to turn on/off individual communications. add a `CommunicationMethod` and use `user.can_send?(method_id)` to determine if a user can be communicated with that method. Everything is default off.

`CommunicationChannel` is a specific comm method, that is of a general category (e.g. email, sms, phone)
`CommunicationMethod` is a specific comm type (e.g. weekly email summary) that is sent over a certain channel.

To add a new `CommunicationMethod`:
```ruby
channel = CommunicationChannel.find_by(category: :email)
CommunicationMethod.create({
  communication_channel: channel,
  name: 'Monthly Marketing Newsletter',
  description: "A newsletter covering best practices, new features, and blog content",
})
```

Afterwards, the Monthly Marketing Newsletter job should check for permission before sending:
```ruby
user = User.find(1)
comm_method = CommunicationMethod.find(5)
if user.can_send?(comm_method.id)
  send_report(user)
  # do_other_stuff
end
```

### GDPR-TODO
* Add support for user account deletion (right to be forgotten)
* Add privacy notice and detail what information is used for what


## GraphQL
Here's a sample query you can run outside of the application, inside of your local [GraphiQL](https://github.com/graphql/graphiql) (after logging in, go to http://localhost:3000/graphiql)

```gql
query {
  communicationMethods {
    id
    name
    description
    communicationChannel {
      category
      name
    }
  }
}
```

## YOU-DO
* grep `react_apollo_on_rails_starter` and `ReactApolloOnRailsStarter` and replace with your app name, if you're using this as a starter.
* set `ENV['ROLLBAR_ACCESS_TOKEN']` (sign up for Rollbar first)

## TODO
* Add `Organization` -> `Users` hierarchy
