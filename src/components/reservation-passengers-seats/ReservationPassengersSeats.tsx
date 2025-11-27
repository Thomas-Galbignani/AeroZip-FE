import { useState } from 'react';
import SeatsAirplane from './seats-airplane/SeatsAirplane';
import type { FlightInfo } from '../reservation-passengers-seatClass/ReservationPassengersSeatClass';
import type { PassengerData } from '../reservation-passengers-info/ReservationPassengersInfo';
import ReservationPassengersSeatClass from '../reservation-passengers-seatClass/ReservationPassengersSeatClass';
import { SeatClass } from '../../models/seatClass';

interface ReservationPassengersSeatsProps {
  departingFlightInfo: FlightInfo;
  returningFlightInfo?: FlightInfo;
  passengersInfo: PassengerData[];
}

interface SelectedSeats {
  departure: {
    seat: string;
    seatClass: string;
  };
  returning?: {
    seat: string;
    seatClass: string;
  };
}

interface ReservationPassengersSeatsProps {}

const availableSeats = ['A1', 'B1', 'B2', 'A7', 'B7', 'D7', 'E7', 'D14'];
const seatOptions = [
  {
    type: SeatClass.ECONOMY,
    title: 'Economy',
    badge: 'Selected',
    description: 'Standard comfort with essential amenities for your journey',
    features: [
      'Standard seat pitch',
      'Complimentary snacks',
      'In-flight entertainment',
    ],
    imageSrc: 'src/assets/Economy Seats.png',
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
      'Dedicated cabin crew',
    ],
    imageSrc: 'src/assets/Business Seats.png',
  },
];

const ReservationPassengersSeats: React.FC<ReservationPassengersSeatsProps> = ({
  departingFlightInfo,
  returningFlightInfo = null,
  passengersInfo,
}) => {
  const [selectedClass, setSelectedClass] = useState<SeatClass>(
    SeatClass.ECONOMY
  );
  const [selectedSeat, setSelectedSeat] = useState<string>('');

  const [passengerIndex, setPassengerIndex] = useState<number>(0);
  const [selectedSeats, setSelectedSeats] = useState<SelectedSeats[]>([]);
  const [selectedFlight, setSelectedFlight] =
    useState<FlightInfo>(departingFlightInfo);
  const [isDepartingFlightSelection, setIsDepartingFlightSelection] =
    useState<boolean>(true);

  const handleClassChange = (newSelectedClass: SeatClass) => {
    setSelectedClass(newSelectedClass);
  };

  const handleNextClick = () => {
    const tempSelectedSeats = selectedSeats;

    if (!tempSelectedSeats.length) {
      tempSelectedSeats.push({
        departure: {
          seat: selectedSeat,
          seatClass: selectedClass,
        },
      });
    } else {
      if (tempSelectedSeats[passengerIndex]?.departure) {
        tempSelectedSeats[passengerIndex].returning = {
          seat: selectedSeat,
          seatClass: selectedClass,
        };
      } else {
        tempSelectedSeats.push({
          departure: {
            seat: selectedSeat,
            seatClass: selectedClass,
          },
        });
      }
    }

    if (tempSelectedSeats[passengerIndex]?.returning) {
      setPassengerIndex(pi => ++pi);
      setSelectedFlight(departingFlightInfo);
      setIsDepartingFlightSelection(true);
    } else {
      if (returningFlightInfo) {
        setSelectedFlight(returningFlightInfo);
        setIsDepartingFlightSelection(false);
      } else {
        setPassengerIndex(pi => ++pi);
      }
    }

    setSelectedSeat('');
    console.log('next click', tempSelectedSeats);
    setSelectedSeats(tempSelectedSeats);
  };

  return (
    <div className="row">
      <div className="col-12 col-md-6 col-lg-5">
        <div className="d-flex justify-content-center w-100 overflow-auto p-2">
          <SeatsAirplane
            availableSeats={availableSeats}
            selectedSeat={selectedSeat}
            setSelectedSeat={setSelectedSeat}
            selectedClass={selectedClass}
          ></SeatsAirplane>
        </div>
      </div>
      <div className="col-12 col-md-6 col-lg-7">
        <ReservationPassengersSeatClass
          flight={selectedFlight}
          passenger={passengersInfo[passengerIndex]}
          selectedClass={selectedClass}
          onClassChange={handleClassChange}
          onNext={handleNextClick}
          seatOptions={seatOptions}
          selectedSeat={selectedSeat}
          hasReturningFlight={!!returningFlightInfo}
          isDepartingFlightSelection={isDepartingFlightSelection}
          departureDepartureDate={departingFlightInfo.departureTime}
          returningDepartureDate={returningFlightInfo?.departureTime ?? ''}
        ></ReservationPassengersSeatClass>
      </div>
    </div>
  );
};

export default ReservationPassengersSeats;
