import React, { Component } from 'react';
import { ViewController, withNavigationViewController } from '@atlaskit/navigation-next';
import { Switch, Route } from 'react-router-dom';
import { Query } from 'react-apollo';

import homeView from './components/navigation/product/homeView';
import WidgetsHome from './WidgetsHome';

class WidgetsContainer extends Component<{
  navigationViewController: ViewController,
}> {
  componentDidMount() {
    const { navigationViewController } = this.props;
    navigationViewController.setView(homeView.id);
  }

  render() {
    return (
      <WidgetsHome />
    );
  }
}
const WidgetsWithNavigationProvider = withNavigationViewController(WidgetsContainer);

export default WidgetsWithNavigationProvider;
