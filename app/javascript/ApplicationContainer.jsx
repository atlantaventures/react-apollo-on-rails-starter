import React, { Component } from 'react';
import {
  LayoutManagerWithViewController,
  NavigationProvider,
  ViewController,
  withNavigationViewController,
} from '@atlaskit/navigation-next';
import { Switch, Route } from 'react-router-dom';
import { Query } from 'react-apollo';
import Page, { Grid, GridColumn } from '@atlaskit/page';

import UserActions from './actions/UserActions';
import GlobalAppNav from './components/navigation/GlobalAppNav';
import homeView from './components/navigation/product/homeView';
import issuesView from './components/navigation/product/issuesView';

import UserSettingsContainer from './UserSettingsContainer';

class App extends Component<{
  navigationViewController: ViewController,
}> {
  componentDidMount() {
    const { navigationViewController } = this.props;
    navigationViewController.addView(homeView);
    navigationViewController.addView(issuesView);
    navigationViewController.setView(homeView.id);
  }

  render() {
    return (
      <Query query={UserActions.getCurrentUser}>
        {({ loading, error, data }) => {
          if (loading) return 'Loading';
          if (error) return `Error! ${error.message}`;

          return (
            <LayoutManagerWithViewController globalNavigation={GlobalAppNav}>
              <Page>
                <Grid>
                  <GridColumn medium={12} spacing="comfortable">
                    <Switch>
                      <Route path="/my-settings">
                        <UserSettingsContainer currentUser={data.currentUser} />
                      </Route>
                    </Switch>
                  </GridColumn>
                </Grid>
              </Page>
            </LayoutManagerWithViewController>
          );
        }}
      </Query>
    );
  }
}
const AppWithNavigationViewController = withNavigationViewController(App);

export default () => (
  <NavigationProvider>
    <AppWithNavigationViewController />
  </NavigationProvider>
);
