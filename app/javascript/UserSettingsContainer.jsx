import React from 'react';
import PropTypes from 'prop-types';
import { graphql, Query } from 'react-apollo';
import { message } from 'antd';

import UserActions from './actions/UserActions';
import CommunicationPreferenceActions from './actions/CommunicationPreferenceActions';
import UserSettingsForm from './UserSettingsForm';

class UserSettingsContainer extends React.Component {
  handleFormSubmit = (values, callback) => {
    this.props.updateUser({
      variables: {
        userId: this.props.currentUser.id,
        ...values,
      },
      //refetchQueries: UserActions.getCurrentUser,
    }).then(() => {
      message.success('Profile updated');
    });
  }

  render() {
    const { currentUser } = this.props;
    return (
      <div>
        <Query query={CommunicationPreferenceActions.getAvailableCommunicationMethods}>
          {({ loading, error, data }) => {
            if (loading) return "Loading...";
            if (error) return `Error! ${error.message}`;
            return (
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
            );
          }}
        </Query>
      </div>
    );
  }
}

UserSettingsContainer.propTypes = {
  currentUser: PropTypes.shape({
    username: PropTypes.string,
    firstName: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
  }).isRequired,
};

export default graphql(
  UserActions.updateUser, { name: 'updateUser' },
)(UserSettingsContainer);
