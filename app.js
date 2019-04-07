const express = require('express');

const app = express();

app.use('/comparison', require('./routes/api/comparison'));

app.use('/recommendation', require('./routes/api/recommendation'));

app.use('/ubrecommendation', require('./routes/api/ubrecommendation'));

app.listen('3000', () => {
    console.log('Server started on port 3000');
});
