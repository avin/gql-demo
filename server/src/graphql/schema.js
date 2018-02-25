import faker from 'faker';
import { ObjectId } from 'mongodb';
import { makeExecutableSchema } from 'graphql-tools/dist/index';
import Promise from 'bluebird';

const prepare = o => {
    o._id = o._id.toString();
    return o;
};

const sleep = time =>
    new Promise(resolve => {
        setTimeout(resolve, time);
    });

export default function getSchema(db) {
    const Posts = db.collection('posts');
    const Comments = db.collection('comments');

    const typeDefs = [
        `
        type Query {
            post(_id: String): Post
            posts: [Post]
            comment(_id: String): Comment
            hello(name: String): String
        }
        
        type Post {
            _id: String
            title: String
            content: String
            comments: [Comment]
        }
        
        type Comment {
            _id: String
            postId: String
            content: String
            post: Post
        }
        
        type Mutation {
            createPost(title: String, content: String): Post
            createComment(postId: String, content: String): Comment
        }
        
        schema {
            query: Query
            mutation: Mutation
        }
        `,
    ];

    const resolvers = {
        Query: {
            post: async (root, { _id }) => {
                return prepare(await Posts.findOne(ObjectId(_id)));
            },
            posts: async () => {
                return (await Posts.find({}).toArray()).map(prepare);
            },
            comment: async (root, { _id }) => {
                return prepare(await Comments.findOne(ObjectId(_id)));
            },
            hello: async (root, { name }) => {
                await sleep(500);
                return `Hello ${name || faker.name.findName()}!`;
            },
        },
        Post: {
            comments: async ({ _id }) => {
                return (await Comments.find({ postId: _id }).toArray()).map(prepare);
            },
        },
        Comment: {
            post: async ({ postId }) => {
                return prepare(await Posts.findOne(ObjectId(postId)));
            },
        },
        Mutation: {
            createPost: async (root, args, context, info) => {
                await sleep(500);
                const res = await Posts.insertOne(args);
                return prepare(await Posts.findOne({ _id: res.insertedId }));
            },
            createComment: async (root, args) => {
                await sleep(500);
                const res = await Comments.insertOne(args);
                return prepare(await Comments.findOne({ _id: res.insertedId }));
            },
        },
    };

    return makeExecutableSchema({
        typeDefs,
        resolvers,
    });
}
