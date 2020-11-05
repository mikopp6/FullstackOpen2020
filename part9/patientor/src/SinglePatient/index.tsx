import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import { Patient } from "../types";

const SinglePatient: React.FC = () => {
  const [{ patients }, dispatch] = useStateValue();

  const { id } = useParams<{ id: string }>();
  
  React.useEffect(() => {
    const fetchSinglePatient = async () => {
      console.log('trying0');
      try {
        const { data: singlePatientFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch({ type: "SET_SINGLE_PATIENT", payload: singlePatientFromApi });
      } catch (e) {
        console.error(e);
      }
    };
    fetchSinglePatient();
  }, [id, dispatch]);

  const patient = patients[id]
    ? patients[id]
    : undefined;
  
  return (
    <div>
      <h3>{patient?.name}</h3>
      <p>gender: {patient?.gender}</p>
      <p>ssn: {patient?.ssn}</p>
      <p>occupation: {patient?.occupation}</p>
      <p>dob: {patient?.dateOfBirth}</p>
    </div>
  );
};

export default SinglePatient;