import { configureStore } from '@reduxjs/toolkit'

import noteReducer from './reducers/NoteReducer'
import filterReducer from './reducers/FilterReducer'

const store = configureStore({
  reducer: {
    notes: noteReducer,
    filter: filterReducer
  }
})

export default store