import web3 from './web3';
import CampaingFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaingFactory.interface),
  '0x737072F792d70ffF7087408593d4668643cB882F'

); // create a new contract instance from the compiled interface deployed in the network previously

export default instance;

