import React, { Component } from 'react';
import { ViewController, withNavigationViewController } from '@atlaskit/navigation-next';
import { Switch, Route } from 'react-router-dom';
import { Query } from 'react-apollo';

import homeView from './components/navigation/product/homeView';
import Dashboard from './Dashboard';

class DashboardContainer extends Component<{
  navigationViewController: ViewController,
}> {
  componentDidMount() {
    const { navigationViewController } = this.props;
    navigationViewController.setView(homeView.id);
  }

  render() {
    return (
      <Dashboard />
    );
  }
}
const DashboardWithNavigationProvider = withNavigationViewController(DashboardContainer);

export default DashboardWithNavigationProvider;
