import useSearchStore from "@/store/search.store";
import { educationOptions } from "../JobList/constant";

interface EduDropDownProps {
  onSelect: (education: string) => void;
}

const EduDropDown: React.FC<EduDropDownProps> = ({ onSelect }) => {
  const { setEdu } = useSearchStore((state) => state);
  const datas = Object.keys(educationOptions);

  return (
    <div className="absolute bg-white border border-gray-300 rounded-md shadow-lg mt-1 z-10 w-48 overflow-y-auto max-h-80">
      <ul className="list-none p-2">
        {datas.map((data) => (
          <li
            key={data}
            className="hover:bg-gray-100 cursor-pointer p-2 text-base"
            onClick={() => {
              setEdu(educationOptions[data]);
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

export default EduDropDown;
