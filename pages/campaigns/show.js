import React from "react";
import Layout from "../../components/Layout";
import Campaign from "../../ethereum/campaign";
import { Card, Grid, GridColumn, Button } from 'semantic-ui-react';
import web3 from "../../ethereum/web3";
import ContributeForm from "../../components/ContributeForm";
import { Link } from '../../routes';

const campaignShow = (props) => {

  const renderCards = () => {
    const {
      balance,
      manager,
      minimumContribution,
      requestsCount,
      approversCount
    } = props;

    const items = [
      {
        header: manager,
        meta: "Address of Manager",
        description: 'The manager created this campaign and can create requests to withdraw money',
        style: { overflowWrap: 'break-word' }
      },
      {
        header: minimumContribution,
        meta: "Minimum contribution (wei)",
        description: 'You must contribute at least this much wei to become an approver',
        style: { overflowWrap: 'break-word' }
      },
      {
        header: requestsCount,
        meta: "Number of Requests",
        description: 'A request tries to withdraw money from the contract. Requests must be approved by approvers',
        style: { overflowWrap: 'break-word' }
      },
      {
        header: approversCount,
        meta: "Number of Approvers",
        description: 'Number of people who have already donated to this campaign',
        style: { overflowWrap: 'break-word' }
      },
      {
        header: web3.utils.fromWei(balance, 'ether'),
        meta: "Campaign Balance (ether)",
        description: 'The balance is how much money this campaign has left to spend',
        style: { overflowWrap: 'break-word' }
      }
    ];

    return <Card.Group items={items} />;
  }

  return (
    <Layout>
      <h3>Campaign Show</h3>
      <Grid>
        <Grid.Row>
          <Grid.Column width={10}>
            {renderCards()}

          </Grid.Column>
          <Grid.Column width={6}>
            <ContributeForm address={props.address} />
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column>
            <Link route={`/campaigns/${props.address}/requests`}>
              <a>
                <Button
                  content="View Requests"
                  icon="add"
                  primary
                />
              </a>
            </Link>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Layout>
  )
}


campaignShow.getInitialProps = async (props) => {
  const { address } = props.query;

  console.log("Adress from show: ", address);
  const campaign = Campaign(address)

  const summary = await campaign.methods.getSummary().call();
  console.log('Summary: ', summary);

  return {
    address: props.query.address,
    minimumContribution: summary[0],
    balance: summary[1],
    requestsCount: summary[2],
    approversCount: summary[3],
    manager: summary[4]
  };

}
export default campaignShow;