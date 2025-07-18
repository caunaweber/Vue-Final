const bcrypt = require('bcryptjs');

const senhaPlana = '123456';
const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync(senhaPlana, salt);

console.log('Senha Plana:', senhaPlana);
console.log('Hash Gerado (copie este valor):', hash);