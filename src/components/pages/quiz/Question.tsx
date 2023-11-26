import Photo from './Photo'
import QuestionModel from '../../../lib/model/question'
import Answer from '../../../lib/model/answer'
import Response from '../../../lib/model/response'
import { useEffect, useState } from 'react'
import { Puff } from 'react-loader-spinner'

interface QuestionProps {
  question: QuestionModel
  time: number
  start: () => void
  saveResponse: (response: Response) => void
}

const Question = (props: QuestionProps) => {
  const question = props.question
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 2000)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [question])

  useEffect(() => {
    if (!loading) {
      props.start()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading])

  const saveResponse = (answerId: string) => {
    const response: Response = {
      questionId: question.id,
      answerId: answerId,
      time: props.time,
    }
    props.saveResponse(response)
  }

  return (
    <>
      {loading ? (
        <Puff
          height="400"
          width="400"
          radius={1}
          color="#ffc400"
          ariaLabel="puff-loading"
          wrapperStyle={{}}
          wrapperClass="puff-loading"
          visible={true}
        />
      ) : (
        <>
          <div className="timer">Elapsed time: {props.time}s</div>
          <div className="question-container">
            <div className="question_photo_item">
              <Photo indexQuestion={question.id} />
            </div>
            <div className="question_answers_item dimboText">
              <ul>
                {question.answers.map((answer: Answer) => (
                  <li key={answer.id} onClick={() => saveResponse(answer.id)}>
                    {answer.text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default Question
