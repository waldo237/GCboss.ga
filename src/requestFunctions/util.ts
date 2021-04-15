
import { AssignmentInterface } from "../interfaces/interfaces";

function sortByUpdateDate(a: AssignmentInterface, b: AssignmentInterface) {
  let c = new Date(b.updateTime);
  let d = new Date(a.updateTime);
  return c.valueOf() - d.valueOf();
}

class ColorFactory {
  private static instance: ColorFactory;
  private color: string = "";
  private constructor() { }
  public static getInstance(): ColorFactory {
    if (!ColorFactory.instance) {
      ColorFactory.instance = new ColorFactory();
    }
    return ColorFactory.instance;
  }

  public getColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    this.color = color;
    return this.color;
  }
}


export { ColorFactory, sortByUpdateDate }
