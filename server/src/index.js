import { MongoClient, ObjectId } from 'mongodb';
import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import cors from 'cors';

import getSchema from './graphql/schema.js';

const URL = 'http://localhost';
const PORT = 3001;
const MONGO_URL = 'mongodb://localhost:27017';
const MONGO_DB = 'blog';

(async () => {
    try {
        const client = await MongoClient.connect(MONGO_URL);
        const db = client.db(MONGO_DB);

        const schema = getSchema(db);

        const app = express();

        app.use(cors());

        app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));

        const homePath = '/graphiql';

        app.use(
            homePath,
            graphiqlExpress({
                endpointURL: '/graphql',
            }),
        );

        app.listen(PORT, () => {
            console.log(`Visit ${URL}:${PORT}${homePath}`);
        });
    } catch (e) {
        console.log(e);
    }
})();
