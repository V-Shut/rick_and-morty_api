"use client";

import Image from "next/image";
import "./style.css";
import { useEffect, useState } from "react";

enum Status {
  A = 'Alive',
  D = 'Dead',
}

const Home = () => {
  const [chars, setChars] = useState<Char[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("https://rickandmortyapi.com/api/character");
      const data = await res.json();
      setChars(data.results);
    };

    fetchData();
  }, []);

  return (
    <main className="w-[100%]">
      <div className="flex justify-between w-[100%] flex-col justify-center items-center">
        <div className="h-[150px] w-[100%] bg-teal-400 shadow-xl sticky top-0 flex justify-between">
          <img
            src="/img/logo.png"
            alt="Rick and Morty Logo"
            className="h-[100%] aspect-square items-center"
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
        <div className="w-[95%] grid grid-cols-3 auto-rows-[340px] h-max mt-[100px] gap-[20px]">
          {chars.map((char) => (
            <div
              className="flex justify-self-center self-center w-[600px] h-[300px] bg-teal-800 rounded-[10px] border-[3px] border-lime-400"
              key={char.id}
            >
              <div
                className="h-[100%] aspect-square"
                style={{ backgroundImage: `url('${char.image}')` }}
              ></div>
              <div className="info flex flex-col flex items-start justify-between w-[100%]">
                <h1 className="font-extrabold text-4xl whitespace-normal mx-auto">{char.name}</h1>
                <div className="text-2xl whitespace-normal">{char.species}</div>
                <div className="text-2xl whitespace-normal">{char.status}</div>
                <div className="text-2xl whitespace-normal">{char.gender}</div>
                <div className="text-2xl whitespace-normal">{char.origin.name}</div>
                <div className="text-2xl whitespace-normal">{char.location.name}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Home;
