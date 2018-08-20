import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { message } from 'antd';

import UserActions from './actions/UserActions';
import UserSettingsForm from './UserSettingsForm';

class UserSettingsContainer extends React.Component {
  handleFormSubmit = (values, callback) => {
    this.props.updateUser({
      variables: {
        userId: this.props.currentUser.id,
        ...values,
      },
    }).then(() => {
      message.success('Profile updated');
    });
  }

  render() {
    const { currentUser } = this.props;
    return (
      <div>
        <UserSettingsForm
          username={currentUser.username}
          firstName={currentUser.firstName}
          lastName={currentUser.lastName}
          email={currentUser.email}
          phone={currentUser.phone}
          emailSelections={currentUser.emailSelections}
          emailOpt={currentUser.emailOpt}
          onSubmit={this.handleFormSubmit}
        />
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
