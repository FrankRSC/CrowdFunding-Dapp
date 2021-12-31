import React, { useState } from 'react';
import Layout from '../../../components/Layout';
import { Button, Form, Message, Input } from 'semantic-ui-react';
import Campaign from '../../../ethereum/campaign';
import web3 from '../../../ethereum/web3';
import { Link, Router } from '../../../routes';

const RequestNew = (props) => {

  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const [recipient, setRecipient] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();

    const campaign = Campaign(props.address);
    setLoading(true);
    setErrorMessage('');
    try {

      const accounts = await web3.eth.getAccounts();

      const request = await campaign.methods.createRequest(description, web3.utils.toWei(value, 'ether'), recipient).send({
        from: accounts[0]
      });

      Router.pushRoute(`/campaigns/${props.address}/requests/`);
    } catch (err) {
      console.log(err);
      setErrorMessage(err.message);
    }

    setLoading(false);
  }

  return (
    <Layout>
      <Link route={`/campaigns/${props.address}/requests`}>
        <Button>
          <a>Back</a>
        </Button>
      </Link>
      <h3>Create a new request</h3>
      <Form onSubmit={onSubmit} error={!!errorMessage}>
        <Form.Field>
          <label>Description</label>
          <Input
            value={description}
            onChange={event => setDescription(event.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Value in Ether</label>
          <Input
            value={value}
            onChange={event => setValue(event.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Recipient</label>
          <Input
            value={recipient}
            onChange={event => setRecipient(event.target.value)}
          />
        </Form.Field>
        <Message error header="Oops!" content={errorMessage} />
        <Button primary loading={loading}>
          Create!
        </Button>
      </Form>
    </Layout>
  );
}

RequestNew.getInitialProps = async (props) => {
  const { address } = props.query;

  return { address };

}

export default RequestNew;