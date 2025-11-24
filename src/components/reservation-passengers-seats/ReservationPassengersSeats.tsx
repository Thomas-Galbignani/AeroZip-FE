import { useState } from "react";
import SeatsAirplane from "./seats-airplane/SeatsAirplane";

interface ReservationPassengersSeatsProps { }

const availableSeats = ["A1", "B1", "B2", "A7", "B7", "D7", "E7"];

const ReservationPassengersSeats: React.FC<ReservationPassengersSeatsProps> = () => {
  const [selectedSeat, setSelectedSeat] = useState<string>("");

  return (
    <div>
      <SeatsAirplane availableSeats={availableSeats} selectedSeat={selectedSeat} setSelectedSeat={setSelectedSeat} selectedClass={'ECONOMY'}></SeatsAirplane>
    </div>
  );
};

export default ReservationPassengersSeats;
