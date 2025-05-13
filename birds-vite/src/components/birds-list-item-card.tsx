import { Link } from "react-router-dom";
import { BirdImage } from "./bird-image";

export const BirdCard = ({ bird }: { bird: {id: string, english_name: string, thumb_url: string, latin_name: string} }) => {
	return <Link to={`/birds/${bird.id}`}>
		<article className="flex flex-col gap-2">
		<BirdImage src={bird.thumb_url} alt={bird.english_name} />
		<h2 className="text-sm font-medium">{bird.english_name}</h2>
        <p className="text-xs text-gray-500">{bird.latin_name}</p>
	</article>
	</Link>
};
