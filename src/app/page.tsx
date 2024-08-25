"use client";
import "./style.css";
import { useEffect, useState } from "react";
import { useGetCharsQuery } from "@/reduxData/characters.api";
import { Header } from "./Header";
import { Loading } from "./Loading";
import { Char } from "./Char";
import { Sort } from "./type/enums";
import { Pagination } from "./Pugination";

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

  useEffect(() => {
    fetchAllCharacters();
  }, [NUM_PAGES]);

  if (error) return <div>Something went wrong!</div>;

  const pageList =
    page === 1
      ? allCharacters.slice(0, 20)
      : allCharacters.slice((page - 1) * 20, (page - 1) * 20 + 20);

  const sortParam = (param: string) => {
    switch (true) {
      case param === Sort.Name:
        setAllCharacters((prevList) =>
          [...prevList].sort((a, b) => a.name.localeCompare(b.name))
        );
        break;

      case param === Sort.Species:
        setAllCharacters((prevList) =>
          [...prevList].sort((a, b) => a.species.localeCompare(b.species))
        );
        break;

      case param === Sort.Status:
        setAllCharacters((prevList) =>
          [...prevList].sort((a, b) => a.status.localeCompare(b.status))
        );
        break;

      case param === Sort.Gender:
        setAllCharacters((prevList) =>
          [...prevList].sort((a, b) => a.gender.localeCompare(b.gender))
        );
        break;

      default:
        fetchAllCharacters();
    }
  };

  const reverseList = () => {
    setAllCharacters([...allCharacters].reverse());
  };

  return (
    <main className="w-[100%]">
      <div className="flex justify-between w-[100%] flex-col justify-center items-center">
        <Header sortParam={sortParam} reverseList={reverseList} />

        {isLoading ? (
          <Loading />
        ) : (
          <>
            <div className="w-[95%] grid auto-rows-[600px] h-max mt-[20px] xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
              {pageList.length > 0 &&
                pageList.map((char) => <Char key={char.id} char={char} />)}
            </div>
            <Pagination pages={pages} page={page} setPage={setPage} />
          </>
        )}
      </div>
    </main>
  );
};

export default Home;
