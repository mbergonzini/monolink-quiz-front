import Answer from "./answer";

class Question {
  constructor(
    public id: number,
    public answers: Answer[],
  ) {}
}

export default Question;