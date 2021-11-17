const OpenDate = ({ time }) => {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
  const date = new Date(time)

  return <strong>{date.toLocaleDateString("en-US", options)}</strong>
}
export default OpenDate