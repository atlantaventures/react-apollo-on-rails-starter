import gql from 'graphql-tag';

const CommunicationPreferenceActions = {
  getAvailableCommunicationMethods: gql`
    query getAvailableCommunicationMethods {
      communicationMethods {
        id
        name
        description
      }
    }
  `,
};

export default CommunicationPreferenceActions;
