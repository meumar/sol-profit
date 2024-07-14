"use client";
import Image from "next/image";

import { useState, useEffect } from "react";
import { platforms } from "@/utils/platforms";

import { getDecimals, calculateTokenValue } from "../utils/tokensHelper";

import { Token, TokensObject } from "../utils/types";

import MainPlaceholder from "./placeholder";
import RouteTemplate from "./flows";
// import ImageComponent from "./image";

const toToken = {
  symbol: "USDC",
  name: "USD Coin",
};
const fromToken = {
  symbol: "SOL",
  name: "Wrapped SOL",
};
const fetchTokenList = async () => {
  let tokens: any = [];
  await Promise.all(
    platforms.map(async (platform) => {
      if (platform?.fetchTokens) {
        tokens = await platform.fetchTokens();
      }
    })
  );
  return tokens;
};
const CurrencyForm = () => {
  const [toAmount, setToAmount] = useState(0);
  const [toCurrency, setToCurrency] = useState<any>();
  const [toSelectedCurrency, setToSelectedCurrency] = useState(toToken.name);

  const [fromAmount, setFromAmount] = useState(0);
  const [fromCurrency, setFromCurrency] = useState<any>();
  const [fromSelectedCurrency, setFromSelectedCurrency] = useState(
    fromToken.name
  );

  const [tokens, setTokens] = useState<Token[]>([]);
  let [tokensObject, setTokensObject] = useState<TokensObject>({});

  const [routes, setRoutes] = useState<any[]>([]);

  const [mainLoading, setMainLoading] = useState<boolean>(true);
  const [generatingLoading, setGeneratingLoading] = useState<boolean>(false);

  useEffect(() => {
    const getTokenList = async () => {
      const tokenList = await fetchTokenList();
      const allObjects: TokensObject = {};
      tokenList.forEach((element: Token) => {
        allObjects[element.name] = element;
        if (element.symbol == toToken.symbol) {
          setToCurrency(element);
        }
        if (element.symbol == fromToken.symbol) {
          setFromCurrency(element);
        }
      });
      setTokensObject(allObjects);
      setTokens(tokenList);
      setMainLoading(false);
    };

    getTokenList();
  }, []);
  const handleSubmit = async () => {
    setRoutes([]);
    setGeneratingLoading(true);
    let prices = await Promise.all(
      platforms.map(async (platform) => {
        if (platform?.swap) {
          let price = await platform.swap(
            fromCurrency.address,
            toCurrency.address,
            fromAmount * getDecimals(fromCurrency.decimals)
          );
          return {
            ...price,
            ...{
              calculateTokenValue: calculateTokenValue(price, toCurrency),
              platformName: platform.name,
              gotoLink: platform.gotoLink,
            },
          };
        }
        return null;
      })
    );
    prices = prices
      .filter((e) => e)
      .sort((a, b) => b.calculateTokenValue - a.calculateTokenValue);
    setRoutes(prices);
    setToAmount(prices[0].calculateTokenValue);
    setGeneratingLoading(false);
  };

  const handleToCurrencyChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    if (event?.target?.value) {
      setToSelectedCurrency(event.target.value);
      if (tokensObject[event.target.value]) {
        setFromCurrency(tokensObject[event.target.value]);
        console.log("toCurrency", toCurrency);
      }
    }
  };

  const handleFromCurrencyChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    if (event?.target?.value) {
      setFromSelectedCurrency(event.target.value);
      if (tokensObject[event.target.value]) {
        setToCurrency(tokensObject[event.target.value]);
      }
    }
  };

  const handleSwap = () => {
    let to = {
      toCurrency,
      toSelectedCurrency,
    };
    setToSelectedCurrency(fromSelectedCurrency);
    setToCurrency(fromCurrency);

    setFromSelectedCurrency(to.toSelectedCurrency);
    setFromCurrency(to.toCurrency);
  };

  if (mainLoading) {
    return <MainPlaceholder />;
  }
  return (
    <div className="flex flex-row p-24">
      <div className="basis-4/12 min-w-min">
        <Image
          src={toCurrency.logoURI}
          loader={() => toCurrency.logoURI}
          className="img-fluid opacity-25"
          alt="Picture"
          width={500}
          height={500}
        />
      </div>
      <div className="basis-4/12 items-center w-full flex flex-col justify-center">
        <div className=" bg-slate-200 rounded-md p-4 w-96">
          <div className="items-center w-full flex flex-col justify-center">
            <h1 className="text-lg font-bold">Get profit!</h1>
          </div>
          <hr className="my-2" />
          <div className="form-group flex flex-col mt-2">
            <label>From</label>
            <div className="input-group flex flex-row">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <select
                    value={fromSelectedCurrency}
                    onChange={handleFromCurrencyChange}
                  >
                    {tokens.map((token: Token, i: number) => (
                      <option key={token.name + "_" + i} value={token.name}>
                        {token.symbol}
                      </option>
                    ))}
                  </select>
                </span>
              </div>

              <input
                type="number"
                placeholder="10.00"
                className="basis-1/2 form-control bg-white"
                value={fromAmount}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setFromAmount(Number(event.target.value))
                }
                min={0}
              />
            </div>
          </div>
          <div className="items-center w-full flex flex-col justify-center mt-2">
            <a
              className="link-opacity-25 cursor-pointer text-slate-600"
              onClick={handleSwap}
            >
              Swap
            </a>
          </div>
          <div className="form-group flex flex-col">
            <label>To</label>
            <div className="input-group flex flex-row">
              <div className="basis-1/4 input-group-prepend">
                <span className="input-group-text">
                  <select
                    value={toSelectedCurrency}
                    onChange={handleToCurrencyChange}
                  >
                    {tokens.map((token: Token, i: number) => (
                      <option key={token.name + "_" + i} value={token.name}>
                        {token.symbol}
                      </option>
                    ))}
                  </select>
                </span>
              </div>
              <input
                type="number"
                placeholder="10.00"
                className="form-control"
                value={toAmount}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setToAmount(Number(event.target.value))
                }
                readOnly={true}
              />
            </div>
          </div>
          <div className="flex flex-col mt-3">
            {generatingLoading ? (
              <p className="placeholder-glow">
                <span className="placeholder col-12 h-8 rounded-md"></span>
              </p>
            ) : (
              <button
                type="button"
                className="btn btn-dark form-control"
                onClick={handleSubmit}
                disabled={fromAmount <= 0}
              >
                Calculate
              </button>
            )}
          </div>
        </div>
        <RouteTemplate
          routes={routes}
          toCurrency={toCurrency}
          fromCurrency={fromCurrency}
        />
      </div>
      <div className="basis-4/12 min-w-min">
        <Image
          src={fromCurrency.logoURI}
          loader={() => fromCurrency.logoURI}
          className="img-fluid opacity-5"
          alt="Picture"
          width={500}
          height={500}
        />
      </div>
    </div>
  );
};

export default CurrencyForm;
