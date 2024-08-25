export const Loading = () => {
  return (
    <div className="flex flex-col w-100%">
      <div className="flex w-[100%] h-screen bg-no-repeat bg-auto object-contain bg-teal-400 items-center justify-center">
        <div
          className="rotating-image w-[30vw] h-[30vh] bg-contain bg-no-repeat bg-center"
          style={{ backgroundImage: "url('/img/loading.png')" }}
        ></div>
      </div>
    </div>
  );
};
