import bcrypt from 'bcryptjs';
const hash = await bcrypt.hash('catresclinicos123', 10);
console.log(hash);
