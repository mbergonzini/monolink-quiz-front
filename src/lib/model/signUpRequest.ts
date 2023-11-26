class SignUpRequest {
  constructor(
    public userName: string,
    public email: string,
    public password: string,
  ) {}
}

export default SignUpRequest;