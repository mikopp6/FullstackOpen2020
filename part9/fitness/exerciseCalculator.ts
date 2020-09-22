interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: String;
  target: number;
  average: number;
}

const parseExerciseArguments = (args: Array<String>): Array<number> => {
  if (args.length < 4) throw new Error('Not enough arguments');
  const hours = process.argv.slice(2).map(value => Number(value));
  if (hours.some(isNaN)) throw new Error('Provided values were not numbers!');
  return hours;
}

const calculateExercises = (hours: Array<number>): Result => {
  const target = hours[0];
  hours = hours.slice(1);
  const periodLength = hours.length;
  const trainingDays = hours.filter(val => val !== 0).length;
  const average = hours.reduce((a,b) => a + b) / periodLength;
  const success = average >= target;

  let rating = 1;
  let ratingDescription = 'Failed, try again next week';

  if (success) {
    rating = 3;
    ratingDescription = 'Great Work!';
  } else if (average > target*0.75) {
    rating = 2;
    ratingDescription = 'Not too bad but could be better';
  }

  return {
    periodLength: periodLength,
    trainingDays: trainingDays,
    success: success,
    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
    average: average
  }
}


try {
  const hours = parseExerciseArguments(process.argv);
  console.log(calculateExercises(hours));
} catch (error) {
  console.log('Error: ', error.message);
}