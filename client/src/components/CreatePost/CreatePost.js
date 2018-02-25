import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { push } from 'react-router-redux';
import { graphql } from 'react-apollo';
import { postsQuery, submitPostMutation } from '../../gql-operations';

export class CreatePost extends React.Component {
    onSubmit = async params => {
        const { mutate, push } = this.props;
        const { title, content } = params;

        await mutate({
            variables: { title, content },
            update: (proxy, { data: { createPost } }) => {
                const data = proxy.readQuery({ query: postsQuery });
                data.posts.push(createPost);
                proxy.writeQuery({ query: postsQuery, data });
            },
        });

        push(`/posts`);
    };

    render() {
        const { handleSubmit, pristine, reset, submitting } = this.props;

        return (
            <div>
                <h1>Create Post</h1>
                <form onSubmit={handleSubmit(this.onSubmit)}>
                    <div>
                        <label>Title</label>
                        <div>
                            <Field name="title" component="input" type="text" placeholder="..." />
                        </div>
                    </div>
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
                        <button type="button" disabled={pristine || submitting} onClick={reset}>
                            Clear Values
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

export default graphql(submitPostMutation)(
    connect(mapStateToProps, { push })(
        reduxForm({
            form: 'CreatePost',
        })(CreatePost),
    ),
);
