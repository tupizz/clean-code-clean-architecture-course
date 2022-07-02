import { validate } from "../src/cpf";

describe("Cpf", () => {
  test("Deve validar um cpf válido", function () {
    const isValid = validate("117.230.476-94");
    expect(isValid).toBeTruthy();
  });

  const wrongSameDigitCpf = [
    "111.111.111-11",
    "222.222.222-22",
    "333.333.333-33",
  ];

  test.each(wrongSameDigitCpf)(
    "Deve validar um cpf inválido com todos os números iguais",
    function (cpf) {
      const isValid2 = validate(cpf);
      expect(isValid2).toBeFalsy();
    }
  );

  test("Deve validar um cpf inválido que seja nulo", function () {
    const isValid3 = validate("");
    expect(isValid3).toBeFalsy();
  });

  test("Deve validar um cpf válido sem pontos e traços", function () {
    const isValid = validate("93541134780");
    expect(isValid).toBeTruthy();
  });

  test("Deve validar um cpf válido com alguns pontos", function () {
    const isValid = validate("935.411.34780");
    expect(isValid).toBeTruthy();
  });
});
