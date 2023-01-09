class Vehicle {
  protected id: string | undefined;
  protected model: string;
  protected year: number;
  protected color: string;
  protected status: boolean;
  protected buyValue: number;

  constructor(
    model: string, 
    year: number, 
    color: string, 
    buyValue: number, 
    status = false, 
    id: string | undefined = undefined,
  ) {
    this.id = id;
    this.model = model;
    this.year = year;
    this.color = color;
    this.status = status;
    this.buyValue = buyValue;
  }
}

export default Vehicle;