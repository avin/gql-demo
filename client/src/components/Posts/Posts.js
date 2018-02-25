import React from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';
import Loading from '../Loading/Loading';
import { postsQuery } from '../../gql-operations';

export class Posts extends React.Component {
    render() {
        const { data: { posts, loading } } = this.props;
        if (loading) {
            return <Loading />;
        }
        return (
            <div className="Posts">
                <div>
                    <Link to="/create_post">Create Post</Link>
                </div>
                {posts.map(({ _id, content, title }) => (
                    <div key={_id}>
                        <h2>{title}</h2>
                        <p>{content}</p>
                        <Link to={`/post/${_id}`}>Read more</Link>
                    </div>
                ))}
            </div>
        );
    }
}



export default graphql(postsQuery, {})(Posts);
