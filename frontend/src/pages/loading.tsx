import Loader from "../components/ui/loader";

const LoadingPage = () => {
  return (
    <div className="w-full h-full flex justify-center items-center text-[4rem]">
      <Loader size={40} color="black" />
    </div>
  );
};

export default LoadingPage;
