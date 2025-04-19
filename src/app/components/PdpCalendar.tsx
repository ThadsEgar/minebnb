const PdpCalender = () => {
  return (
    <div>
      <div className="flex flex-col h-[300px] w-[285px] shadow-md rounded-4xl bg-white justify-center">
        <ReserveButton />
      </div>
    </div>
  );
};

const ReserveButton = () => {
    return (
        <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-300 mx-6">
            Reserve
        </button>
    )
}

export default PdpCalender;
