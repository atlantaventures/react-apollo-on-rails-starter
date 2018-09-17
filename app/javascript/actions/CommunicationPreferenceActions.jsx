import gql from 'graphql-tag';

const CommunicationPreferenceActions = {
  getAvailableCommunicationMethods: gql`
    query getAvailableCommunicationMethods {
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
  `,
  toggleUserCommunicationMethod: gql`
    mutation toggleUserCommunicationMethod($userId: ID!, $communicationMethodId: ID!) {
      toggleUserCommunicationMethod(userId: $userId, communicationMethodId: $communicationMethodId) {
        communicationMethod {
          id
          name
        }
        enabled
        errors
      }
    }
  `,
};

export default CommunicationPreferenceActions;
