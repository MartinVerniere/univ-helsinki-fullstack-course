import { gql } from "@apollo/client"
import { useQuery } from "@apollo/client/react"
import { useState } from "react"
import Person from "./Person"

const FIND_PERSON = gql`
  query findPersonByName($nameToSearch: String!) {
    findPerson(name: $nameToSearch) {
      name
      phone
      id
      address {
        street
        city
      }
    }
  }
`

const Persons = ({ persons }) => {
	const [nameToSearch, setNameToSearch] = useState(null)
	const result = useQuery(FIND_PERSON, {
		variables: { nameToSearch },
		skip: !nameToSearch,
	})

	if (nameToSearch && result.data) {
		return (
			<Person
				person={result.data.findPerson}
				onClose={() => setNameToSearch(null)}
			/>
		)
	}

	return (
		<div>
			<h2>Persons</h2>
			{persons.map((person) => (
				<div key={person.name}>
					{person.name} {person.phone}
					<button onClick={() => setNameToSearch(person.name)}>
						show address
					</button>
				</div>
			))}
		</div>
	)
}

export default Persons