import useSearchStore from "@/store/search.store";
import { categoryOptions } from "../JobList/constant";

interface JobDropDownProps {
  onSelect: (job: string) => void;
}

const JobDropDown: React.FC<JobDropDownProps> = ({ onSelect }) => {
  const { setJob } = useSearchStore((state) => state);
  const datas = Object.keys(categoryOptions);

  return (
    <div className="absolute bg-white border border-gray-300 rounded-md shadow-lg mt-1 z-10 w-48 overflow-y-auto max-h-80">
      <ul className="list-none p-2">
        {datas.map((data) => (
          <li
            key={data}
            className="hover:bg-gray-100 cursor-pointer p-3 text-sm"
            onClick={() => {
              setJob(categoryOptions[data]);
              onSelect(data);
            }}
          >
            {data}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobDropDown;
