
import { AssignmentInterface } from "../interfaces/interfaces";
import { addError } from "../store/slices/errorSlice";
import { resetLoading, setLoadingB } from "../store/slices/loadingSlice";
import { storeRedux } from "../store/storeRedux";
const dispatchRedux = storeRedux.dispatch;
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
function reportErr(comingFrom:string, id:string, err:any){
  dispatchRedux(addError({ comingFrom, id, date: new Date().toLocaleTimeString(), message: err.message }))

}
function stopLoadingButton(){
  dispatchRedux(resetLoading())
}

function labelLoadingngButton(s:string){
  dispatchRedux(setLoadingB(s))
}

export { ColorFactory, sortByUpdateDate, reportErr, resetLoading, stopLoadingButton, labelLoadingngButton }
