class ResultsByPhoto {
    constructor(
      public questionId: number,
      public percentage: number,
      public time: number,
      public popularResponse: string
    ) {}
  }
  
  export default ResultsByPhoto;