import { v4 as uuidv4} from 'uuid';
import patientData from '../../data/patients';
import { NonSensitivePatient, NewPatient, Patient } from '../types';

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

const addPatient = ( patient : NewPatient ): Patient => {
  const newPatient = {
    id: uuidv4(),
    ...patient
  };
  
  patientData.push(newPatient);
  return newPatient;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addPatient
};