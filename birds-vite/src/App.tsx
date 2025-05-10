
import { useQuery } from '@apollo/client';

import { GET_BIRDS } from './lib/queries/birds';

const App = () => {
	const { data, loading, error } = useQuery(GET_BIRDS);

	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error: {error.message}</div>;

	return <div>{JSON.stringify(data)}</div>;
};

export default App;
