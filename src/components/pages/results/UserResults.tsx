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
  const [note, setNote] = useState("")

  useEffect(() => {
    (async () => {
      const userResult: UserResult = await getResult()
      if (userResult) {
        setPercentage(userResult.percentage)
        setTime(userResult.time)
        setNote(userResult.note)
      }
    })()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const timeFormat = (seconds: number) => {
    // Hours, minutes and seconds
    const hrs = ~~(seconds / 3600);
    const mins = ~~((seconds % 3600) / 60);
    const secs = ~~seconds % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    let ret = "";

    if (hrs > 0) {
      ret += "" + hrs + "h " + (mins < 10 ? "0" : "");
    }

    ret += "" + mins + "m " + (secs < 10 ? "0" : "");
    ret += "" + secs + "s";

    return ret;
  }

  return (
    <div className="results_container">
      <AuthBar />
      <TopTitle />
      <div className='results-content'>
          <h3 className='results-title'>Résultats</h3>
          <div className="text-center mt-2">
            <h4>% de bonne réponse: {Math.round(percentage)}% ({note})</h4>
            <h4>Temps passé: {timeFormat(time)}</h4>
          </div>
      </div>
    </div>
  )
}

export default UserResults
