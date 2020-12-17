import { addOrIncrement, dateStringToMonth, getNextMonth } from "../utils";

test(`dateStringToMonth`, () => {
  expect(dateStringToMonth("2019-11-19T06:49:15Z")).toEqual("201911");
});

test(`addOrIncrement`, () => {
  const object = {
    cats: 2,
  };

  addOrIncrement(object, "cats");
  addOrIncrement(object, "dogs");
  expect(object).toEqual({
    cats: 3,
    dogs: 1,
  });
});

describe(`Get next month`, () => {
  test(`Get next month during year`, () => {
    expect(getNextMonth(`202001`)).toEqual(`202002`);
  });

  test(`Get next month end of year`, () => {
    expect(getNextMonth(`202012`)).toEqual(`202101`);
  });
});
