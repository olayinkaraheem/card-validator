import express from 'express';
import bodyParser from 'body-parser';
import PaymentRoutes from './routes/payment.route';

require('body-parser-xml')(bodyParser);

export const app = express();

app.use(bodyParser.json());
app.use(bodyParser.xml({
    xmlParseOptions: {
        normalize: true,
        explicitArray: false
    }
}));

app.use('/api/v1/payment', PaymentRoutes)

const PORT = 8800


app.get('/', (req, res)=> {
    res.send('Welcome')
})

const server = app.listen(process.env.PORT || PORT, () => {
    console.log(`App running on port: ${PORT}`)
})