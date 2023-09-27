import HomeBtn from "@/app/components/HomeBtn";

const ArtNotFound = () => {
  return (
    <div className="w-full h-full max-w-7xl flex flex-col flex-grow justify-center items-center mx-auto p-10">
      <h1>The requested art page cannot be found!</h1>
      <HomeBtn message={"Show gallery"} />
    </div>
  );
};
export default ArtNotFound;
