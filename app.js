const express = require('express');

const app = express();

app.use('/comparison', require('./routes/api/comparison'));

app.use('/recommendation', require('./routes/api/recommendation'));

app.use('/ubrecommendation', require('./routes/api/ubrecommendation'));

app.use('/ubrecommendation2', require('./routes/api/ubrecommendation2'));

app.listen('3000', () => {
    console.log('Server started on port 3000');
});
