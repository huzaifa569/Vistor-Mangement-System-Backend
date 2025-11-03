// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import formRoutes from './routes/formRoutes.js';
// import adminRoutes from './routes/adminRoutes.js';
// import authRoutes from './routes/authRoutes.js';
// import connectDB from './config/db.js';
// import deviceRoutes from './routes/deviceRoutes.js';
// import trainingRoutes from "./routes/trainingRoutes.js";
// import analyticsRoutes from "./routes/analyticsRoutes.js";
// import notificationRoutes from "./routes/notificationRoutes.js";
// import groupRoutes from "./routes/groupRoutes.js";
// import checkGroupAccess from "./middleware/checkAccessGroup.js"
// import { protect } from "./middleware/authMiddleware.js";



// dotenv.config();
// const PORT = process.env.PORT || 5000;

// const app = express();
// connectDB();

// // ✅ Correct middleware order
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// const allowedOrigins = [
//   'http://localhost:3000',
//   'https://vms-weld.vercel.app'
// ];

// app.use(cors({
//   origin: (origin, callback) => {
//     if (!origin || allowedOrigins.includes(origin)) {
//       return callback(null, true);
//     }
//     return callback(new Error('Not allowed by CORS'));
//   },
//   credentials: true
// }));


// // ✅ Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/forms', formRoutes);
// app.use('/api/admin', adminRoutes); 
// app.use('/api/devices', deviceRoutes);
// app.use('/api/training', trainingRoutes);
// app.use('/api/analytics', analyticsRoutes);
// app.use('/api/notifications', notificationRoutes);
// app.use('/api/groups', groupRoutes);


// app.get('/api/group/secure-data', protect, checkGroupAccess(['Group A']), (req, res) => {
//   res.json({ message: 'You have access' });
// });


// // ✅ Server
// app.listen(PORT, () => console.log(`Server running at port ${PORT}`));


import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import formRoutes from './routes/formRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import authRoutes from './routes/authRoutes.js';
import connectDB from './config/db.js';
import deviceRoutes from './routes/deviceRoutes.js';
import trainingRoutes from "./routes/trainingRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import groupRoutes from "./routes/groupRoutes.js";
import checkGroupAccess from "./middleware/checkAccessGroup.js"
import { protect } from "./middleware/authMiddleware.js";

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();
connectDB();

// ✅ Middleware order
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const allowedOrigins = [
  'http://localhost:3000',
  'https://vms-weld.vercel.app'
];

// ✅ CORS configuration with better error handling
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, Postman, curl)
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    console.log('❌ CORS blocked origin:', origin); // Debug ke liye
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'], // ✅ Explicitly allow methods
  allowedHeaders: ['Content-Type', 'Authorization'], // ✅ Explicitly allow headers
  optionsSuccessStatus: 200 // ✅ For legacy browsers
}));

// ✅ Handle preflight requests
app.options('*', cors());

// ✅ Routes
app.use('/api/auth', authRoutes);
app.use('/api/forms', formRoutes);
app.use('/api/admin', adminRoutes); 
app.use('/api/devices', deviceRoutes);
app.use('/api/training', trainingRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/groups', groupRoutes);

app.get('/api/group/secure-data', protect, checkGroupAccess(['Group A']), (req, res) => {
  res.json({ message: 'You have access' });
});

// ✅ Error handling middleware
app.use((err, req, res, next) => {
  if (err.message === 'Not allowed by CORS') {
    return res.status(403).json({ 
      success: false, 
      message: 'CORS policy: Origin not allowed' 
    });
  }
  res.status(500).json({ 
    success: false, 
    message: err.message || 'Server error' 
  });
});

// ✅ Server
app.listen(PORT, () => console.log(`✅ Server running at port ${PORT}`));
