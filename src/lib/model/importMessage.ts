import ApiMessage from "./apiMessage";

export class ImportMessage extends ApiMessage {
    count: number;
  
    constructor(
      message: string,
      count: number,
    ) {
      super(message);
      this.count = count;
    }
  }