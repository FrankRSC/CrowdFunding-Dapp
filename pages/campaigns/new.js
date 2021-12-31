import React, { useState } from "react";
import { Button, Form, Input, Message } from "semantic-ui-react";
import Layout from "../../components/Layout";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";
import { Router } from "../../routes";

const newCampaign = () => {

  const [minimumContribution, setMinimumContribution] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods.createCampaign(minimumContribution).send({
        from: accounts[0]
      });
    
      Router.pushRoute("/");
    } catch (err) {
      setErrorMessage(err.message);
    }
    setLoading(false);


  }

  return (
    <Layout>
      <h3>Create a new Campaign</h3>
      <Form onSubmit={onSubmit} error={!!errorMessage}>
        <Form.Field>
          <label>Minimum Contribution</label>
          <Input
            label="wei"
            labelPosition="right"
            value={minimumContribution}
            onChange={e => setMinimumContribution(e.target.value)}
          />
        </Form.Field>
        <Message error header="Oops!" content={errorMessage} />
        <Button loading={loading} type="submit" primary>Create Campaign</Button>
      </Form>
    </Layout>
  )
}

//export default the module;
export default newCampaign;
