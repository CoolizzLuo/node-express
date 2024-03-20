import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SALT_ROUNDS = 10;

let user = {} as { [key: string]: { username: string; password: string } };

const signup = async (email: string, password: string) => {
  console.log('email', email);
  console.log('password', password);

  if (user[email]) {
    // throw new Error('User already exists');
    return false;
  }
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  user[email] = { username: email, password: hashedPassword };
  return true;
};

const signin = async (email: string, password: string) => {
  const userData = user[email];
  if (!userData) {
    throw new Error('User not found');
  }
  const isPasswordCorrect = await bcrypt.compare(password, userData.password);
  if (!isPasswordCorrect) {
    throw new Error('Invalid password');
  }

  const payload = { email: userData.username };
  const secret = process.env.JWT_SECRET || 'secret';

  const token = jwt.sign(payload, secret, { expiresIn: '1d' });
  return token;
};

export default { signup, signin };
