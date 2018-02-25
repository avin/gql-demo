import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import Loading from '../Loading/Loading';

export class Home extends React.Component {
    handleRefetch = () => {
        const { data: { refetch } } = this.props;
        refetch();
    };

    render() {
        const { data: { loading, hello, error } } = this.props;
        return (
            <div>
                {error}
                {loading ? <Loading /> : <div>{hello}</div>}
                <button onClick={this.handleRefetch}>refetch</button>
            </div>
        );
    }
}

const QUERY = gql`
    {
        hello
    }
`;

export default graphql(QUERY, {
    options: { pollInterval: 5000 },
})(Home);
