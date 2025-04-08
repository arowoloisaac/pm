import { Skeleton } from './ui/skeleton';

const loader = () => {
  return (
    <div className="h-[32rem] content-center">
      <div className=" flex flex-row justify-center">
        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default loader