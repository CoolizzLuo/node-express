import 'dotenv/config';
import express from 'express';
import router from './routes';

const app = express();
const port = process.env.PORT ?? 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', router.authRouter);

app.get('/', (req, res) => {
  res.send('Hello World!!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

export default app;
