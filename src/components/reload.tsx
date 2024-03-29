import { Spinner } from "flowbite-react";

function Reload() {
  return (
    <>
      <main className="bg-black opacity-30 fixed top-0 left-0 right-0 bottom-0 z-50"></main>
      <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-50">
        <Spinner size="xl" className="absolute top-1/2 left-1/2" />
      </div>
    </>
  );
}

export default Reload;
