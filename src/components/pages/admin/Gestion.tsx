import '../../../styles/admin.css'
import { useAdmin } from '../../../lib/hooks/useAdmin'
import { useState } from 'react'
import Question from '../../../lib/model/question'

const Gestion = () => {
  const { addImagesZip, addAllQuestions } = useAdmin()
  const [imagesZip, setImagesZip] = useState<File>()
  const [questions, setQuestions] = useState<Question[]>([])
  const [messages, setMessages] = useState<string>("")
  const [countImages, setCountImages] = useState<number>(0)
  const [countQuestions, setCountQuestions] = useState<number>(0)

  const saveImages = async () => {
    if (imagesZip) {
      const formData = new FormData()
      formData.append('file', imagesZip)
      const res = await addImagesZip(formData)
        setMessages(res.message)  
        setCountImages(res.count)
      
        
    }
  }

  const saveQuestions = async () => {
    if (questions && questions.length > 0) {
      const res = await addAllQuestions(questions)
        setMessages(res.message)
        setCountQuestions(res.count)
    }
  }

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
          <div className="d-grid gap-2 mt-3">
            <button className="btn btn-primary" onClick={() => saveImages()}>
              Envoyer les images
            </button>
          </div>
        </div>
        <div className="form-group mt-3">
          <label>Importer des questions</label>
          <input
            type="file"
            className="mt-1 form-control"
            onChange={loadJson}
          />
          <div className="d-grid gap-2 mt-3">
            <button className="btn btn-primary" onClick={() => saveQuestions()}>
              Envoyer les questions
            </button>
          </div>
        </div>
        <div className="mt-3">
          <p style={{ color: 'green', fontSize: '2vw'}}>{messages}</p>
          <p style={{ color: 'green', fontSize: '2vw'}}>{countImages} images importées</p>
          <p style={{ color: 'green', fontSize: '2vw'}}>{countQuestions} questions importées</p>
        </div>
      </div>
    </div>
  )
}
export default Gestion
