import { useState } from "react";
import type { FlightInfo } from "../reservation-passengers-seatClass/ReservationPassengersSeatClass";
import type { PassengerData } from "../reservation-passengers-info/ReservationPassengersInfo";

interface ReservationPassengersSeatsProps {
  departingFlightInfo: FlightInfo;
  returningFlightInfo?: FlightInfo;
  passengersInfo: PassengerData[]; 
}

const ReservationPassengersSeats: React.FC<ReservationPassengersSeatsProps> = () => {

  const [selectedClass, setSelectedClass] = useState('economy');

  const seatOptions = [
    {
      type: 'economy',
      title: 'Economy',
      badge: 'Selected',
      description: 'Standard comfort with essential amenities for your journey',
      features: [
        'Standard seat pitch',
        'Complimentary snacks',
        'In-flight entertainment'
      ]
    },
    {
      type: 'business',
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
      ]
    }
  ];


  return (
    <div>
      <h1>ReservationPassengersSeats</h1>
    </div>
    
  );
};

export default ReservationPassengersSeats;
