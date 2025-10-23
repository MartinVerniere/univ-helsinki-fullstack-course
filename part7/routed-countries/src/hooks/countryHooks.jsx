import axios from "axios"
import { useEffect, useState } from "react"

export const useField = (type) => {
    const [value, setValue] = useState('')

    const onChange = (event) => {
        setValue(event.target.value)
    }

    return {
        type,
        value,
        onChange
    }
}

export const useCountry = (name) => {
    const [country, setCountry] = useState(null)

    const fetchCountryDetails = async () => {
        if (name) {
            try {
                const countryDetails = await axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
                console.log("countryDetails:", countryDetails)
                setCountry(countryDetails)
            }
            catch (error) {
                console.log("error in fetch:", error)
            }
        }
    }

    useEffect(() => {
        fetchCountryDetails()
    }, [name])

    return { country }
}