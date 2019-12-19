const express = require('express');
const connectDB = require('./config/db')

const app = express();

connectDB();

app.use(express.json({extended: false}));

app.get('/', (req, res) => res.send('App Running'));

app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/furniture', require('./routes/api/furniture'));
app.use('/api/furnitures', require('./routes/api/furnitures'));
app.use('/api/userfurniture', require('./routes/api/user_furniture'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

