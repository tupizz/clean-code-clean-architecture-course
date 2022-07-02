const FIRST_DIGIT_FACTOR = 10;
const SECOND_DIGIT_FACTOR = 11;

function isInvalidLength(cpf: number[]) {
  return cpf.length !== 11;
}

function isIdenticalEachDigit(cpf: number[]) {
  const [firstDigit] = cpf;
  return cpf.every((digit) => digit === firstDigit);
}

function calculateCheckDigit(cpf: number[], factor: number) {
  const total = cpf.reduce((total, digit) => {
    if (factor > 1) total += digit * factor--;
    return total;
  }, 0);
  const rest = total % 11;
  return rest < 2 ? 0 : 11 - rest;
}

function extractCheckDigit(cpf: number[]) {
  return parseInt(cpf.join("").slice(-2));
}
function cleanUpCpfString(cpf: string) {
  return [...cpf.replace(/\D/g, "")].map((number) => parseInt(number));
}

export function validate(cpfString: string) {
  if (!cpfString) return false;
  const cpf = cleanUpCpfString(cpfString);
  if (isInvalidLength(cpf)) return false;
  if (isIdenticalEachDigit(cpf)) return false;

  const checkDigit = extractCheckDigit(cpf);

  const calculatedCheckDigit1 = calculateCheckDigit(cpf, FIRST_DIGIT_FACTOR);
  if ([...checkDigit.toString()][0] !== calculatedCheckDigit1.toString())
    return false;

  const calculatedCheckDigit2 = calculateCheckDigit(cpf, SECOND_DIGIT_FACTOR);
  if ([...checkDigit.toString()][1] !== calculatedCheckDigit2.toString())
    return false;

  return true;
}
