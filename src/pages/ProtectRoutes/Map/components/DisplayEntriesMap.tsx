// types
import { DisplayEntriesMapProps } from "../types/DisplayEntriesMapTypes";

function DisplayEntriesMap(props: DisplayEntriesMapProps) {
  return (
    <div className="relative border basis-[400px] h-[160px] rounded border-gray-300 shadow-xl mx-auto py-1 px-4">
      <div className="text-base md:text-xl font-semibold mt-2">
        <span className="cursor-pointer hover:border-b border-black transition-all duration-75 ease-in">
          <a href={props.destinationContact} target="_blank">
            {props.destinationAddress}
          </a>
        </span>
      </div>
      <div className="mt-2">จังหวัด {props.destinationProvince}</div>
      <div>เบอร์ติดต่อร้าน {props.destinationTel}</div>
      <div className="absolute left-0 bottom-2 w-full flex justify-between items-center">
        <span className="ml-4">
          ระยะทาง {(props.distance / 1000).toFixed(2)} กม.
        </span>
        <button
          onClick={() =>
            props.clickDetailMap({
              distance: props.distance,
              sourceAddress: props.sourceAddress,
              destinationAddress: props.destinationAddress,
              sourceLongitude: props.sourceLongitude,
              sourceLatitude: props.sourceLatitude,
              destinationLongitude: props.destinationLongitude,
              destinationLatitude: props.destinationLatitude,
              destinationProvince: props.destinationProvince,
              destinationTel: props.destinationTel,
              destinationContact: props.destinationContact,
            })
          }
          className="mr-2 px-2 py-1 bg-thrith hover:bg-orange-500 text-white rounded-md text-md transition ease-in duration-150"
        >
          แผนที่
        </button>
      </div>
    </div>
  );
}

export default DisplayEntriesMap;
