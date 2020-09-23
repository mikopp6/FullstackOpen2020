const calculateBmi = (args: Array<string>) : string => {
  if (args.length < 2 || args.includes('undefined')) throw new Error('Not enough arguments');
  if (args.length > 2) throw new Error('Too many arguments');

  const height: number = parseInt(args[0]);
  const weight: number = parseInt(args[1]);

  if (isNaN(height) || isNaN(weight)) throw new Error('Provided values were not numbers!');

  const BMI = weight/((height/100)**2);

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
};

export default calculateBmi;