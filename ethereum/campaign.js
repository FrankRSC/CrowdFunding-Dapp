import web3 from "./web3";
import Campaign from "./build/Campaign.json";

export default address => {
  return new web3.eth.Contract(
    JSON.parse(Campaign.interface),
    address
  );
} // create a new contract instance from the compiled interface deployed in the network previously