export const SIGN_UP_DATA_VALIDATOR = Symbol.for('SignUpDataValidator');

export const SignUpJsonSchema = {
  type: 'object',
  properties: {
    username: { type: 'string', allowEmpty: false },
    password: { type: 'string', allowEmpty: false },
    id: { type: 'string', allowEmpty: false, format: 'uuid' },
  },
  required: [
    'username',
    'password',
    'id',
  ],
  additionalProperties: false
};
