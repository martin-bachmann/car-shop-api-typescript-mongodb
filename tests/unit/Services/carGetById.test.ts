import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import ICar from '../../../src/Interfaces/ICar';
import CarService from '../../../src/Services/CarService';
import ExpressError from '../../../src/utils/CustomError';

describe('Rota de listar o carro por id', function () {
  afterEach(function () {
    sinon.restore();
  });
  it('Retorna um erro 422 se o id é invalido', async function () {
    const errorOutput = 'Invalid mongo id';

    sinon.stub(Model, 'findById').resolves();

    try {
      const service = new CarService();
      await service.getById('id_invalido');
    } catch (error) {
      expect((error as ExpressError).status).to.be.equal(422);
      expect((error as ExpressError).message).to.be.equal(errorOutput);
    }
  });
  it('Retorna um erro 404 se o carro não existe', async function () {
    const errorOutput = 'Car not found';

    sinon.stub(Model, 'findById').resolves();

    try {
      const service = new CarService();
      await service.getById('6348513f34c397abcad040b2');
    } catch (error) {
      expect((error as ExpressError).status).to.be.equal(404);
      expect((error as ExpressError).message).to.be.equal(errorOutput);
    }
  });
  it('Lista o carro por id com sucesso', async function () {
    const carOutput: ICar = {
      id: '6348513f34c397abcad040b2',
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      doorsQty: 4,
      seatsQty: 5,
    };

    sinon.stub(Model, 'findById').resolves(carOutput);

    const service = new CarService();
    const result = await service.getById('634852326b35b59438fbea2f');

    expect(result).to.be.deep.equal(carOutput);
  });
});