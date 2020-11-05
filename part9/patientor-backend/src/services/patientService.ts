import { v4 as uuidv4} from 'uuid';
import patientData from '../../data/patients';
import { PublicPatient, NewPatient, Patient } from '../types';

const getEntries = (): Array<Patient> => {
  return patientData;
};

const getNonSensitiveEntries = (): PublicPatient[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getSingleEntry = ( id : string ): Patient => {
  const result = patientData.find(patient => patient.id === id);

  if (result === undefined) {
    throw new TypeError('No person found');
  }

  const resultEntries = {...result, entries: []};
  return resultEntries;
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
  getSingleEntry,
  addPatient
};