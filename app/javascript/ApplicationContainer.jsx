import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { Spin } from 'antd';

import UserActions from './actions/UserActions';
import Dashboard from './Dashboard';


const ApplicationContainer = props => (
  <Query query={UserActions.getCurrentUser}>
    {({ loading, error, data }) => {
      if (loading) return <Spin />;
      if (error) return `Error! ${error.message}`;

      return (
        <Dashboard currentUser={data.currentUser} />
      );
    }}
  </Query>
);

export default ApplicationContainer;
