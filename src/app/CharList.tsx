import { Status } from "./page";

interface Props {
char: Character
}

export const CharList: React.FC<Props> = ({char}) => {
  return (
    <div
      className={`flex justify-self-center self-center w-[300px] h-[550px] bg-teal-800 rounded-[20px] border-[3px] overflow-hidden flex-col hover:scale-105 duration-200 relative`}
      key={char.id}
      onClick={() => console.log(char.id)}
      style={{
        borderColor: char.status === Status.D ? "#a3e635" : "#dc2626",
      }}
    >
      <div className="w-[100%] aspect-square">
        <div
          className="w-[100%] aspect-square bg-no-repeat bg-auto object-cover"
          style={{ backgroundImage: `url('${char.image}')` }}
        />
      </div>

      <div
        className={`absolute w-[100%] h-[30px] bg-lime-400 top-[50%] text-black text-center align-middle uppercase leading-[30px] text-xl font-bold tracking-widest`}
        style={{
          backgroundColor: char.status === Status.D ? "#a3e635" : "#dc2626",
        }}
      >
        {char.status === Status.D ? "liquidated" : "in progress"}
      </div>

      <div className="info flex flex-col h-[100%] w-[99%] justify-between my-[10px] mx-[auto]">
        <h1
          className={`font-extrabold text-2xl whitespace-normal mx-auto text-center tracking-widest uppercase text-white`}
          style={{
            color: char.status === Status.D ? "#a3e635" : "#dc2626",
          }}
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
  );
};
