export const fetchApiCall = async (url: string) => {
  const response = await fetch(url);
  const responseJson: any = await response.json();
  return responseJson;
};

export const getDecimals = (decimals: any) => {
  return Math.pow(10, decimals);
};

export const calculateTokenValue = (data: any, token: any) => {
  if (data?.outAmount) {
    return data.outAmount / getDecimals(token.decimals);
  } else if (data?.data?.outputAmount) {
    return data.data.outputAmount / getDecimals(token.decimals);
  }
  return 0;
};
