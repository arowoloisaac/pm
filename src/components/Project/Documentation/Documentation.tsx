import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import TreeComponent from "./tree";
import { useEffect, useState } from "react";
import { IWiki } from "../utils/utils";
import Axios from "axios";
import { ApiUrl, Token } from "@/components/Storage/Storage";
import Loader from "@/components/loader";
import { Button } from "@/components/ui/button";
import CreateDocumentation from "./CreateDocumentation";
import { Plus } from "lucide-react";
import DocumentationDetails from "./DocumentationDetails";

const Documentation = () => {
  const { projectId } = useParams<{ projectId: string | any }>();
  const navigate = useNavigate();

  const [getWiki, setWiki] = useState<IWiki[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleCreate = () => {
    navigate(`/project/${projectId}/overview/doc/create`);
  };

  const retrieveWiki = async () => {
    const response = await Axios.get(`${ApiUrl}/project/${projectId}/wiki`, {
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    });
    setWiki(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    retrieveWiki();
  }, []);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex  flex-row gap-3">
          <div className="flex-none w-52">
            <div className="flex justify-end mt-2 mr-2">
              <Button
                className="text-xs px-2 py-1 flex items-center h-8 w-20 gap-1 underline"
                variant="ghost"
                onClick={handleCreate}
              >
                <Plus className="w-2 h-4" />
                Wiki
              </Button>
            </div>

            <TreeComponent getWiki={getWiki} />
          </div>
          <div className="grow">
            <Routes>
              <Route path="/:wikiId" element={<DocumentationDetails />}/>
              <Route path="/create" element={<CreateDocumentation />} />
            </Routes>
          </div>
        </div>
      )}
    </>
  );
};

export default Documentation;

// <div className="flex  flex-row gap-3">
//           <div className="flex-none border w-52">
//             <TreeComponent getWiki={getWiki} />
//           </div>
//           <div className="grow">
//             <App />
//           </div>
//         </div>
