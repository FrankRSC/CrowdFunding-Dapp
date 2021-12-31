import React, { useState } from 'react'
import { Form, Button, Input, Message } from 'semantic-ui-react'
import Campaign from '../ethereum/campaign'
import web3 from '../ethereum/web3';
import { Router } from '../routes';

const ContributeForm = (props) => {

  const [value, setValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const onSubmit = async (event) => {
    event.preventDefault()

    const campaign = Campaign(props.address)
    setLoading(true);
    setErrorMessage('');

    try {
      const accounts = await web3.eth.getAccounts()
      await campaign.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(value, 'ether')
      });
      Router.replaceRoute(`/campaigns/${props.address}`);
    } catch (error) {
      console.log(error);
      setErrorMessage(error.message);
    }

    setLoading(false);
    setValue('');
  }

  return (
      <Form onSubmit={onSubmit} error={!!errorMessage}>
        <Form.Field>
          <label>Amount to Contribute</label>
          <Input
            label="ether"
            labelPosition="right"
            value={value}
            onChange={event => setValue(event.target.value)}
          />
        </Form.Field>
        <Message error header="Oops!" content={errorMessage} />
        <Button primary loading={loading}>
          Contribute!
        </Button>
      </Form>
  )
}

export default ContributeForm;