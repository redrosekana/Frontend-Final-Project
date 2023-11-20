interface DisplayEntrieMapsProps {
  distance: number;
  sourceAddress: string;
  destinationAddress: string;
  sourceLongitude: number;
  sourceLatitude: number;
  destinationLongitude: number;
  destinationLatitude: number;
  destinationProvince: string;
  destinationTel: string;
  destinationContact: string;
  clickDetailMap: (
    distance: number,
    sourceAddress: string,
    destinationAddress: string,
    sourceLongitude: number,
    sourceLatitude: number,
    destinationLongitude: number,
    destinationLatitude: number,
    destinationProvince: string,
    destinationTel: string,
    destinationContact: string
  ) => void;
}

function DisplayEntriesMap(props: DisplayEntrieMapsProps) {
  return (
    <div className="relative border max-w-[400px] h-[160px] rounded border-gray-300 shadow-xl w-full mx-auto py-1 px-4">
      <div className="text-base md:text-xl font-semibold mt-2">
        <span className="cursor-pointer hover:border-b border-black transition-all duration-75 ease-in">
          <a href={props.destinationContact} target="_blank">
            {props.destinationAddress}
          </a>
        </span>
      </div>
      <div className="mt-2">จังหวัด {props.destinationProvince}</div>
      <div>เบอร์ติดต่อร้าน {props.destinationTel}</div>
      <div className="absolute left-0 w-full bottom-2 flex justify-between items-center">
        <span className=" ml-4">
          ระยะทาง {(props.distance / 1000).toFixed(2)} กม.
        </span>
        <button
          onClick={() =>
            props.clickDetailMap(
              props.distance,
              props.sourceAddress,
              props.destinationAddress,
              props.sourceLongitude,
              props.sourceLatitude,
              props.destinationLongitude,
              props.destinationLatitude,
              props.destinationProvince,
              props.destinationTel,
              props.destinationContact
            )
          }
          className="mr-3 bg-orangey px-2 py-1 font-medium text-base rounded-lg text-white hover:bg-orange-500 transition-colors duration-150 ease-in"
        >
          แผนที่
        </button>
      </div>
    </div>
  );
}

export default DisplayEntriesMap;
