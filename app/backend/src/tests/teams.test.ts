import * as sinon from "sinon";
import * as chai from "chai";

const chaiHttp = require('chai-http');

import { App } from '../app';
import TeamsSequelize from '../database/models/TeamsSequelize';
import teams from './mocks/teams'

chai.use(chaiHttp);

const { app } = new App();
const { expect } = chai;

describe('Testando a rota teams', function() {
  it('Deve retornar todos os times', async function() {
    sinon.stub(TeamsSequelize, 'findAll').resolves(teams as any);

    const { status, body } = await chai.request(app).get('/teams');

    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal(teams);
  })
})