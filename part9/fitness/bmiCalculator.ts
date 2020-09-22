
interface values {
  height: number;
  weight: number;
}

const parseMeasurementsArguments = (args: Array<String>): values => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

const calculateBmi = (measurements: values) : String => {
  const BMI = measurements.weight/((measurements.height/100)**2);

  switch(true) {
    case (BMI <= 18.5):
      return  (`Underweight (BMI < 18.5), BMI = ${BMI}`);
    case (BMI <= 25):
      return (`Normal weight (BMI 18.5-25), BMI = ${BMI}`);
    case (BMI <= 30): 
      return (`Overweight (BMI 25-30), BMI = ${BMI}`);
    case (BMI > 30):
      return (`Obese (BMI > 30), BMI = ${BMI}`);
    default:
      throw new Error('Invalid parameters');
  }
}

try {
  const measurements = parseMeasurementsArguments(process.argv);
  console.log(calculateBmi(measurements));
} catch (error) {
  console.log('Error: ', error.message);
}