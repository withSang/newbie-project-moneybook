const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRouter = require('./routes/user');
const expenseRouter = require('./routes/expense');
const presetRouter = require('./routes/preset');

const app = express();
const port = 8000;

mongoose.set('useCreateIndex', true); //fixes "DeprecationWarning: collection.ensureIndex is deprecated."

//DB에 연결. 기존에 데이터베이스가 없다면 새로 만든다.
mongoose.connect("mongodb://localhost:27017/moneybook", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.once("open", () => {
    console.log("Successfully connected to DB.");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

//테스트용 코드
app.get('/', (req, res) => {
    res.status(200).send("backend test frontpage");
});

//엑셀 파일 호스팅을 위해 개방
app.use('/static', express.static('static'));

app.use('/user', userRouter);
app.use('/expense', expenseRouter);
app.use('/preset', presetRouter)

app.listen(port, "0.0.0.0", () => {
    console.log(`Backend is running on port ${port}.`);
})
