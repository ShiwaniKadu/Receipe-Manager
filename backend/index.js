import express, { response } from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import receipeRoute from './routes/ReceipeRoute.js';
const app = express();
app.use(express.json());

// Middleware for handling CORS POLICY
// Option 1: Allow All Origin with Default of Cors(*)

// app.use(cors());
//Option 2: Allow custom origin
// app.use(
//     cors({
//         origin: 'http://localhost:3000',
//         methods: ['GET', 'POST','PUT','DELETE'],
//         allowedHeaders : ['Content-Type'],
//     })
// )

app.get('/', (req, res) => {
    return res.status(200).send('Hello World');
});

app.use('/receipe', receipeRoute);

mongoose
    .connect(mongoDBURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('App connected to database');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Error connecting to database:', error);
    });
