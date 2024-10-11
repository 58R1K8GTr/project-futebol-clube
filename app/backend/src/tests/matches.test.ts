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
import authMiddleware, * as authMiddlewareModule from "../middlewares/auth";
import * as verifyAdminModule from "../middlewares/verifyAdmin";
import { Request, Response } from "express";

chai.use(chaiHttp);

const { app } = new App();
const { expect } = chai;

afterEach(() => sinon.restore());

describe('testando a rota matches', function() {
  it('Deve retornar todas as partidas', async function() {
    sinon.stub(MatchesSequelize, 'findAll').resolves(matchesWith0 as any);
    sinon.stub(authMiddlewareModule, 'default').resolves();

    const { status, body } = await chai.request(app).get('/matches');

    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal(matchesWithFalse);
  });
  it('Deve retornar todas as partidas filtradas como false', async function() {
    sinon.stub(MatchesSequelize, 'findAll').resolves(matchesWith0 as any);
    sinon.stub(authMiddlewareModule, 'default').resolves();

    const { status, body } = await chai.request(app).get('/matches').query({ inProgress: 'false'});

    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal(matchesWithFalse);
  });
  it('Deve retornar todas as partidas filtradas como true', async function() {
    sinon.stub(MatchesSequelize, 'findAll').resolves(matchesWith1 as any);
    sinon.stub(authMiddlewareModule, 'default').resolves();

    const { status, body } = await chai.request(app).get('/matches').query({ inProgress: 'true' });

    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal(matchesWithTrue);
  });
  // it('17 - finalizando uma partida', async function() {
  //   sinon.stub(MatchesSequelize, 'update').resolves([1] as any);
  //   const authMockado = sinon.stub(authMiddlewareModule, 'default')
  //   .callsFake(
  //     async (req, res, next) => { next(); console.log('foi chamado'); }
  //   );
  //   sinon.stub(verifyAdminModule, 'default').resolves();
    
  //   const { status, body } = await chai
  //   .request(app)
  //   .patch('/matches/1/finish');
    
  //   expect(authMockado.called).to.be.true;
  //   expect(body).to.be.deep.equal(matchesWithFalse[0]);
  //   expect(status).to.be.equal(200);
  // });



  // it('17 - finalizando uma partida - dicas do chatoGpt', async function() {
  //   const mock1 = sinon.stub(MatchesSequelize, 'update').resolves([1] as any);
    
  //   const authMockado = sinon.stub(authMiddlewareModule, 'default')
  //     .callsFake(async (req, res, next) => {
  //       next();
  //     });
    
  //   const verifyAdminMockado = sinon.stub(verifyAdminModule, 'default')
  //     .callsFake(async (req, res, next) => {
  //       next();
  //     });
    
  //   const { status, body } = await chai
  //     .request(app)
  //     .patch('/matches/1/finish');
  
  //   console.log('status', status);
  //   console.log('body', body);
  //   expect(mock1.called).to.be.true;
  //   // expect(authMockado.called).to.be.true;
  //   // expect(verifyAdminMockado.called).to.be.true;
  //   expect(body).to.be.deep.equal(matchesWithFalse[0]);
  //   expect(status).to.be.equal(200);
  // });
})
