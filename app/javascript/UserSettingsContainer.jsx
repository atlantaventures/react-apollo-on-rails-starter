import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';
import { graphql, Query, compose } from 'react-apollo';

import PageHeader from '@atlaskit/page-header';
import { BreadcrumbsStateless } from '@atlaskit/breadcrumbs';
import {
  ViewController,
  withNavigationViewController,
} from '@atlaskit/navigation-next';

import UserActions from './actions/UserActions';
import CommunicationPreferenceActions from './actions/CommunicationPreferenceActions';
import UserSettingsForm from './UserSettingsForm';
import PrivacyForm from './components/Settings/PrivacyForm';

import LinkCrumb from './components/LinkCrumb';
import settingsContainerView from './components/navigation/container/settingsContainerView';

class UserSettingsContainerBase extends React.Component<{
  navigationViewController: ViewController,
}> {
  componentDidMount() {
    this.props.navigationViewController.setView(settingsContainerView.id);
  }

  handleAddBreadCrumb = (crumb) => {
    this.setState(prevState => { breadcrumbs: prevState.breadcrumbs.push(crumb) })
  }

  handleFormSubmit = (values, callback) => (
    this.props.updateUser({
      variables: {
        userId: this.props.currentUser.id,
        ...values,
      },
    })
  )

  handlePrivacyChange = communicationMethodId => (
    this.props.toggleUserCommunicationMethod({
      variables: { userId: this.props.currentUser.id, communicationMethodId },
    })
  )

  render() {
    const { currentUser } = this.props;
    return (
      <React.Fragment>
        <Query query={CommunicationPreferenceActions.getAvailableCommunicationMethods}>
          {({ loading, error, data }) => {
            if (loading) return 'Loading...';
            if (error) return `Error! ${error.message}`;
            return (
              <Switch>
                <Route path="/my-settings/privacy" exact>
                  <React.Fragment>
                    <PageHeader
                      breadcrumbs={(
                        <BreadcrumbsStateless onExpand={() => {}}>
                          <LinkCrumb to="/" text="Home" key="home" />
                          <LinkCrumb to="/my-settings/privacy" text="Settings - Privacy" key="settings-privacy" />
                        </BreadcrumbsStateless>
                      )}
                      actions={[]}
                      bottomBar={[]}
                    >
                      Privacy Settings
                    </PageHeader>
                    <PrivacyForm
                      availableCommunicationMethods={data.communicationMethods}
                      selectedCommunicationMethods={currentUser.communicationMethods.map(commMethod => commMethod.id)}
                      onChange={this.handlePrivacyChange}
                    />
                  </React.Fragment>
                </Route>
                <Route path="/my-settings/profile" exact>
                  <React.Fragment>
                    <PageHeader
                      breadcrumbs={(
                        <BreadcrumbsStateless onExpand={() => {}}>
                          <LinkCrumb to="/" text="Home" key="home" />
                          <LinkCrumb to="/my-settings/profile" text="Settings - Profile" key="settings-profile" />
                        </BreadcrumbsStateless>
                      )}
                      actions={[]}
                      bottomBar={[]}
                    >
                      Profile Settings
                    </PageHeader>
                    <UserSettingsForm
                      username={currentUser.username}
                      firstName={currentUser.firstName}
                      lastName={currentUser.lastName}
                      email={currentUser.email}
                      phone={currentUser.phone}
                      availableCommunicationMethods={data.communicationMethods}
                      selectedCommunicationMethods={currentUser.communicationMethods.map(commMethod => commMethod.id)}
                      emailOpt={currentUser.emailOpt}
                      onSubmit={this.handleFormSubmit}
                    />
                  </React.Fragment>
                </Route>
                <Route path="/my-settings" exact>
                  <Redirect to="/my-settings/profile" />
                </Route>
              </Switch>
            );
          }}
        </Query>
      </React.Fragment>
    );
  }
}

UserSettingsContainerBase.propTypes = {
  currentUser: PropTypes.shape({
    username: PropTypes.string,
    firstName: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
  }).isRequired,
};

const UserSettingsContainer = withNavigationViewController(UserSettingsContainerBase);

export default compose(
  graphql(UserActions.updateUser, { name: 'updateUser' }),
  graphql(CommunicationPreferenceActions.toggleUserCommunicationMethod, { name: 'toggleUserCommunicationMethod' }),
)(UserSettingsContainer);
