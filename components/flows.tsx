let RouteTemplate = ({ routes, toCurrency, fromCurrency }: any) => {
  const gotoLink = (platformName: string, input: string, output: string) => {
    if (platformName == "Jupitor") {
      window.open(`https://jup.ag/swap/${input}-${output}`, "_blank");
    } else if (platformName == "Raydium") {
      window.open(
        `https://raydium.io/swap/?inputMint=${input}&outputMint=${output}`,
        "_blank"
      );
    } else if (platformName == "Orca") {
      window.open(
        `https://www.orca.so/?tokenIn=${input}&tokenOut=${output}`,
        "_blank"
      );
    }
  };
  return (
    <div className="text-white mt-10 rounded-md">
      {routes.map((route: any, i: number) => (
        <div key={i + "_route"} className="flex flex-row gap-2">
          <span>{i + 1}.</span>
          <div className="font-semibold">{route.calculateTokenValue}</div>
          <span>{"->"}</span>
          <div>{route.platformName}</div>
          {route.gotoLink && (
            <span
              className="text-sky-500 cursor-pointer"
              onClick={() =>
                gotoLink(
                  route.platformName,
                  fromCurrency.address,
                  toCurrency.address
                )
              }
            >
              Go to
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default RouteTemplate;
