import * as sinon from "sinon";
import * as chai from "chai";

const chaiHttp = require('chai-http');

import { App } from '../app';
import MatchesSequelize from "../database/models/MatchesSequelize";
import matches from './mocks/matches';
import * as authMiddleware from "../middlewares/auth";

chai.use(chaiHttp);

const { app } = new App();
const { expect } = chai;

afterEach(() => sinon.restore());

describe('testando a rota matches', function() {
  it('Deve retornar todas as partidas', async function() {
    sinon.stub(MatchesSequelize, 'findAll').resolves(matches as any);
    sinon.stub(authMiddleware, 'default').resolves();
    
    const { status, body } = await chai.request(app).get('/matches');

    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal(matches);
  })
})