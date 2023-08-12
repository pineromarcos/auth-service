db = db.getSiblingDB('example-db');
db.createUser({
  user: 'dev',
  pwd: 'dev',
  roles: [{ role: 'readWrite', db: 'example-db' }],
});