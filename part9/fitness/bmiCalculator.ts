
const calculateBmi = (height: number, weight: number) : String => {
  const BMI = weight/((height/100)**2)

  switch(true) {
    case (BMI <= 18.5):
      return  (`Underweight (BMI < 18.5), BMI = ${BMI}`)
    case (BMI <= 25):
      return (`Normal weight (BMI 18.5-25), BMI = ${BMI}`)
    case (BMI <= 30): 
      return (`Overweight (BMI 25-30), BMI = ${BMI}`)
    case (BMI > 30):
      return (`Obese (BMI > 30), BMI = ${BMI}`)
    default:
      throw new Error('Invalid parameters')
  }
}

console.log(calculateBmi(180, 74))