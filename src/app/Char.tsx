'use client'

interface Props {
char: Character,
}

enum Status {
  A = "Alive",
  D = "Dead",
}

export const Char: React.FC<Props> = ({ char }) => {
  const charStatus = () => {
    if (char.status === Status.A) {
      return 'in progress';
    } else if (char.status === Status.D) {
      return 'liqudated';
    } else {
      return 'in search';
    }
  }

  const charColor = () => {
    if (char.status === Status.A) {
      return '#dc2626';
    } else if (char.status === Status.D) {
      return '#a3e635';
    } else {
      return '#f56702';
    }
  }
  console.log(char.status, Status.D)
  return (
    <div
      className={`flex justify-self-center self-center w-[300px] h-[550px] bg-teal-800 rounded-[20px] border-[3px] overflow-hidden flex-col hover:scale-105 duration-200 relative`}
      style={{
        borderColor: charColor(),
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
          backgroundColor: charColor(),
        }}
      >
        {charStatus()}
      </div>

      <div className="info flex flex-col h-[100%] w-[99%] justify-between my-[10px] mx-[auto]">
        <h1
          className={`font-extrabold text-2xl whitespace-normal mx-auto text-center tracking-widest uppercase text-white`}
          style={{
            color: charColor(),
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
