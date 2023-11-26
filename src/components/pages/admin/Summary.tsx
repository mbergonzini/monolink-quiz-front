import '../../../styles/admin.css'
import { useAdmin } from '../../../lib/hooks/useAdmin'
import { useState, useEffect } from 'react'
import ResultsByUser from '../../../lib/model/resultsByUser'
import ResultsByPhoto from '../../../lib/model/resultsByPhoto'
import Photo from '../quiz/Photo'

const Summary = () => {
  const { countFinishedQuizzes, countParticipations, getResultsForAllUsers, getResultsForAllPhotos } =
    useAdmin()
  const [finishedQuizzes, setFinishedQuizzes] = useState(0)
  const [participations, setParticipations] = useState(0)
  const [results, setResults] = useState<ResultsByUser[]>([])
  const [resultsPhotos, setResultsPhotos] = useState<ResultsByPhoto[]>([])

  useEffect(() => {
    const finishedQuizzes = async () => {
      countFinishedQuizzes().then((res) => setFinishedQuizzes(res))
    }
    const participations = async () => {
      countParticipations().then((res) => setParticipations(res))
    }
    const getResultsUsers = async () => {
      getResultsForAllUsers().then((res) => setResults(res))
    }
    const getResultsPhotos = async () => {
      getResultsForAllPhotos().then((res) => setResultsPhotos(res))
    }
    finishedQuizzes()
    participations()
    getResultsUsers()
    getResultsPhotos()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  

  const sortByPercentage = (a: ResultsByUser|ResultsByPhoto, b: ResultsByUser|ResultsByPhoto) => {
    if (a.percentage === b.percentage) {
        return a.time - b.time
    }
    return b.percentage - a.percentage
  }

  const sortByPercentageAsc = (a: ResultsByUser|ResultsByPhoto, b: ResultsByUser|ResultsByPhoto) => {
    if (a.percentage === b.percentage) {
        return b.time - a.time
    }
    return a.percentage - b.percentage
  }

  const bestResults = results.sort(sortByPercentage).slice(0, 5)
  const worstResults = results.sort(sortByPercentageAsc).slice(0, 5)
  const bestResultsPhoto = resultsPhotos.sort(sortByPercentage)[0]
  const worstResultsPhoto = resultsPhotos.sort(sortByPercentageAsc)[0]

  return (
    <>

      <div className="dashboard-top">
        <div className="dashboard-box">
          <h3 className="dashboard-title">Nombre de participant enregistré</h3>
          <p className="dashboard-number">{participations}</p>
        </div>
        <div className="dashboard-box">
          <h3 className="dashboard-title">Nombre de quiz terminé</h3>
          <p className="dashboard-number">{finishedQuizzes}</p>
        </div>
      </div>
      <div className="dashboard-user">
        <div className="dashboard-box">
          <h3 className="dashboard-title">Les 5 meilleurs répondants</h3>
          <ul>
            {bestResults?.map((result, index) => (
              <li key={index} className="dashboard-string">
                {index + 1} - {result.userName} - {result.percentage.toFixed(2)}% en {result.time.toFixed(2)}s
              </li>
            ))}
          </ul>
        </div>
        <div className="dashboard-box">
          <h3 className="dashboard-title">Les 5 plus mauvais répondants</h3>
          <ul>
            {worstResults?.map((result, index) => (
              <li key={index} className="dashboard-string">
                {index + 1} - {result.userName} - {result.percentage.toFixed(2)}% en {result.time.toFixed(2)}s
              </li>
            ))}
          </ul>
        </div>
        </div>
      <div className="dashboard-images">
        <div className="dashboard-box">
          <h3 className="dashboard-title">Photo la plus difficile à trouver</h3>
          <div className="dashboard-image">
            {bestResultsPhoto && <Photo indexQuestion={worstResultsPhoto.questionId}/>}
          </div>
        </div>
        <div className="dashboard-box">
          <h3 className="dashboard-title">Photo la plus facile à trouver</h3>
          <div className="dashboard-image">
            {worstResultsPhoto && <Photo indexQuestion={bestResultsPhoto.questionId}/>}
          </div>
        </div>
      </div>
    </>
  )
}

export default Summary
