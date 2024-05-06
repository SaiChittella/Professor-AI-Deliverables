import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Document } from "@contentful/rich-text-types";

interface Props {
	richText: Document;
}

const ContentfulRichText: React.FC<Props> = ({ richText }) => {
	const parsedRichText = JSON.parse(JSON.stringify(richText));
	return (
		<div className="prose">{documentToReactComponents(parsedRichText)}</div>
	);
};

export default ContentfulRichText;
