import ICar from '../Interfaces/ICar';
import Vehicle from './Vehicle';

class Car extends Vehicle {
  private doorsQty: number;
  private seatsQty: number;

  constructor(car: ICar) {
    const { model, year, color, status = false, buyValue, doorsQty, seatsQty, id } = car;
    super(model, year, color, buyValue, status, id);
    this.doorsQty = doorsQty;
    this.seatsQty = seatsQty;
  }
}

export default Car;