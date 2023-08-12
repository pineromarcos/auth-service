export const CREDENTIALS_DATA_VALIDATOR = Symbol.for('CredentialsDataValidator');

export const CredentialsJsonSchema = {
  type: 'object',
  properties: {
    username: { type: 'string', allowEmpty: false },
    password: { type: 'string', allowEmpty: false },
  },
  required: [
    'username',
    'password'
  ],
  additionalProperties: false
};
