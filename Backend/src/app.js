const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const authRoutes = require('./routes/auth.routes');
const planRoutes = require('./routes/plan.routes');
const projectRoutes = require('./routes/project.routes');
const reviewRoutes = require('./routes/review.routes');
const contactRoutes = require('./routes/contact.routes');

const { errorHandler } = require('./middlewares/error.middleware');

const app = express();


app.use(helmet());

app.use(
  cors({
     origin: ["http://localhost:5173", "http://localhost:5174"],


    
    credentials: true
  })
);

app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/plans', planRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/contact', contactRoutes);

app.get('/', (req, res) => {
  res.json({
    message: 'Portfolio API is running 🚀'
  });
});

app.use(errorHandler);

module.exports = app;