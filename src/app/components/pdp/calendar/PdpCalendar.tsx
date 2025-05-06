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
        <GuestInput />
        <ReserveButton />
      </div>
  );
};

const CalendarPrice = ({price, nights}) => {
  return ( 
    <div className="calendar__price">
      <p>{price} emeralds for</p>
      <p>{nights} nights</p>
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
  return(
    <div className="calendar__guests">
      <p>Guests</p>
      <p>1 guest</p>
    </div>
  )
}

export default PdpCalender;
