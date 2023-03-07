import "./workdayInfo.scss";

const WorkdayInfo = ({title, details}) => {
  return (
    <div className='workdayInfo'>
        <h1>{title}</h1>
        <p>{details}</p>
    </div>
  )
}

export default WorkdayInfo