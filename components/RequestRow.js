import React from 'react';
import { Button, Table } from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import Campaign from '../ethereum/campaign';

const RequestRow = (props) => {

  const { Row, Cell } = Table;
  const { id, request, approversCount } = props;
  const readyToFinalize = request.approvalCount > approversCount / 2 && request.complete == false;

  const onApprove = async () => {
    const accounts = await web3.eth.getAccounts();

    const campaign = Campaign(props.address);

    await campaign.methods.approveRequest(id).send({
      from: accounts[0]
    });
  }

  const onFinalize = async () => {
    const accounts = await web3.eth.getAccounts();
    const campaign = Campaign(props.address);
    await campaign.methods.finalizeRequest(id).send({
      from: accounts[0]
    });
  }
  return (
    <Row disabled={request.complete} positive={readyToFinalize}>
      <Cell>
        {id}
      </Cell>
      <Cell>
        {request.description}
      </Cell>
      <Cell>
        {web3.utils.fromWei(request.value, 'ether')}
      </Cell>
      <Cell>
        {request.recipient}
      </Cell>
      <Cell>
        {request.approvalCount}/{approversCount}
      </Cell>
      <Cell>
        {request.complete ? null :
          <Button color='green' basic onClick={onApprove}>Approve</Button>
        }
      </Cell>
      <Cell>
        {request.complete ? null :
          <Button color='teal' basic onClick={onFinalize}>Finalize</Button>
        }
      </Cell>
    </Row>
  )
}

export default RequestRow;