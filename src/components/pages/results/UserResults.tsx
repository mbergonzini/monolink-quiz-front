import { useUser } from '../../../lib/hooks/useUser'
import { useEffect, useState } from 'react'
import UserResult from '../../../lib/model/userResult'
import '/src/styles/results.css'
import TopTitle from '../../shared/TopTitle'
import AuthBar from '../../shared/AuthBar'

const UserResults = () => {
  const { getResult } = useUser()
  const [percentage, setPercentage] = useState(0)
  const [time, setTime] = useState(0)

  useEffect(() => {
    (async () => {
      const userResult: UserResult = await getResult()
      if (userResult) {
        setPercentage(userResult.percentage)
        setTime(userResult.time)
      }
    })()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="results_container">
      <AuthBar />
      <TopTitle />
      <div className='results-content'>
          <h3 className='results-title'>Résultats</h3>
          <div className="text-center mt-2">
            <h4>Pourcentage de bonne réponse: {percentage.toFixed(2)} %</h4>
            <h4>Temps passé: {time.toFixed(2)} s</h4>
          </div>
      </div>
    </div>
  )
}

export default UserResults
