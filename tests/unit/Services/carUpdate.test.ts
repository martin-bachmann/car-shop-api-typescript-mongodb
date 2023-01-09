import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import ICar from '../../../src/Interfaces/ICar';
import CarService from '../../../src/Services/CarService';
import ExpressError from '../../../src/utils/ExpressError';

describe('Rota de atualizar o carro', function () {
  const carInput: ICar = {
    model: 'Marea',
    year: 1992,
    color: 'Red',
    status: true,
    buyValue: 12.000,
    doorsQty: 2,
    seatsQty: 5,
  };

  const carOutput: ICar = {
    id: '634852326b35b59438fbea2f',
    model: 'Marea',
    year: 1992,
    color: 'Red',
    status: true,
    buyValue: 12.000,
    doorsQty: 2,
    seatsQty: 5,
  };

  afterEach(function () {
    sinon.restore();
  });
  it('Retorna um erro 422 se o id é invalido', async function () {
    const errorOutput = 'Invalid mongo id';

    try {
      const service = new CarService();
      await service.update('id_invalido', carInput);
    } catch (error) {
      expect((error as ExpressError).status).to.be.equal(422);
      expect((error as ExpressError).message).to.be.equal(errorOutput);
    }
  });
  it('Retorna um erro 404 se o carro não existe', async function () {
    const errorOutput = 'Car not found';

    sinon.stub(Model, 'findByIdAndUpdate').resolves(carOutput);

    try {
      const service = new CarService();
      await service.update('6348513f34c397abcad040b2', carInput);
    } catch (error) {
      expect((error as ExpressError).status).to.be.equal(404);
      expect((error as ExpressError).message).to.be.equal(errorOutput);
    }
  });
  it('Atualiza o carro por id com sucesso', async function () {
    sinon.stub(Model, 'findByIdAndUpdate').resolves(carOutput);

    const service = new CarService();
    const result = await service.update('634852326b35b59438fbea2f', carInput);

    expect(result).to.be.deep.equal(carOutput);
  });
});