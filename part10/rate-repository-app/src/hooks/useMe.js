import { useQuery } from '@apollo/client';
import { ME } from '../graphql/queries';

const useMe = () => {
	const { data } = useQuery(ME);
	console.log('useMe data:', data);
	return { data };
};

export default useMe;
