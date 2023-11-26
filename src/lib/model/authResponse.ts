class AuthResponse {
  constructor(
    public id: string,
    public userName: string,
    public email: string,
    public roles: string[]
  ) {}
}

export default AuthResponse;