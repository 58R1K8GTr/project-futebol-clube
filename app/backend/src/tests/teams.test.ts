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
  it('Deve retornar todos os times na rota /teams', async function() {
    sinon.stub(TeamsSequelize, 'findAll').resolves(teams as any);

    const { status, body } = await chai.request(app).get('/teams');

    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal(teams);
  });

  it('Deve retornar um time específico na rota /teams/:id', async function() {
    sinon.stub(TeamsSequelize, 'findByPk').resolves(teams[0] as any);

    const { status, body } = await chai.request(app).get('/teams/1');

    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal(teams[0]);
  });

  it('Não deve retornar um time específico na rota /teams/:id', async function() {
    sinon.stub(TeamsSequelize, 'findByPk').resolves(null);

    const { status, body } = await chai.request(app).get('/teams/1');

    expect(status).to.be.equal(404);
    expect(body).to.be.equal({ message: 'Team not found' });
  });
})