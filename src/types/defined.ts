const isDefined = (value: any) => {
  if ([null, undefined, 'null', 'undefined'].includes(value)) {
    return false;
  }
  return true;
};

export default isDefined;
