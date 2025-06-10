export const types = `#graphql
    type User {
        id: ID!
        firstName: String!
        lastName: String
        email: String!
        profileImageURL: String

        followers: [User]
        following: [User]

        recommendedUsers: [User]

        threads: [Thread]
    }

    type Thread {
    id: ID!
    content: String!
    imageURL: String
    code: String
    author: User!
    createdAt: String!
    updatedAt: String!
  }

  input CreateThreadPayload {
    content: String!
    imageURL: String
    code: String
  }
`;