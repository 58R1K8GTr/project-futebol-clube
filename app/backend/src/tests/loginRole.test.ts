import * as sinon from 'sinon';
import * as chai from 'chai';
// import loginMock from './mocks/login';
import UsersSequelize from '../database/models/UsersSequelize';
import jwtUtil from '../auth/jwtToken';

const chaiHttp = require('chai-http');

import { App } from '../app';
import jwtToken from '../auth/jwtToken';

chai.use(chaiHttp);

const { app } = new App();
const { expect } = chai;

afterEach(() => sinon.restore());

const passwordCriptedUser = '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO';
const passwordCriptedAdmin = '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW';
const validToken = 'token_válido_mockado';

describe('testando a rota role', function() {
  it('Deve retornar um role com sucesso', async function() {
    const userRole = 'admin';
    sinon.stub(jwtToken, 'verify').resolves(
      { data: { id: 1, role: userRole, email: 'admin@admin.com' } }
    );
    sinon.stub(UsersSequelize, 'findOne').resolves(
      { id: 1, role: userRole, email: 'admin@admin.com' } as any
    );

    const { status, body } = await chai.request(app)
      .get('/login/role')
      .set('Authorization', `Bearer ${validToken}`);

    expect(status).to.be.equal(200);
    expect(body).to.have.property('role', userRole);
  });
  it('Deve retornar um erro caso usuário não encontrado', async function() {
    const userRole = 'admin';
    sinon.stub(jwtToken, 'verify').resolves(
      { data: { id: 1, role: userRole, email: 'admin@admin.com' } }
    );
    sinon.stub(UsersSequelize, 'findOne').resolves(null as any);

    const { status, body } = await chai.request(app)
      .get('/login/role')
      .set('Authorization', `Bearer ${validToken}`);

    expect(status).to.be.equal(401);
    expect(body).to.have.property('message', 'Token must be a valid token');
  });
  it('Deve retornar um erro caso jwtUtil não consiga descriptografar', async function() {
    const userRole = 'admin';
    sinon.stub(UsersSequelize, 'findOne').resolves(null as any);

    const { status, body } = await chai.request(app)
      .get('/login/role')
      .set('Authorization', `Bearer ${validToken}`);

    expect(status).to.be.equal(401);
    expect(body).to.have.property('message', 'Token must be a valid token');
  });
  it('Deve retornar um erro caso não venha o token no autorization', async function() {
    const userRole = 'admin';

    const { status, body } = await chai.request(app)
      .get('/login/role')
      .set('Authorization', '');

    expect(status).to.be.equal(401);
    expect(body).to.have.property('message', 'Token must be a valid token');
  });
})