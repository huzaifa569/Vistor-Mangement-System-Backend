import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET || 'L3gZs1NJI_etZXqb8S5FV5Y_Jyn7Rl6xOND26mw0Yz_N35_AXM0WS39750AOQKUE';

export const protect = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
};


export const newprotect = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (token) {
      // Original code
      const decoded = jwt.verify(token, JWT_SECRET);
      const user = await User.findById(decoded.id).select('role');
      req.user = {
        _id: user._id,
        role: user.role
      };
    } else {
      // Testing ke liye hardcoded user
      console.log('🟡 TEMPORARY: Using test user');
      req.user = {
        _id: '65d8f5a8e4b8d6a9c8f7e5a2',
        role: 'admin'
      };
    }
    
    console.log('✅ User:', req.user);
    next();
  } catch (error) {
    console.error('❌ Auth error:', error);
    res.status(401).json({ error: 'Authentication failed' });
  }
};


export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer '))
    return res.status(401).json({ error: 'Unauthorized' });

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
};

