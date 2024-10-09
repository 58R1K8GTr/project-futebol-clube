import { expect } from 'chai';
import jwtToken from '../auth/jwtToken';
import { IUser } from '../Interfaces/IUser';

describe('Testes do jwtToken', function() {
  const mockPayload = {
    id: 1,
    data: { id: 1, role: 'admin', email: 'admin@teste.com' } as Pick<IUser, 'id' | 'role' | 'email'>,
  };

  it('Deve gerar um token JWT válido com sign', function() {
    const token = jwtToken.sign(mockPayload);
    expect(token).to.be.a('string');
  });

  it('Deve verificar e retornar o payload correto com verify', function() {
    const token = jwtToken.sign(mockPayload);
    const decoded = jwtToken.verify(token);
    expect(decoded).to.have.property('id', 1);
    expect(decoded.data).to.include({ role: 'admin', email: 'admin@teste.com' });
  });
});
