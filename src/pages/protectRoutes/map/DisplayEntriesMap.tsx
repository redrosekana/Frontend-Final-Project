interface DisplayEntrieMapsProps {
  distance: number;
  sourceAddress: string;
  destinationAddress: string;
  sourceLongitude: number;
  sourceLatitude: number;
  destinationLongitude: number;
  destinationLatitude: number;
  clickDetailMap: (
    distance: number,
    sourceAddress: string,
    destinationAddress: string,
    sourceLongitude: number,
    sourceLatitude: number,
    destinationLongitude: number,
    destinationLatitude: number
  ) => void;
}

function DisplayEntriesMap(props: DisplayEntrieMapsProps) {
  return (
    <div className="border max-w-[400px] h-[140px] rounded border-gray-300 shadow-xl w-full mx-auto mb-4 py-2 px-4">
      <div className="text-base md:text-xl font-semibold mt-2">
        {props.destinationAddress}
      </div>
      <div className="mt-1">เบอร์ติดต่อร้าน 023959385</div>
      <div className="mt-5 flex justify-between items-center">
        <span>ระยะทาง {(props.distance / 1000).toFixed(1)} กม.</span>
        <button
          onClick={() =>
            props.clickDetailMap(
              props.distance,
              props.sourceAddress,
              props.destinationAddress,
              props.sourceLongitude,
              props.sourceLatitude,
              props.destinationLongitude,
              props.destinationLatitude
            )
          }
          className="bg-orangey px-2 py-1 font-medium text-base rounded-lg text-white hover:bg-orange-500 transition-colors duration-150 ease-in"
        >
          แผนที่
        </button>
      </div>
    </div>
  );
}

export default DisplayEntriesMap;
