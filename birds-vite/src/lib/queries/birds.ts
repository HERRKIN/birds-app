import { gql } from '@apollo/client';


export const GET_BIRDS = gql`
	query Birds {
		birds {
			id
			english_name
		}
	}
`;