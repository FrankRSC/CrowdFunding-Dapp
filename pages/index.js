import React, { useEffect, useState } from "react";
import factory from "../ethereum/factory";
import { Button, Card } from 'semantic-ui-react';
import Layout from "../components/Layout";
import { Link } from '../routes';

const Index = (props) => {
  console.log(props.campaigns);

  const renderCampaigns = () => {
    const items = props.campaigns.map(address => {
      return {
        header: address,
        description: (
          <Link route={`/campaigns/${address}`}>
          <a>View campaign</a>
          </Link>
        ),
        fluid: true
      }
    })

    return <Card.Group items={items} />
  }


  return (
    <Layout>
      <div>

        <h3>Open Campaigns</h3>
        <Link route="/campaigns/new">
          <a>
            <Button
              floated="right"
              content="Create Campaign"
              icon="add"
              primary
            />
          </a>
        </Link>
        {renderCampaigns()}
      </div>
    </Layout>
  )
}

Index.getInitialProps = async () => {
  const campaigns = await factory.methods.getDeployedCampaigns().call();
  return { campaigns };
}

//export default the module;
export default Index;
