"use client";
import "./style.css";
import { useEffect, useState } from "react";
import { useGetCharsQuery } from "@/reduxData/characters.api";
import "./index.css";

enum Status {
  A = "Alive",
  D = "Dead",
}

const Home = () => {
  const [page, setPage] = useState<number>(1);
  const { data, isLoading, error } = useGetCharsQuery(page);
  const [allCharacters, setAllCharacters] = useState<Character[]>([]);
  const NUM_PAGES = data ? Math.ceil(data.info.count / 20) : 0;
  const pages = Array.from({ length: NUM_PAGES }, (_, i) => i + 1);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [page]);

  if (page < 0) {
    setPage(0);
  }

  const buttonColor = (num: number) => {
    return num === page ? "bg-red-500" : "bg-lime-400";
  };

  useEffect(() => {
    const fetchAllCharacters = async () => {
      const fetchPage = async (page: number) => {
        const response = await fetch(
          `https://rickandmortyapi.com/api/character?page=${page}`
        );
        const data: CharactersResponse = await response.json();
        return data.results;
      };

      try {
        const pages = Array.from({ length: NUM_PAGES }, (_, i) => i + 1);
        const characterResults = await Promise.all(
          pages.map((page) => fetchPage(page))
        );
        const flattenedResults = characterResults.flat();
        setAllCharacters(flattenedResults);
      } catch (error) {
        console.error("Error fetching characters:", error);
      }
    };

    if (NUM_PAGES > 0) {
      fetchAllCharacters();
    }
  }, [NUM_PAGES]);

  if (isLoading) {
    setTimeout(() => {
      return (
        <div className="flex w-[100%] h-screen bg-no-repeat bg-auto object-contain bg-white items-center justify-center">
          <div
            className="rotating-image z-10 w-[30vw] h-[30vh] bg-contain bg-no-repeat bg-center"
            style={{ backgroundImage: "url('/img/loading.png')" }}
          ></div>
        </div>
      );
    }, 10000)
  }

  if (error) return <div>Something went wrong!</div>;

  const pageList =
    page === 1
      ? allCharacters.slice(0, 20)
      : allCharacters.slice((page - 1) * 20, (page - 1) * 20 + 20);

  return (
    <main className="w-[100%]">
      <div className="flex justify-between w-[100%] flex-col justify-center items-center">
        <div className="h-[70px] w-[100%] shadow-xl bg-teal-400 sticky top-0 flex justify-between z-10">
          <img
            src="/img/logo.png"
            alt="Rick and Morty Logo"
            className="h-[100%] aspect-square items-center ml-[20px]"
          />
          <div className="w-[30%] h-[100%] flex items-center justify-between mr-[80px]">
            <select className="w-[20%] h-[50%]" name="" id="">
              <option value="option1"></option>
              <option value="option2"></option>
              <option value="option3"></option>
              <option value="option4"></option>
            </select>
            <select className="w-[20%] h-[50%]" name="" id="">
              <option value="option1"></option>
              <option value="option2"></option>
              <option value="option3"></option>
              <option value="option4"></option>
            </select>
            <select className="w-[20%] h-[50%]" name="" id="">
              <option value="option1"></option>
              <option value="option2"></option>
              <option value="option3"></option>
              <option value="option4"></option>
            </select>
          </div>
        </div>
        <div className="w-[95%] grid grid-cols-4 auto-rows-[600px] h-max mt-[20px]">
          {isLoading && <div>Loading...</div>}
          {error && <div>Error loading characters</div>}
          {pageList.length > 0 &&
            pageList.map((char) => (
              <div
                className={`flex justify-self-center self-center w-[300px] h-[550px] bg-teal-800 rounded-[20px] border-[2px] overflow-hidden flex-col hover:scale-105 duration-200 relative`}
                key={char.id}
                onClick={() => console.log(char.id)}
                style={{borderColor: char.status === Status.D ? '#a3e635' : '#ef4444'}}
              >
                <div className="w-[100%] aspect-square">
                  <div
                    className="w-[100%] aspect-square bg-no-repeat bg-auto object-cover"
                    style={{ backgroundImage: `url('${char.image}')` }}
                  />
                </div>

                <div
                  className={`absolute w-[100%] h-[30px] bg-lime-400 top-[50%] text-black text-center align-middle uppercase leading-[30px] text-xl font-bold tracking-widest`}
                  style={{backgroundColor: char.status === Status.D ? '#a3e635' : '#ef4444'}}
                >
                  {char.status === Status.D ? "liquidated" : "in progress"}
                </div>

                <div className="info flex flex-col h-[100%] w-[99%] justify-between my-[10px] mx-[auto]">
                  <h1
                    className={`font-extrabold text-2xl whitespace-normal mx-auto text-center tracking-widest uppercase text-white`}
                    style={{color: char.status === Status.D ? '#a3e635' : '#ef4444'}}
                  >
                    {char.name}
                  </h1>
                  <div className="text-2xl whitespace-normal text-center tracking-widest text-white">
                    {char.species}({char.gender})
                  </div>
                  <div className="text-xl whitespace-normal text-center tracking-widest text-white">
                    Origin: {char.origin.name}
                  </div>
                  <div className="text-xl whitespace-normal text-center tracking-widest text-white">
                    Location: {char.location.name}
                  </div>
                </div>
              </div>
            ))}
        </div>
        <div className="container flex justify-center gap-[5px] mt-[20px] mb-[50px]">
          {page > 3 && (
            <button
              className="w-[50px] aspect-square text-black bg-lime-400 mr-[20px]"
              onClick={() => setPage(1)}
            >
              1
            </button>
          )}
          {pages
            .slice(page < 3 ? 0 : page - 3, page < 3 ? 5 : page + 2)
            .map((num) => (
              <button
                className={`w-[50px] aspect-square text-black ${buttonColor(
                  num
                )}`}
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
              className="w-[50px] aspect-square text-black bg-lime-400 ml-[20px]"
              onClick={() => setPage(42)}
            >
              42
            </button>
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
