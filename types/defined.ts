const isDefined = (value: any) => {
  if (
    value === null ||
    value === 'null' ||
    value === undefined ||
    value === 'undefined'
  ) {
    return false;
  }
  return true;
};

export default isDefined;