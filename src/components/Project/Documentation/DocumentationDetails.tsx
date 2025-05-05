import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchWiki } from "../api/project-api";
import MarkdownRenderer from "@/components/Layout/MarkdownRenderer";
import { IGetWiki } from "../utils/utils";



const DocumentationDetails = () => {
  const { projectId, wikiId } = useParams();

  const [getWiki, setWiki] = useState<IGetWiki|any>({});

  const handleGetWiki = async () => {
    const response = await fetchWiki(projectId, wikiId);
    console.log(response);
    response.status === 200
      ? setWiki(response.data)
      : alert(response.response.data);

    console.log(getWiki);
    // if (response.status === 200) {
    // } else alert(response.response.data);
  };

  useEffect(() => {
    handleGetWiki();
  }, []);
  return (
    <div>
      <MarkdownRenderer content={getWiki.content} />
    </div>
  );
};

export default DocumentationDetails;
