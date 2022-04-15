const isDefined = (value: any) => {
  if (
    value === null ||
    value === undefined ||
    value === 'null' ||
    value === 'undefined'
  ) {
    return false;
  }
  return true;
};

export default isDefined;
