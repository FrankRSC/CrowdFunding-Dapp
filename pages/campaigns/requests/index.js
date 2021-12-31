import React from 'react';
import Layout from '../../../components/Layout';
import { Button, Table } from 'semantic-ui-react';
import { Link } from '../../../routes';
import Campaign from '../../../ethereum/campaign';
import RequestRow from '../../../components/RequestRow';

const RequestIndexPage = (props) => {

  const { Header, Row, HeaderCell, Body } = Table;

  const renderRows = () => {
    return props.allRequests.map((request, index) => {
      return <RequestRow
        key={index}
        id={index}
        request={request}
        address={props.address}
        approversCount={props.approversCount}
        campaign={props.campaign}
      />
    })
  }

  return (
    <Layout>
      <h1>Request Index Page</h1>
      <Link route={`/campaigns/${props.address}/requests/new`}>
        <a>
          <Button primary floated='right' style={{ marginBottom: 10 }}>
            Add Request
          </Button>
        </a>
      </Link>
      <Table>
        <Header>
          <Row>
            <HeaderCell>ID</HeaderCell>
            <HeaderCell>Description</HeaderCell>
            <HeaderCell>Amount</HeaderCell>
            <HeaderCell>Recipient</HeaderCell>
            <HeaderCell>Approval count</HeaderCell>
            <HeaderCell>Approve</HeaderCell>
            <HeaderCell>Finalize</HeaderCell>
          </Row>
        </Header>
        <Body>
          {renderRows()}
        </Body>
      </Table>
      <div>
        found {props.requestCount} requests.
      </div>
    </Layout>
  );
}

RequestIndexPage.getInitialProps = async (props) => {
  const { address } = props.query;
  const campaign = Campaign(address);
  const requestCount = await campaign.methods.getRequestsCount().call();
  const approversCount = await campaign.methods.approversCount().call();


  console.log('requestCount', requestCount);

  const requests = Array(parseInt(requestCount)).fill().map(async (element, index) => {
    return campaign.methods.requests(index).call();
  })
  const allRequests = await Promise.all(requests);

  return { address, allRequests, requestCount, approversCount };

}

export default RequestIndexPage;