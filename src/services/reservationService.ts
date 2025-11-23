import type { SearchFlightsFormData } from '../components/search-flights/SearchFlights';
import type { Flight } from './flightService';

const PENDING_RESERVATION = 'pending_reservation';

export type PendingReservation = {
  departingFlight: Flight;
  returningFlight: Flight | null;
  searchData: SearchFlightsFormData;
};

const getPendingReservation = (): PendingReservation | null => {
  const data = localStorage.getItem(PENDING_RESERVATION);
  if (!data) return null;
  return JSON.parse(data);
};

const setPendingReservation = (data: PendingReservation): void => {
  localStorage.setItem(PENDING_RESERVATION, JSON.stringify(data));
};

const removePendingReservation = (): void => {
  localStorage.removeItem(PENDING_RESERVATION);
};

export const reservationService = {
  getPendingReservation,
  setPendingReservation,
  removePendingReservation,
};
