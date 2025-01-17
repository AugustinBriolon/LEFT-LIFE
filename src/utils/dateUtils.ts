import { DateInputs } from "../types/types";

export const isValidDate = (day: number, month: number, year: number): boolean => {
  const date = new Date(year, month - 1, day);
  return (
    date.getDate() === day &&
    date.getMonth() === month - 1 &&
    date.getFullYear() === year
  );
};

export const isDateInRange = (dateStr: string): boolean => {
  const inputDate = new Date(dateStr);
  const today = new Date();
  const minDate = new Date();
  minDate.setFullYear(today.getFullYear() - 90);

  return inputDate <= today && inputDate >= minDate;
};

export const formatDateString = (dateInputs: DateInputs): string => {
  const { day, month, year } = dateInputs;
  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
};

export const calculateWeeksLived = (birthDate: string): number => {
  const startDate = new Date(birthDate);
  const today = new Date();
  return Math.floor(
    (today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 7)
  );
};