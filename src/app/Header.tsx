import { ReactSelect } from "./ReactSelect";

interface Props {
  sortParam: (value: string) => void,
  reverseList: () => void,
};

export const Header: React.FC<Props> = ({sortParam, reverseList}) => {
  return (
    <div className="h-[70px] w-[100%] shadow-xl bg-teal-400 sticky top-0 flex justify-between z-10">
      <img
        src="/img/logo.png"
        alt="Rick and Morty Logo"
        className="h-[100%] aspect-square items-center ml-[20px]"
      />
      <div className="wrap flex items-center">
        <button className="w-[30px] h-[30px] mr-[30px]" onClick={reverseList} title="Reverse">
          <img src="/img/reverse.png" alt="Reverse button" />
        </button>
        <div className="w-[128px] h-[100%] flex flex-col items-start justify-center mr-[50px]">
          <ReactSelect sortParam={sortParam} />
        </div>
      </div>
    </div>
  );
};
