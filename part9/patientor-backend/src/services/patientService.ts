import patientData from '../../data/patients';
import { NonSensitivePatient, Patient } from '../types';

const getEntries = (): Array<Patient> => {
  return patientData;
};

const getNonSensitiveEntries = (): NonSensitivePatient[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addEntry = (): null => {
  return null;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addEntry
};