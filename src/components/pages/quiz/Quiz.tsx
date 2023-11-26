import '/src/styles/quiz.css'
import { useApi } from '../../../lib/hooks/useApi'
import Progress from './Progress'
import Question from './Question'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState, useContext } from 'react'
import { useUser } from '../../../lib/hooks/useUser'
import Response from '../../../lib/model/response'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../../lib/utils/provider/userProvider'
import { TimerContext } from '../../../lib/utils/provider/timerProvider'
import AuthBar from '../../shared/AuthBar'

const Quiz = () => {
  const { getQuestions } = useApi()
  const { data: questions } = useQuery({
    queryKey: ['questions'],
    queryFn: getQuestions,
  })
  const { addResponseToUser, hasFinished } = useUser()
  const userState = useContext(UserContext)
  const [indexQuestion, setIndexQuestion] = useState(0)
  const navigate = useNavigate()
  const [responses, setResponses] = useState<Response[]>([])
  const { time, start, reset } = useContext(TimerContext)

  useEffect(() => {
    if (questions && hasFinished(questions.length)) {
      navigate('/results')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasFinished, questions])

  useEffect(() => {
    setResponses(userState.userResponses)
    setIndexQuestion(userState.userResponses.length)
  }, [questions, userState.userResponses])

  const saveNewResponse = (response: Response) => {
    (async () => {
      await addResponseToUser(response)
    })()
    reset()
  }

  if (userState.authenticated === false) {
    return (
      <div className="quiz-container">
        <AuthBar />
        <div className="text-center mt-2">
          <h4>Vous devez être connecté pour accéder au quiz</h4>
        </div>
      </div>
    )
  }

  return (
    <div className="quiz-container">

      {questions && (
        <>
          <AuthBar />
          <div className="quiz_progress_item">
            <Progress max={questions.length} count={responses.length + 1} />
          </div>
          <div className="quiz_question_item">
            <Question
              question={questions[indexQuestion]}
              time={time}
              start={start}
              saveResponse={saveNewResponse}
            />
          </div>
        </>
      )}
    </div>
  )
}

export default Quiz
