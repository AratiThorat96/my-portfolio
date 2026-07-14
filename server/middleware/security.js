const WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS = 300;
const buckets = new Map();

const sanitizeValue = (value) => {
  if (Array.isArray(value)) {
    return value.map(sanitizeValue);
  }

  if (value && typeof value === 'object') {
    return Object.entries(value).reduce((acc, [key, nestedValue]) => {
      if (!key.startsWith('$') && !key.includes('.')) {
        acc[key] = sanitizeValue(nestedValue);
      }
      return acc;
    }, {});
  }

  if (typeof value === 'string') {
    return value.replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '').replace(/javascript:/gi, '');
  }

  return value;
};

export const sanitizeRequest = (req, _res, next) => {
  req.body = sanitizeValue(req.body);
  req.query = sanitizeValue(req.query);
  req.params = sanitizeValue(req.params);
  next();
};

export const rateLimiter = (req, res, next) => {
  const now = Date.now();
  const ip = req.ip || req.connection.remoteAddress || 'unknown';
  const bucket = buckets.get(ip) || { count: 0, resetAt: now + WINDOW_MS };

  if (now > bucket.resetAt) {
    bucket.count = 0;
    bucket.resetAt = now + WINDOW_MS;
  }

  bucket.count += 1;
  buckets.set(ip, bucket);

  if (bucket.count > MAX_REQUESTS) {
    return res.status(429).json({
      success: false,
      message: 'Too many requests. Please try again later.',
    });
  }

  next();
};
