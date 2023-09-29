interface SuggestItemProps {
  address: string;
  doSuggest: (detail: string) => void;
}

const SuggestItem = ({ address, doSuggest }: SuggestItemProps) => {
  return (
    <div
      onClick={() => doSuggest(address)}
      className="hover:bg-slate-100 cursor-pointer border border-gray-400 rounded py-1 pl-2 mt-1 text-start"
    >
      <span>{address}</span>
    </div>
  );
};

export default SuggestItem;
