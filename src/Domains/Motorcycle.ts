import IMotorcycle from '../Interfaces/IMotorcycle';
import Vehicle from './Vehicle';

class Motorcycle extends Vehicle {
  private category: string;
  private engineCapacity: number;

  constructor(motorcycle: IMotorcycle) {
    const { 
      model, year, color, status = false, buyValue, category, engineCapacity, id, 
    } = motorcycle;
    super(model, year, color, buyValue, status, id);
    this.category = category;
    this.engineCapacity = engineCapacity;
  }
}

export default Motorcycle;