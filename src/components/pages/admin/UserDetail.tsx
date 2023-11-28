import '../../../styles/admin.css'
import { useAdmin } from '../../../lib/hooks/useAdmin'
import { useState, useEffect } from 'react'
import ResultsByUser from '../../../lib/model/resultsByUser'

const UserDetail = () => {
  const { getResultsForAllUsers } = useAdmin()
  const [results, setResults] = useState<ResultsByUser[]>([])

  useEffect(() => {
    const getResultsUsers = async () => {
      getResultsForAllUsers().then((res) => setResults(res))
    }
    getResultsUsers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  

  const sortByPercentage = (a: ResultsByUser, b: ResultsByUser) => {
    if (a.percentage === b.percentage) {
        return a.time - b.time
    }
    return b.percentage - a.percentage
  }

  const bestResults = results.sort(sortByPercentage).slice()

  return (
    <>
      <div className="dashboard-user-liste">
        <div className="dashboard-box">
          <h3 className="dashboard-title">Classement des participants</h3>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Pseudo</th>
                <th scope="col">Pourcentage</th>
                <th scope="col">Temps</th>
              </tr>
            </thead>
            <tbody className='dashboard-string'>
              {bestResults?.map((result, index) => (
                <tr key={index}>
                  <td>{result.mail}</td>
                  <td align='center'>{result.percentage.toFixed(2)} %</td>
                  <td align='center'>{result.time.toFixed(2)} s</td>
                </tr>
              ))}
            </tbody>
            </table>
        </div>
      </div>
    </>
  )
}

export default UserDetail