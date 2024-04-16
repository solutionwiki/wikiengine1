const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// 가상의 데이터베이스
let wikiPages = {};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// 문서 조회
app.get('/wiki/:title', (req, res) => {
  const title = req.params.title;
  const page = wikiPages[title];
  if (page) {
    res.send(page);
  } else {
    res.status(404).send('Page not found');
  }
});

// 문서 편집
app.post('/wiki/:title/edit', (req, res) => {
  const title = req.params.title;
  const content = req.body.content;
  wikiPages[title] = content;
  res.send('Page edited successfully');
});

// 문서 역사
app.get('/wiki/:title/history', (req, res) => {
  const title = req.params.title;
  // TODO: Implement history tracking
  res.send('History for ' + title);
});

// 문서 삭제
app.delete('/wiki/:title', (req, res) => {
  const title = req.params.title;
  delete wikiPages[title];
  res.send('Page deleted successfully');
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`Wiki engine is running on http://localhost:${PORT}`);
});
