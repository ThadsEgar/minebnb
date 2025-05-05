import './PdpCalendar.css';
import { usePdp } from "../../../context/PropertyDetailsContext";

const PdpCalender = () => {
  const { propertyDetailsResponse } = usePdp();
  const price = propertyDetailsResponse?.price

  return (
      <div className="calendar">
        <CalendarPrice price={price} nights={3} />
        <div className="calendar__inputgroup">
          <CalendarInput text={'CHECK-IN'} date={'5/12/34'} />
          <CalendarInput text={'CHECK-OUT'} date={'5/12/34'}/>
        </div>
        <ReserveButton />
      </div>
  );
};

const CalendarPrice = ({price, nights}) => {
  return ( 
    <div>
      <p>${price} for {nights} nights</p>
    </div>
  )
}

const ReserveButton = () => {
    return (
        <button className="calendar__reserve">
            Reserve
        </button>
    )
}

const CalendarInput = ({text, date}) => {
  return (<div className="calendar__input">
    <p>{text}</p>
    <p>{date}</p>
  </div>);
}

const GuestInput = () => {

}

export default PdpCalender;
