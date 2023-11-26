import '../../../styles/admin.css'
import { useAdmin } from '../../../lib/hooks/useAdmin'
import { useState, useEffect } from 'react'
import ResultsByPhoto from '../../../lib/model/resultsByPhoto'
import Photo from '../quiz/Photo'

const PhotoDetail = () => {
  const { getResultsForAllPhotos } = useAdmin()
  const [results, setResults] = useState<ResultsByPhoto[]>([])
  const [slice, setSlice] = useState(0)

  useEffect(() => {
    const getResultsPhotos = async () => {
        getResultsForAllPhotos().then((res) => setResults(res))
    }
    getResultsPhotos()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  

  const sortByPercentage = (a: ResultsByPhoto, b: ResultsByPhoto) => {
    if (a.percentage === b.percentage) {
        return a.time - b.time
    }
    return b.percentage - a.percentage
  }

  const bestResults = results.sort(sortByPercentage).slice(slice, slice + 2)

  const sliceBefore = () => {
    if (slice > 0) {
        setSlice(slice - 2)
    }
  }

  const sliceAfter = () => {
    if (slice < results.length - 2) {
        setSlice(slice + 2)
    }
  }
  return (
    <>
      <div className="dashboard-photo-liste">
        <div className="dashboard-box">
          <h3 className="dashboard-title">Classement de la photo la plus facile à trouver</h3>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col" className="photo">Photo</th>
                <th scope="col">Pourcentage</th>
                <th scope="col">Temps moyen</th>
                <th scope="col">Réponse la plus courante</th>
              </tr>
            </thead>
            <tbody>
              {bestResults?.map((result, index) => (
                <tr key={index}>
                  <td className="photo"><Photo indexQuestion={result.questionId}/></td>
                  <td>{result.percentage.toFixed(2)} %</td>
                  <td>{result.time.toFixed(2)} s</td>
                  <td>{result.popularResponse}</td>
                </tr>
              ))}
            </tbody>
          </table>
            <ul className="pagination justify-content-center">
                <li className='page-item'><button className="page-link" onClick={sliceBefore}>Précédent</button></li>
                <li className='page-item'><button className="page-link" onClick={sliceAfter}>Suivant</button></li>
            </ul>
        </div>
        </div>
    </>
  )
}
export default PhotoDetail