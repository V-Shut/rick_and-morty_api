interface Props {
  pages: number[];
  page: number;
  setPage: (value: number) => void;
}

export const Pagination: React.FC<Props> = ({ pages, page, setPage }) => {
  const buttonColor = (num: number) => {
    return num === page ? "bg-red-500" : "bg-lime-400";
  };

  return (
    <div className="container flex justify-center gap-[5px] mt-[20px] mb-[50px]">
      {page > 3 && (
        <button
          className="w-[50px] aspect-square text-black bg-lime-400 mr-[20px] rounded-lg"
          onClick={() => setPage(1)}
        >
          {pages[0]}
        </button>
      )}
      {pages
        .slice(page < 3 ? 0 : page - 3, page < 3 ? 5 : page + 2)
        .map((num) => (
          <button
            className={`w-[50px] aspect-square text-black ${buttonColor(num)} rounded-lg`}
            onClick={() => {
              setPage(num);
            }}
            key={num}
          >
            {num}
          </button>
        ))}
      {page < 40 && (
        <button
          className="w-[50px] aspect-square text-black bg-lime-400 ml-[20px] rounded-lg"
          onClick={() => setPage(42)}
        >
          {pages[pages.length - 1]}
        </button>
      )}
    </div>
  );
};
