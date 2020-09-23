import express from 'express';
const app = express();
app.use(express.json());

import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  try {
    const values: Array<string> = [String(req.query.height), String(req.query.weight)];
    const measurements = calculateBmi(values);
    const result = {height: values[0], weight: values[1], BMI: measurements};
    res.send(result);
  } catch (error) {
    if (error instanceof Error){
      res.status(400).send({ error: error.message });
    }
  }
});

app.post('/exercises', (req, res) => {
  try { 
    const result = calculateExercises(req.body);
    res.send(result);
  } catch (error) {
    if (error instanceof Error){
      res.status(400).send({ error: error.message });
    }
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});