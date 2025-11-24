import { useState } from "react";
import SeatsAirplane from "./seats-airplane/SeatsAirplane";
import type { FlightInfo } from "../reservation-passengers-seatClass/ReservationPassengersSeatClass";
import type { PassengerData } from "../reservation-passengers-info/ReservationPassengersInfo";
import ReservationPassengersSeatClass from "../reservation-passengers-seatClass/ReservationPassengersSeatClass";
import { SeatClass } from "../../models/seatClass";

interface ReservationPassengersSeatsProps {
  departingFlightInfo: FlightInfo;
  returningFlightInfo?: FlightInfo;
  passengersInfo: PassengerData[];
}

interface ReservationPassengersSeatsProps { }

const availableSeats = ["A1", "B1", "B2", "A7", "B7", "D7", "E7"];
const seatOptions = [
  {
    type: SeatClass.ECONOMY,
    title: 'Economy',
    badge: 'Selected',
    description: 'Standard comfort with essential amenities for your journey',
    features: [
      'Standard seat pitch',
      'Complimentary snacks',
      'In-flight entertainment'
    ],
    imageSrc: "src/assets/Economy Seats.png"
  },
  {
    type: SeatClass.BUSINESS,
    title: 'Business Class',
    badge: 'Selected',
    description: 'Premium experience with enhanced comfort and service',
    features: [
      'Extra legroom',
      'Priority boarding',
      'Premium meals',
      'Lounge access',
      'Lie-flat seats',
      'Dedicated cabin crew'
    ],
    imageSrc: "src/assets/Business Seats.png"
  }
];

const ReservationPassengersSeats: React.FC<ReservationPassengersSeatsProps> = ({ departingFlightInfo, returningFlightInfo = null, passengersInfo }) => {
  const [selectedClass, setSelectedClass] = useState<SeatClass>(SeatClass.ECONOMY);
  const [selectedSeat, setSelectedSeat] = useState<string>("");

  const handleClassChange = (newSelectedClass: SeatClass) => {
    setSelectedClass(newSelectedClass);
  }

  const handleSaveClick = () => {
    console.log("save click");
  }

  const handleNextClick = () => {
    console.log("next click");
  }

  return (
    <div className="d-flex">
      <SeatsAirplane availableSeats={availableSeats} selectedSeat={selectedSeat} setSelectedSeat={setSelectedSeat} selectedClass={selectedClass}></SeatsAirplane>
      <ReservationPassengersSeatClass
        flight={departingFlightInfo}
        passenger={passengersInfo[0]}
        selectedClass={selectedClass}
        onClassChange={handleClassChange}
        onSave={handleSaveClick} onNext={handleNextClick}
        seatOptions={seatOptions}></ReservationPassengersSeatClass>
    </div>
  );
};

export default ReservationPassengersSeats;
