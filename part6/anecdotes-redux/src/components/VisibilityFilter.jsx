import { useDispatch } from 'react-redux'
import { filterChange } from "../reducers/filterReducer"

const VisibilityFilter = () => {
    const dispatch = useDispatch()

    const handleChange = (event) => {
        const filterText = event.target.value || ''
        filterText === ''
            ? dispatch(filterChange('ALL'))
            : dispatch(filterChange(filterText))
    }
    const style = {
        marginBottom: 10
    }

    return (
        <div style={style}>
            filter <input onChange={handleChange} />
        </div>
    )
}

export default VisibilityFilter