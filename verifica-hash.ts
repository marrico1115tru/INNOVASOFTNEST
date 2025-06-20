import * as bcrypt from 'bcrypt';

async function testHash() {
  const plainPassword = '12345';
  const hashGenerado = await bcrypt.hash(plainPassword, 10);

  console.log('🧪 Hash generado localmente:', hashGenerado);

  const isValid = await bcrypt.compare(plainPassword, hashGenerado);
  console.log('✅ ¿Contraseña válida?', isValid);
}

testHash();
