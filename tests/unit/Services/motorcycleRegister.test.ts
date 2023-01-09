import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import IMotorcycle from '../../../src/Interfaces/IMotorcycle';
import MotorcycleService from '../../../src/Services/MotorcycleService';

describe('Rota de registro de moto', function () {
  afterEach(function () {
    sinon.restore();
  });
  it('Registrando a moto com sucesso', async function () {
    const motorcycleInput: IMotorcycle = {
      model: 'Honda',
      year: 2005,
      color: 'Yellow',
      status: true,
      buyValue: 30.000,
      category: 'Street',
      engineCapacity: 600,
    };

    const motorcycleOutput: IMotorcycle = {
      id: '6348513f34c397abcad040b2',
      model: 'Honda',
      year: 2005,
      color: 'Yellow',
      status: true,
      buyValue: 30.000,
      category: 'Street',
      engineCapacity: 600,
    };

    sinon.stub(Model, 'create').resolves(motorcycleOutput);

    const service = new MotorcycleService();
    const result = await service.register(motorcycleInput);

    expect(result).to.be.deep.equal(motorcycleOutput);
  });
  it('Registrando a moto sem status com sucesso', async function () {
    const motorcycleInput: IMotorcycle = {
      model: 'Honda',
      year: 2005,
      color: 'Yellow',
      buyValue: 30.000,
      category: 'Street',
      engineCapacity: 600,
    };

    const motorcycleOutput: IMotorcycle = {
      id: '6348513f34c397abcad040b2',
      model: 'Honda',
      year: 2005,
      color: 'Yellow',
      status: false,
      buyValue: 30.000,
      category: 'Street',
      engineCapacity: 600,
    };

    sinon.stub(Model, 'create').resolves(motorcycleOutput);

    const service = new MotorcycleService();
    const result = await service.register(motorcycleInput);

    expect(result).to.be.deep.equal(motorcycleOutput);
  });
});