import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import IMotorcycle from '../../../src/Interfaces/IMotorcycle';
import MotorcycleService from '../../../src/Services/MotorcycleService';
import ExpressError from '../../../src/utils/ExpressError';

describe('Rota de listar a moto por id', function () {
  afterEach(function () {
    sinon.restore();
  });
  it('Retorna um erro 422 se o id é invalido', async function () {
    const errorOutput = 'Invalid mongo id';

    try {
      const service = new MotorcycleService();
      await service.getById('id_invalido');
    } catch (error) {
      expect((error as ExpressError).status).to.be.equal(422);
      expect((error as ExpressError).message).to.be.equal(errorOutput);
    }
  });
  it('Retorna um erro 404 se a moto não existe', async function () {
    const errorOutput = 'Motorcycle not found';

    sinon.stub(Model, 'findById').resolves();

    try {
      const service = new MotorcycleService();
      await service.getById('6348513f34c397abcad040b2');
    } catch (error) {
      expect((error as ExpressError).status).to.be.equal(404);
      expect((error as ExpressError).message).to.be.equal(errorOutput);
    }
  });
  it('Lista a moto por id com sucesso', async function () {
    const motorcycleOutput: IMotorcycle = {
      id: '634852326b35b59438fbea2f',
      model: 'Honda Cb 600f Hornet',
      year: 2005,
      color: 'Yellow',
      status: true,
      buyValue: 30.000,
      category: 'Street',
      engineCapacity: 600,
    };

    sinon.stub(Model, 'findById').resolves(motorcycleOutput);

    const service = new MotorcycleService();
    const result = await service.getById('634852326b35b59438fbea2f');

    expect(result).to.be.deep.equal(motorcycleOutput);
  });
});