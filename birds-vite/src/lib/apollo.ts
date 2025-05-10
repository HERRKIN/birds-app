import { ApolloClient, InMemoryCache, ApolloLink, HttpLink } from '@apollo/client';

const httpLink = new HttpLink({
	uri: '/api/graphql',
	headers: {
		Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
	},
});

// Development-only link for better performance
const devLink = import.meta.env.DEV
	? new ApolloLink((operation, forward) => {
			// Add development-specific headers or transformations here
			return forward(operation);
	  })
	: null;

export const client = new ApolloClient({
	link: devLink ? ApolloLink.from([devLink, httpLink]) : httpLink,
	cache: new InMemoryCache({
		// Development-friendly cache settings
		typePolicies: {
			Query: {
				fields: {
					// Add any specific field policies here
				},
			},
		},
	}),
	// Development-specific settings
	connectToDevTools: import.meta.env.DEV,
	defaultOptions: {
		watchQuery: {
			fetchPolicy: 'cache-and-network',
		},
	},
});
