interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: String,
  target: number,
  average: number
}

const calculateExercises = (hours: Array<number>): Result => {
  const periodLength = hours.length
  const trainingDays = hours.filter(val => val !== 0).length
  const target = 2
  const average = hours.reduce((a,b) => a + b) / periodLength
  const success = average >= target

  let rating = 1
  let ratingDescription = 'Failed, try again next week'

  if (success) {
    rating = 3
    ratingDescription = 'Great Work!'
  } else if (average > target*0.75) {
    rating = 2
    ratingDescription = 'Not too bad but could be better'
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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1]))