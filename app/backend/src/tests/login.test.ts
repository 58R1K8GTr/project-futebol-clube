import * as sinon from 'sinon';
import * as chai from 'chai';
import loginMock from './mocks/login';
import UsersSequelize from '../database/models/UsersSequelize';

const chaiHttp = require('chai-http');

import { App } from '../app';

chai.use(chaiHttp);

const { app } = new App();
const { expect } = chai;

afterEach(() => sinon.restore());

const passwordCripted = '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO';

describe('Testando a rota login', function() {
  it('Deve logar com sucesso e retornar o token', async function() {
    // não altere a ordem dos comandos abaixo
    const { validUser } = loginMock.user;
    const { email, password } = validUser;
    validUser.password = passwordCripted;
    sinon.stub(UsersSequelize, 'findOne')
      .resolves(validUser as any);
    const { status, body } = await chai.request(app).post('/login').send({ email, password });
    expect(status).to.be.equal(200);
    expect(body).to.have.key('token');
    expect(body.token).to.have.length(155);
  });
  it('Não deve logar com sucesso, email indefinido', async function() {
    // não altere a ordem dos comandos abaixo
    const emailUndefined = { email: undefined, password: 'secret_user'};
    const { email, password } = emailUndefined;
    emailUndefined.password = passwordCripted;
    sinon.stub(UsersSequelize, 'findOne')
      .resolves(emailUndefined as any);
    const { status, body } = await chai.request(app).post('/login').send({ email, password });
    expect(status).to.be.equal(400);
    expect(body).to.have.key('message');
    expect(body.message).to.be.equal('All fields must be filled');
  });
  it('Não deve logar com sucesso, senha indefinida', async function() {
    // não altere a ordem dos comandos abaixo
    const passwordUndefined = { email: 'user@user.com', password: undefined};
    const { email, password } = passwordUndefined;
    sinon.stub(UsersSequelize, 'findOne')
      .resolves(passwordUndefined as any);
    const { status, body } = await chai.request(app).post('/login').send({ email, password });
    expect(status).to.be.equal(400);
    expect(body).to.have.key('message');
    expect(body.message).to.be.equal('All fields must be filled');
  });
  it('Não deve logar com sucesso, password errado', async function() {
    // não altere a ordem dos comandos abaixo
    const wrongPassword = loginMock.user.invalidPasswordUsers[0];
    const { email, password } = wrongPassword;
    sinon.stub(UsersSequelize, 'findOne')
      .resolves(wrongPassword as any);
    const { status, body } = await chai.request(app).post('/login').send({ email, password });
    expect(status).to.be.equal(401);
    expect(body).to.have.key('message');
    expect(body.message).to.be.equal('Invalid email or password');
  })
})