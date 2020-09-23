interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface ExerciseArgs {
  daily_exercises: Array<number>;
  target: number;
}

const calculateExercises = (args: ExerciseArgs): Result => {
  if (!args.daily_exercises || !args.target) throw new Error('Not enough arguments');

  const target = args.target;
  const hours = args.daily_exercises;

  if (typeof hours === 'string' || hours.some(isNaN) || isNaN(target)) throw new Error('Provided values were not numbers!');
  
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
  };
};

export default calculateExercises;