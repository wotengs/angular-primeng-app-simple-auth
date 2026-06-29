export const APPLICATION_VALIDATION_MESSAGES = {
  emailAddress: [
    { type: 'required', message: 'Email address is required' },
    { type: 'email', message: 'Email should be valid' },
  ],

  fullName: [
    { type: 'required', message: 'Full name is required' },
    {
      type: 'fullName',
      message: 'Name can only contain letters, spaces, hyphens, and apostrophes',
    },
  ],

  password: [
    { type: 'required', message: 'Password is required' },
    { type: 'minlength', message: 'Password must be at least 8 characters' },
  ],
  confirmPassword: [
    { type: 'required', message: 'Please confirm your password' },
    { type: 'minlength', message: 'Password must be at least 8 characters' },
    { type: 'passwordMismatch', message: 'Passwords should match' },
  ],
};
