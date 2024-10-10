import * as sinon from "sinon";
import * as chai from "chai";

const chaiHttp = require('chai-http');

import { App } from '../app';
import MatchesSequelize from "../database/models/MatchesSequelize";
import {
  matchesWith0,
  matchesWith1,
  matchesWithFalse,
  matchesWithTrue
} from './mocks/matches';
import * as authMiddleware from "../middlewares/auth";

chai.use(chaiHttp);

const { app } = new App();
const { expect } = chai;

afterEach(() => sinon.restore());

describe('testando a rota matches', function() {
  it('Deve retornar todas as partidas', async function() {
    sinon.stub(MatchesSequelize, 'findAll').resolves(matchesWith0 as any);
    sinon.stub(authMiddleware, 'default').resolves();

    const { status, body } = await chai.request(app).get('/matches');

    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal(matchesWithFalse);
  });
  it('Deve retornar todas as partidas filtradas como false', async function() {
    sinon.stub(MatchesSequelize, 'findAll').resolves(matchesWith0 as any);
    sinon.stub(authMiddleware, 'default').resolves();

    const { status, body } = await chai.request(app).get('/matches').query({ inProgress: false});

    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal(matchesWithFalse);
  });
  it('Deve retornar todas as partidas filtradas como false', async function() {
    sinon.stub(MatchesSequelize, 'findAll').resolves(matchesWith1 as any);
    sinon.stub(authMiddleware, 'default').resolves();

    const { status, body } = await chai.request(app).get('/matches').query({ inProgress: true});

    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal(matchesWithTrue);
  });
})