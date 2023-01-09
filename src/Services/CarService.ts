import { isValidObjectId } from 'mongoose';
import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarODM';
import ExpressError from '../utils/ExpressError';

class CarService {
  private createCarDomain(car: ICar | null): Car | null {
    if (car) {
      return new Car(car);
    }
    return null;
  }

  public async register(car: ICar) {
    const carODM = new CarODM();
    const newCar = await carODM.create(car);
    return this.createCarDomain(newCar);
  }

  public async getAll() {
    const carODM = new CarODM();
    const carList = await carODM.find();
    return carList.map((car: ICar) => this.createCarDomain(car));
  }

  public async getById(id: string) {
    if (!isValidObjectId(id)) throw new ExpressError(422, 'Invalid mongo id');
    const carODM = new CarODM();
    const car = await carODM.findById(id);
    if (!car) throw new ExpressError(404, 'Car not found');
    return this.createCarDomain(car);
  }

  public async update(id: string, car: ICar) {
    if (!isValidObjectId(id)) throw new ExpressError(422, 'Invalid mongo id');
    const carODM = new CarODM();
    const updatedCar = await carODM.update(id, car);
    if (!updatedCar) throw new ExpressError(404, 'Car not found');
    return this.createCarDomain(updatedCar);
  }
}

export default CarService;