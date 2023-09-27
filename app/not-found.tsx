import HomeBtn from "./components/HomeBtn";

const NotFound = () => {
  return (
    <div className="w-full h-full max-w-7xl flex flex-col flex-grow justify-center items-center mx-auto p-10">
      <h1>The requested page does not exist!</h1>
      <HomeBtn message={"Go back home"} />
    </div>
  );
};
export default NotFound;
