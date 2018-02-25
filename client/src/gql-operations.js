import gql from 'graphql-tag';

export const submitPostMutation = gql`
    mutation submitPostMutation($title: String!, $content: String!) {
        createPost(title: $title, content: $content) {
            _id
            content
            title
        }
    }
`;

export const submitCommentMutation = gql`
    mutation submitCommentMutation($postId: String!, $content: String!) {
        createComment(postId: $postId, content: $content) {
            _id
            content            
        }
    }
`;

export const postsQuery = gql`
    query postsQuery {
        posts {
            _id
            title
            content
        }
    }
`;

export const postQuery = gql`
    query postQuery($id: String!) {
        post(_id: $id) {
            _id
            title
            content
            comments {
                _id
                content
            }
        }
    }
`;
