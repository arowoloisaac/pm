import { Token } from "@/components/Storage/Storage";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { IProfile } from "../Project/utils/utils";
import { viewProfile } from "./profileDetails/profile";

const Profile = () => {
  const [getProfile, setProfile] = useState<IProfile | any>({});

  useEffect(() => {
    const fetchProfile = async () => {
      const data = await viewProfile();
      if (data) {
        setProfile(data);
      }
    };

    fetchProfile();
  }, [Token]);

  console.log(getProfile);
  return (
    <>
      <div className="pt-16 px-2 pb-8">
        <div className="mx-auto max-w-4xl p-6 h-auto">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Your Account Profile
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Here are the information you put in while registering.
            </p>
          </div>
          <div className="flex flex-row ">
            {/* basis-2/6 */}
            <div className="basis-2/5">
              <Card className="h-full ">
                <div className="flex flex-col place-items-center ">
                  <div className="flex-auto justify-start items-center pt-20 pb-2">
                    <img
                      className="inline-flex object-cover border-2 rounded-full h-16 w-16 !h-32 !w-32"
                      src={getProfile.avatarUrl}
                      alt="profile-picture"
                    />
                  </div>
                  <div>
                    <Button>Update Icon</Button>
                  </div>
                </div>
              </Card>
            </div>
            <div className=" basis-3/5">
              <div>
                <Card className="">
                  <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                    <dl className="sm:divide-y sm:divide-gray-200">
                      <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          First name
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {getProfile.firstName}
                        </dd>
                      </div>
                      <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          Last name
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {getProfile.lastName}
                        </dd>
                      </div>
                      <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          Email address
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {getProfile.email}
                        </dd>
                      </div>
                      <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          Phone number
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {getProfile.phoneNumber}
                        </dd>
                      </div>
                      <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          Birth-date
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {getProfile.birthdate}
                        </dd>
                      </div>
                    </dl>
                    <Separator />
                    <div className="flex justify-end py-2 px-2">
                      <Button>Update Profile</Button>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
