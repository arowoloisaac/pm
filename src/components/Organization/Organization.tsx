import { ApiUrl, Token } from "@/components/Storage/Storage";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { IOrganization } from "./utils/utils";
import { IPaginate } from "../../components/Project/utils/utils";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import CreateOrganization from "./layout/CreateOrganization";
import Axios from "axios";
import PaginationComp from "../Layout/Paginator";
import OrganizationList from "./layout/OrganizationList";

const Organization = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [getOrganization, setOrganization] = useState<IOrganization[]>([]);
  const [getPaginations, setPaginations] = useState<IPaginate>();

  const pathSegments = location.pathname.split("/").filter(Boolean);

  let organizationStatusFilter: string | null = null;
  let page = 1;
  let itemPerPageFilter: string | null = null;

  if (pathSegments.length >= 2) {
    if (!isNaN(Number(pathSegments[1]))) {
      page = parseInt(pathSegments[1]);
      if (pathSegments.length >= 3) {
        itemPerPageFilter = pathSegments[2];
      }
    } else {
      organizationStatusFilter = pathSegments[1];
      if (pathSegments.length >= 3) {
        page = parseInt(pathSegments[2]);
      }
      if (pathSegments.length >= 4) {
        itemPerPageFilter = pathSegments[3];
      }
    }
  }

  const generateUrl = () => {
    const params = new URLSearchParams();
    params.append("page", page.toString());
    if (organizationStatusFilter)
      params.append("filter", organizationStatusFilter);
    if (itemPerPageFilter) params.append("itemPerPage", itemPerPageFilter);
    return `${ApiUrl}/organization/get?${params.toString()}`;
  };

  const handlePageChange = (newPage: number) => {
    const segments = ["organizations"];
    if (organizationStatusFilter) {
      segments.push(organizationStatusFilter);
    } else {
      segments.push(newPage.toString());
    }
    if (organizationStatusFilter) {
      segments.splice(2, 1, newPage.toString());
    }
    if (itemPerPageFilter) segments.push(itemPerPageFilter);
    navigate(`/${segments.join("/")}`);
  };

  const getOrg = async () => {
    try {
      const res = await Axios.get(generateUrl(), {
        headers: { Authorization: `Bearer ${Token}` },
      });
      if (res.status === 200) {
        setIsLoading(false);
        setOrganization(res.data.org);
        setPaginations(res.data.pagination);
      }
    } catch (error) {
      alert(`Error fetching projects: ${error}`);
    }
  };

  const handleFilterChange = (
    filterType: "filter" | "itemPerPage",
    value: string
  ) => {
    const organizationStatus =
      filterType === "filter" ? value : organizationStatusFilter;
    const newItemPerPage =
      filterType === "itemPerPage" ? value : itemPerPageFilter;

    const pathSegments = ["organizations"];
    if (organizationStatus) pathSegments.push(organizationStatus);
    pathSegments.push(page.toString());
    if (newItemPerPage) pathSegments.push(newItemPerPage);

    navigate(`/${pathSegments.join("/")}`);
  };

  useEffect(() => {
    getOrg();
  }, [location.pathname]);

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
                    <Select
                      onValueChange={(value) =>
                        handleFilterChange("filter", value)
                      }
                    >
                      <SelectTrigger className="w-full md:w-44 p-2 rounded">
                        <SelectValue placeholder="Filter by Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Status</SelectLabel>
                          <SelectItem value="Owned">Owned</SelectItem>
                          <SelectItem value="Joined">Joined</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>

                    {/* item filter */}
                    <Select
                      onValueChange={(value) =>
                        handleFilterChange("itemPerPage", value)
                      }
                    >
                      <SelectTrigger className="w-full md:w-20 p-2 rounded">
                        <SelectValue placeholder="Items" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="10">10 </SelectItem>
                          <SelectItem value="15">15</SelectItem>
                          <SelectItem value="20">20</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Search Button */}
                  <div className="flex justify-end gap-3">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline">
                          {" "}
                          <Plus />
                          Create Organization
                        </Button>
                      </DialogTrigger>
                      <CreateOrganization />
                    </Dialog>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* for displaying the project container */}
          <div className="container mx-auto border-2 px-4 py-4">
            <OrganizationList items={getOrganization} isLoading={isLoading} />
          </div>
          <div className="p-0.5"></div>
          {/* pagination */}
          {Number(getPaginations?.totalItems) < 1 ? (
            <span></span>
          ) : (
            <div className="container mx-auto  border-2 px-4 py-4">
              <div className="flex flex-auto flex-row">
                <div className="flex-1  justify-start">
                  <p className="pt-2">Organization: {getPaginations?.size}</p>
                </div>
                <PaginationComp
                  item={getPaginations}
                  fetchItem={getOrg}
                  handlePageChange={handlePageChange}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Organization;
