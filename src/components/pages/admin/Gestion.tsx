import '../../../styles/admin.css'
import { useAdmin } from '../../../lib/hooks/useAdmin'
import { useState, useEffect } from 'react'
import Question from '../../../lib/model/question'

const Gestion = () => {
  const { addImagesZip, addAllQuestions } = useAdmin()
  const [imagesZip, setImagesZip] = useState<File>()
  const [questions, setQuestions] = useState<Question[]>([])
  const [load, setLoad] = useState<boolean>(false)

  useEffect(() => {
    if (load && imagesZip && questions) {
      const formData = new FormData()
      formData.append('file', imagesZip)
      const postImages = async () =>
        await addImagesZip(formData)
          .then((res) => {
            console.log(res.message)
            const postQuestion = async () =>
              addAllQuestions(questions)
                .then((res) => {
                  console.log(res.message)
                })
                .catch((err) => {
                  console.log(err)
                })
            postQuestion()
          })
          .catch((err) => {
            console.log(err)
          })

      postImages()
    }
  }, [load])

  const loadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setImagesZip(event.target.files[0])
    }
  }

  const loadJson = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const reader = new FileReader()
      reader.onload = function (e) {
        if (e.target) {
          const json = JSON.parse(e.target.result as string)
          setQuestions(json)
        }
      }
      reader.readAsText(event.target.files[0])
    }
  }

  return (
    <div className="dashboard-gestion">
      <div className="dashboard-box">
        <h3 className="dashboard-title">Gestion du quiz</h3>
        <div className="form-group mt-3">
          <label>Importer des images</label>
          <input
            type="file"
            className="mt-1 form-control"
            onChange={loadFile}
          />
        </div>
        <div className="form-group mt-3">
          <label>Importer des questions</label>
          <input
            type="file"
            className="mt-1 form-control"
            onChange={loadJson}
          />
        </div>
        <div className="d-grid gap-2 mt-3">
          <button className="btn btn-primary" onClick={() => setLoad(true)}>
            Envoyer
          </button>
        </div>
      </div>
    </div>
  )
}
export default Gestion
