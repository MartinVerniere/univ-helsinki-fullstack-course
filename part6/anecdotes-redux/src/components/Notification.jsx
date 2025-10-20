import { useSelector } from "react-redux"

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10
  }

  const notification = useSelector(({ notification }) => { return notification })

  if (!notification) return null

  return <div style={style}>{notification}</div>
}

export default Notification