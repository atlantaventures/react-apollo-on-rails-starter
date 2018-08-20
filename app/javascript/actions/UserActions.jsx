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
    ) {
      updateUser(
        userId: $userId,
        email: $email,
        firstName: $firstName,
        lastName: $lastName,
        username: $username,
        password: $password,
      ) {
        user {
          id
          email
          firstName
          lastName
          username
        }
      }
    }
  `,
};

export default UserActions;
