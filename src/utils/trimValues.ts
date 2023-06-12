interface TrimDataType {
  [key: string]: any;
}
const trimValues = <T extends TrimDataType>(values: T): T => {
  const tempValues = { ...values };

  // eslint-disable-next-line no-restricted-syntax, guard-for-in
  for (const property in tempValues) {
    const target: any = tempValues[property];
    if (typeof target === "string") {
      tempValues[property] = tempValues[property].trim();
    }
  }

  return tempValues;
};

export default trimValues;
