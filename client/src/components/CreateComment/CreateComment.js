import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { push } from 'react-router-redux';
import { graphql } from 'react-apollo';
import { postQuery, submitCommentMutation } from '../../gql-operations';

export class CreateComment extends React.Component {
    onSubmit = async params => {
        const { mutate, postId } = this.props;
        const { content } = params;

        await mutate({
            variables: { content, postId },
            update: (proxy, { data: { createComment } }) => {
                const data = proxy.readQuery({
                    query: postQuery,
                    variables: {
                        id: postId,
                    },
                });
                data.post.comments.push(createComment);
                proxy.writeQuery({
                    query: postQuery,
                    variables: {
                        id: postId,
                    },
                    data,
                });
            },
            optimisticResponse: {
                __typename: 'Mutation',
                createComment: {
                    __typename: 'Comment',
                    _id: null,
                    content: content,
                },
            },
        });
    };

    render() {
        const { handleSubmit, pristine, submitting } = this.props;

        return (
            <div>
                <h1>Create comment</h1>
                <form onSubmit={handleSubmit(this.onSubmit)}>
                    <div>
                        <label>Content</label>
                        <div>
                            <Field name="content" component="textarea" placeholder="..." />
                        </div>
                    </div>

                    <hr />

                    <div>
                        <button type="submit" disabled={pristine || submitting}>
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {};
}

export default graphql(submitCommentMutation)(
    connect(mapStateToProps, { push })(
        reduxForm({
            form: 'CreatePost',
        })(CreateComment),
    ),
);
