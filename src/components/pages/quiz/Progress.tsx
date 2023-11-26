interface ProgressProps {
  max: number;
  count: number;
}

const Progress = (props: ProgressProps) => {
  const { max, count } = props;
  return (
    <>
        <progress max={max} value={count}/>
        <p>Question <strong>{count}</strong> / {max}</p>
    </>
  )
}

export default Progress;


