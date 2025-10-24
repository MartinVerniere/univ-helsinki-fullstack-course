import { useEffect, useState } from 'react'
import axios from 'axios'

export const useField = (type) => {
    const [value, setValue] = useState('')

    const onChange = (event) => {
        setValue(event.target.value)
    }

    return { type, value, onChange }
}

export const useResource = (baseUrl) => {
    const [resources, setResources] = useState([])

    const setToken = (newToken) => token = `bearer ${newToken}`

    const getAll = async () => {
        const response = await axios.get(baseUrl)
        return response.data
    }

    const create = async (newObject) => {
        const response = await axios.post(baseUrl, newObject)
        setResources([...resources, response.data])
        return response.data
    }

    const update = async (id, newObject) => {
        const response = await axios.put(`${baseUrl}/${id}`, newObject)
        const updatedResources = resources.map(resource => resource.id === id ? response.data : resource)
        setResources(updatedResources)
        return response.data
    }

    const service = { create, update, getAll, setToken }

    const fetchFromDB = async () => {
        const resourcesFromDB = await getAll()
        setResources(resourcesFromDB)
    }

    useEffect(() => {
        fetchFromDB()
    }, [])

    return [resources, service]
}