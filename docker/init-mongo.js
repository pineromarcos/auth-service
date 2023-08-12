db = db.getSiblingDB('auth-db');
db.createUser({
  user: 'dev',
  pwd: 'dev',
  roles: [{ role: 'readWrite', db: 'auth-db' }],
});