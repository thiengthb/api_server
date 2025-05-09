import bcrypt from 'bcryptjs';

const users = [];

const initUsers = async () => {
  const hashedPassword = await bcrypt.hash('1', 10);
  users.push({
    id: '1',
    name: 'Admin',
    email: 'admin@gmail.com',
    password: hashedPassword
  });
};

await initUsers();

export default users;
