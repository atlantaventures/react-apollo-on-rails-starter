import gql from 'graphql-tag';

const UserActions = {
  getCurrentUser: gql`
    query currentUser {
      currentUser {
        id
        username
        firstName
        lastName
        email
        communicationMethods {
          id
          name
          description
        }
      }
    }
  `,
  updateUser: gql`
    mutation updateUserMutation(
      $userId: ID!,
      $email: String,
      $firstName: String,
      $lastName: String,
      $username: String,
      $password: String,
      $communicationMethodIds: [ID!],
    ) {
      updateUser(
        userId: $userId,
        email: $email,
        firstName: $firstName,
        lastName: $lastName,
        username: $username,
        password: $password,
        communicationMethodIds: $communicationMethodIds,
      ) {
        errors
        user {
          id
          email
          firstName
          lastName
          username
          communicationMethods {
            id
          }
        }
      }
    }
  `,
};

export default UserActions;
