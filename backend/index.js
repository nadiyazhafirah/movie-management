const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const db = require('./config/database.js');
const User = require('./models/User.js');
const Genre = require('./models/Genre.js');
const Film = require('./models/Film.js');

const authRoute = require('./routes/authRoute.js');
const genreRoute = require('./routes/genreRoute.js');
const filmRoute = require('./routes/FilmRoute.js');

const app = express();
app.use(cors());
app.use(express.json());

app.use(authRoute);
app.use(genreRoute);
app.use(filmRoute);

const PORT = 3000;

// Sinkronisasi Database dan pembuatan akun Seeder otomatis
db.sync({ alter: true })
    .then(async () => {
        console.log('Database synchronized.');

        // Memastikan ada minimal 1 user admin di database
        const adminExist = await User.findOne({ where: { email: 'admin@gmail.com' } });
        if (!adminExist) {
            const hashedPassword = await bcrypt.hash('adminpassword', 10);
            await User.create({
                email: 'admin@gmail.com',
                password: hashedPassword,
                role: 'admin'
            });
            console.log('Default Admin Account Created: admin@gmail.com / adminpassword');
        }

        app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
    })
    .catch(err => console.error('Database connection failed:', err));