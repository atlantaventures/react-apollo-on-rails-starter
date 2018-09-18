# README

## General
* Rails
  * [graphql-ruby](http://graphql-ruby.org/)
  * Devise
  * Rollbar
* React
  * [Apollo](https://www.apollographql.com/docs/react/)
  * [Atlaskit](https://atlaskit.atlassian.com/)

## Navigation
Using the [navigation-next](https://atlaskit.atlassian.com/packages/core/navigation-next) package, there's a 3-tier navigation: `Global`, `Product`, `Container`.

`Global` refers to the top-most (or left-most) nav bar, e.g. Search, User Menu, +Add Widget.

`Product` refers to general sections that would be in your app, e.g. Dashboards, Reports, Widgets. This menu can go away if there's a more specific container menu for a view.

`Container` refers to a navigation that is specific to one section, e.g. Square Widgets, Circle Widgets. This menu can take priority over the product menu if necessary.

## GDPR-ish
* a [solid guide from HubSpot](https://www.hubspot.com/data-privacy/gdpr/product-readiness)
* removed `trackable` and made `email` optional, added `username` for users (Devise)
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

## YOUDO
* grep `react_apollo_on_rails_starter` and `ReactApolloOnRailsStarter` and replace with your app name
* set `ENV['ROLLBAR_ACCESS_TOKEN']` (sign up for Rollbar first)

## TODO
* Add support for account deletion (right to be forgotten)
* Add `Organization` -> `Users` hierarchy
