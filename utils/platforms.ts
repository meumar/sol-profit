import { fetchApiCall } from "./tokensHelper";

export const platforms = [
  {
    name: "Jupitor",
    tokens: "",
    priceUrl: `https://quote-api.jup.ag/v6/quote?inputMint=EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v&outputMint=So11111111111111111111111111111111111111112&amount=10000000&slippageBps=300&computeAutoSlippage=true&swapMode=ExactIn&onlyDirectRoutes=false&asLegacyTransaction=false&maxAccounts=64&minimizeSlippage=false&preferLiquidDexes=false`,
    multiPrices: `https://birdeye-proxy.jup.ag/defi/multi_price?list_address=EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v,So11111111111111111111111111111111111111112`,
    swap: (
      inputMint: string,
      outputMint: string = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
      amount: number = 10000000,
      slippageBps: number = 300,
      computeAutoSlippage: boolean = true,
      swapMode: string = "ExactIn",
      onlyDirectRoutes: boolean = false,
      asLegacyTransaction: boolean = false,
      maxAccounts: number = 64,
      minimizeSlippage: boolean = false,
      preferLiquidDexes: boolean = false
    ) =>
      fetchApiCall(
        `https://quote-api.jup.ag/v6/quote?inputMint=${inputMint}&outputMint=${outputMint}&amount=${amount}&slippageBps=${slippageBps}&computeAutoSlippage=${computeAutoSlippage}&swapMode=${swapMode}&onlyDirectRoutes=${onlyDirectRoutes}&asLegacyTransaction=${asLegacyTransaction}&maxAccounts=${maxAccounts}&minimizeSlippage=${minimizeSlippage}&preferLiquidDexes=${preferLiquidDexes}`
      ),
    gotoLink: true,
  },
  {
    name: "Raydium",
    tokens: "",
    priceUrl: `https://transaction-v1.raydium.io/compute/swap-base-in?inputMint=EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v&outputMint=So11111111111111111111111111111111111111112&amount=10000000&slippageBps=50&txVersion=V0`,
    multiPrices: `https://api-v3.raydium.io/mint/price?mints=So11111111111111111111111111111111111111112,mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So,4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R`,
    fetchTokens: () =>
      fetchApiCall("https://tokens.jup.ag/tokens?tags=lst,community"),
    swap: (
      inputMint: string,
      outputMint: string = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
      amount: number = 10000000,
      slippageBps: number = 300,
      txVersion: string = "V0"
    ) =>
      fetchApiCall(
        `https://transaction-v1.raydium.io/compute/swap-base-in?inputMint=${inputMint}&outputMint=${outputMint}&amount=${amount}&slippageBps=${slippageBps}&txVersion=${txVersion}`
      ),
    gotoLink: true,
  },
  {
    name: "Orca",
    tokens: "https://api.mainnet.orca.so/v1/token/list",
    priceUrl: `https://quote-api.jup.ag/v6/quote?inputMint=So11111111111111111111111111111111111111112&outputMint=EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v&amount=1000000000&slippageBps=50&swapMode=ExactIn`,
    multiPrices: ``,
    swap: (
      inputMint: string,
      outputMint: string = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
      amount: number = 10000000,
      slippageBps: number = 300,
      swapMode: string = "ExactIn"
    ) =>
      fetchApiCall(
        `https://quote-api.jup.ag/v6/quote?inputMint=${inputMint}&outputMint=${outputMint}&amount=${amount}&slippageBps=${slippageBps}&swapMode=${swapMode}`
      ),
    gotoLink: true,
  },
];
