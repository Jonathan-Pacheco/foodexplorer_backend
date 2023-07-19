const createUsers = `
    CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR,
    email VARCHAR,
    password VARCHAR,
    role INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

  INSERT INTO users (name, email, password, role)
  select * from (
    SELECT 'Usuario', 'usuario@foodexplorer.com', '$2a$08$Qd8PpJOYguoy9IzA4FxKDuKj/quYskzFVPcu066but7J15JNB5/DS', '1'
    union all
    SELECT 'Admin', 'admin@foodexplorer.com', '$2a$08$Qd8PpJOYguoy9IzA4FxKDuKj/quYskzFVPcu066but7J15JNB5/DS', '2'
    ) a
  WHERE NOT EXISTS (SELECT 1 FROM users);
`;
 
 
 
module.exports = createUsers; 