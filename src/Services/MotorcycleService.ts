import { isValidObjectId } from 'mongoose';
import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleODM from '../Models/MotorcycleODM';
import ExpressError from '../utils/ExpressError';

class MotorcycleService {
  private createMotorcycleDomain(motorcycle: IMotorcycle | null): Motorcycle | null {
    if (motorcycle) {
      return new Motorcycle(motorcycle);
    }
    return null;
  }

  public async register(motorcycle: IMotorcycle) {
    const motorcycleODM = new MotorcycleODM();
    const newMotorcycle = await motorcycleODM.create(motorcycle);
    return this.createMotorcycleDomain(newMotorcycle);
  }

  public async getAll() {
    const motorcycleODM = new MotorcycleODM();
    const motorcycleList = await motorcycleODM.find();
    return motorcycleList.map((motorcycle: IMotorcycle) => this.createMotorcycleDomain(motorcycle));
  }

  public async getById(id: string) {
    if (!isValidObjectId(id)) throw new ExpressError(422, 'Invalid mongo id');
    const motorcycleODM = new MotorcycleODM();
    const motorcycle = await motorcycleODM.findById(id);
    if (!motorcycle) throw new ExpressError(404, 'Motorcycle not found');
    return this.createMotorcycleDomain(motorcycle);
  }

  public async update(id: string, motorcycle: IMotorcycle) {
    if (!isValidObjectId(id)) throw new ExpressError(422, 'Invalid mongo id');
    const motorcycleODM = new MotorcycleODM();
    const updatedMotorcycle = await motorcycleODM.update(id, motorcycle);
    if (!updatedMotorcycle) throw new ExpressError(404, 'Motorcycle not found');
    return this.createMotorcycleDomain(updatedMotorcycle);
  }
}

export default MotorcycleService;