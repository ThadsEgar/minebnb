import Image from "next/image";

const Filters = () => {
  const fakeFilters = ["Filter1", "Filter2", "Filter3", "Filter4", "Filter5", "Filter6", "Filter7", "Filter8", "Filter9", "Filter10"]
    return (
      <div className="border-b-2 border-gray-300 py-4">
        <div className="flex items-center justify-center min-h-3 text-black gap-8">
          {
            fakeFilters.map((filter) => (
              <Filter key={filter}/>
            ))
          }
        </div>
      </div>
    )
  }


const Filter = () => {
  return (
    <div className="flex flex-col items-center gap-2">
        <Image src={"https://placehold.co/100x100/png?text=House"} alt="Filter" width={48} height={48} />
        <div className="text-sm">Sample Filter</div>
    </div>
  )
}

export default Filters;