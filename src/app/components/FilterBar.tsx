import Image from "next/image";
import { useSearch } from "../context/SearchContext";

export const mockFilterPairs = [
  {name: "Meadow", imageLocation: "/filterBar/meadow.png"},
  {name: "Savana", imageLocation: "/filterBar/savannah.png"},
  {name: "Desert", imageLocation: "/filterBar/desert.png"},
  {name: "Plains", imageLocation: "/filterBar/plains.png"},
  {name: "Snowy", imageLocation: "/filterBar/snowy.png"},
]

const Filters = () => {
  const {filters, setFilters} = useSearch();
  const filterClickCallback = (filter) => {
    setFilters(filter);
  }
    return (
      <div className="border-b-2 border-gray-300 py-4">
        <div className="flex items-center justify-center min-h-3 text-black gap-8">
          {
            mockFilterPairs.map((filterPair) => (
              <Filter key={filterPair.name} filterPair={filterPair} filterClickCallback={filterClickCallback}/>
            ))
          }
        </div>
      </div>
    )
  }


const Filter = ({filterPair, filterClickCallback}) => {
  const filterName = filterPair.name;
  const imageLocation = filterPair.imageLocation;
  return (
    <button className="flex flex-col p-1 items-center gap-2 text-gray-500 hover:bg-gray-200" onClick={() => filterClickCallback(filterName)}>
        <Image src={`${imageLocation}`} alt="Filter" width={30} height={30} />
        <div className="text-sm">{filterName}</div>
    </button>
  )
}

export default Filters;