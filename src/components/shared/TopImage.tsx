import ImageQuiz from '/quiz.png'

const TopImage = () => {
  return (
    <div className="home_image_item">
      <img
        className="image_quiz"
        src={ImageQuiz}
        alt="Quiz Image"
        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
      />
    </div>
  )
}

export default TopImage
