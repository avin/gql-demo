import React from 'react';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import Loading from '../Loading/Loading';
import { postQuery } from '../../gql-operations';
import CreateComment from '../CreateComment/CreateComment';

export class Post extends React.Component {
    render() {
        const { data: { loading, post } } = this.props;
        if (loading) {
            return <Loading />;
        }
        if (!post) {
            return <div>post not found! :(</div>;
        }

        return (
            <div>
                <h1>{post.title}</h1>
                <p>{post.content}</p>
                <h2>COMMENTS:</h2>
                <ul>
                    {post.comments.map(({ content, _id }) => (
                        <li key={_id}>
                            {content} {_id}
                        </li>
                    ))}
                </ul>
                <CreateComment postId={post._id} />
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {};
}

export default graphql(postQuery, {
    options: ({ match: { params: { id } } }) => {
        return {
            variables: { id },
        };
    },
})(connect(mapStateToProps, {})(Post));
