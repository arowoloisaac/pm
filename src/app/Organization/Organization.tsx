import { ApiUrl } from '@/components/Storage/Storage';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus } from 'lucide-react';
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { IOrganization } from './utils/utils';
import { IPaginate } from '../Project/utils/utils';

const Organization = () => {

    const { page } = useParams<{ page: string }>();
    const navigate = useNavigate();

    const [isCollapsed, setIsCollapsed] = useState(true);
    const [getOwnership, setOwnership] = useState<string>("")
    const [itemPerPageFilter, setItemPerPageFilter] = useState<string>("");

    const [getOrganization, setOrganization] = useState<IOrganization[]>([])

     const [getPaginations, setPaginations] = useState<IPaginate>();

    const generateUrl = (page = 1) => {
        const params = new URLSearchParams();
        params.append("page", page.toString());
        // params.append("itemPerPage", "4");
        if (getOwnership) params.append("filter", getOwnership);
        if (itemPerPageFilter) params.append("itemPerPage", itemPerPageFilter);
    
        return `${ApiUrl}/project/get?${params.toString()}`;
      };

  return (
    <>
      <div className="w-full ">
        <div className="container mx-auto  px-4  pb-4">
          <div className="py-1">
            <div className="border-2">
              <div className="flex justify-between items-center p-4 md:hidden">
                <h2 className="text-lg font-medium">Search</h2>
                <button
                  onClick={() => setIsCollapsed(!isCollapsed)}
                  className="text-gray-600 hover:text-gray-800 focus:outline-none"
                >
                  {isCollapsed ? "Expand" : "Collapse"}
                </button>
              </div>

              <div
                className={`overflow-hidden transition-[max-height] duration-300 ${
                  isCollapsed ? "max-h-0" : "max-h-[500px]"
                } md:max-h-full`}
              >
                <div className="flex flex-wrap md:flex-nowrap items-center gap-4 p-2">
                  <div className="flex flex-auto flex-wrap md:flex-nowrap gap-4 ">
                    <Select onValueChange={setOwnership}>
                      <SelectTrigger className="w-full md:w-44 p-2 rounded">
                        <SelectValue placeholder="Filter by progress" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Status</SelectLabel>
                          <SelectItem value="created">Owned</SelectItem>
                          <SelectItem value="joined">Joined</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>

                    {/* item filter */}
                    <Select onValueChange={setItemPerPageFilter}>
                      <SelectTrigger className="w-full md:w-20 p-2 rounded">
                        <SelectValue placeholder="Items" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="10">10</SelectItem>
                          <SelectItem value="15">15</SelectItem>
                          <SelectItem value="20">20</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Search Button */}
                  <div className="flex justify-end gap-3">
                    <a href="project/create">
                      <Button>
                        <Plus />
                        Add Organization
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* for displaying the project container */}
          <div className="container mx-auto border-2 px-4 py-4">
            {/* <ProjectLayout items={projects} isLoading={isLoading} /> */}
          </div>
          <div className="p-0.5"></div>
          {/* pagination */}
          {Number(getPaginations?.totalItems) < 1 ? (
            <span></span>
          ) : (
            <div className="container mx-auto  border-2 px-4 py-4">
              <div className="flex flex-auto flex-row">
                <div className="flex-1  justify-start">
                  {/* <p className="pt-2">Projects: {getPaginations?.totalItems}</p> */}
                </div>
                {/* <PaginationComp
                  item={getPaginations}
                  fetchItem={getProject}
                  handlePageChange={handlePageChange}
                /> */}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Organization