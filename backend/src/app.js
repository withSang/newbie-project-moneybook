const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 8000;

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

app.use('/user', )

app.listen(port, "0.0.0.0", () => {
    console.log(`Backend is running on port ${port}.`);
})
