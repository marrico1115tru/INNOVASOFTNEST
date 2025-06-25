import * as bcrypt from 'bcrypt';

async function generarHash() {
  const plainPassword = '1111'; // 👈 IMPORTANTE: exactamente 1234
  const hash = await bcrypt.hash(plainPassword, 10);
  console.log('🔐 Hash generado para "1111":', hash);
}

generarHash();
