export const REGISTRATION_MUTATION = `
  mutation register($password: String!, $username: String!) {
    createUser(
      password: $password
      username: $username
    ) {
      user {
        id
      }
    }
  }
`

export interface REGISTRATION_MUTATION_VARIABLES {
  password: string,
  username: string,
}

export const LOGIN_MUTATION = `
  mutation getToken($password: String!, $username: String!) {
    tokenAuth(
      password: $password
      username: $username
    ) {
      token
    }
  }
`

export interface LOGIN_MUTATION_VARIABLES {
  password: string,
  username: string,
}