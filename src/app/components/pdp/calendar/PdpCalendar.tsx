import "./PdpCalendar.css";
import { usePdp } from "../../../context/PropertyDetailsContext";

const PdpCalender = () => {
  const { propertyDetailsResponse } = usePdp();
  const price = propertyDetailsResponse?.price;

  return (
    <div className="calendar">
      <CalendarPrice price={price} nights={1} />
      <div className="calendar__inputgroup">
        <CalendarInput text={"CHECK-IN"} date={"11/12/34"} />
        <CalendarInput text={"CHECK-OUT"} date={"12/12/34"} />
      </div>
      <GuestInput />
      <ReserveButton />
    </div>
  );
};

const CalendarPrice = ({ price=0, nights=0 }) => {
  return (
    <div className="calendar__price">
      <p className="calendar__emeralds">{price} emeralds</p>
      <p className="calendar__nights">for {nights} night</p>
    </div>
  );
};

const ReserveButton = () => {
  return <button className="calendar__reserve">Reserve</button>;
};

const CalendarInput = ({ text, date }) => {
  return (
    <div className="calendar__input">
      <p className="calendar__input__text">{text}</p>
      <p className="calendar__input__date">{date}</p>
    </div>
  );
};

const GuestInput = () => {
  return (
    <div className="calendar__guests">
      <p className="calendar__guests__text">Guests</p>
      <p className="calendar__guests__input">1 guest</p>
    </div>
  );
};

export default PdpCalender;
