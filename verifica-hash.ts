import * as bcrypt from 'bcrypt';

async function generarHash() {
  const plainPassword = '1234'; // 👈 IMPORTANTE: exactamente 1234
  const hash = await bcrypt.hash(plainPassword, 10);
  console.log('🔐 Hash generado para "1234":', hash);
}

generarHash();
