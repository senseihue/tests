declare global {
  interface ISignIn {
    profile: ISessionProfile
    token: string
  }
}

export class SignIn {
  hash: string = ""
  login: string = ""
  password: string = ""
}

export class ForgotPassword {
  hash: string = ""
  login: string = ""
}
