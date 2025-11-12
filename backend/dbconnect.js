import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// ✅ ต้องใช้ open() แล้ว return ออกมา
const dbPromise = open({
  filename: './database.db',
  driver: sqlite3.Database,
});

export default dbPromise;
