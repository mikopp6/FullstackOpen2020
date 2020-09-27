import diagnoseData from '../../data/diagnoses';
import { Diagnose } from '../types';

const getEntries = (): Array<Diagnose> => {
  return diagnoseData;
};

const addEntry = (): null => {
  return null;
};

export default {
  getEntries,
  addEntry
};