// backend/src/models/User.js
const mongoose = require('mongoose');
const bcrypt   = require('bcryptjs');

/**
 * ── USER SCHEMA ───────────────────────────────────────────────────────
 *  username   : required, unique, 3‑30 chars, trimmed
 *  email      : required, unique, must be a valid email address
 *  password   : required, stores bcrypt hash
 *  profilePic : optional URL (string); defaults to empty string
 *  status     : "online" | "offline" | "away" … you can extend later
 *  timestamps : createdAt / updatedAt automatically added by Mongoose
 * ───────────────────────────────────────────────────────────────────────
 */
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
      trim: true,
      minlength: [3, 'Username must be at least 3 characters'],
      maxlength: [30, 'Username cannot exceed 30 characters'],
    },

    email: {
      type: String,
      required: [true, 'Email address is required'],
      unique: true,
      trim: true,
      lowercase: true,
      // simple email regex – adjust if you need stricter validation
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please enter a valid email address',
      ],
    },

    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
    },

    profilePic: {
      type: String,
      default: '',
      // you could add a URL validator here if you want
    },

    status: {
      type: String,
      enum: ['online', 'offline', 'away', 'busy'],
      default: 'offline',
    },
  },
  { timestamps: true }
);

/* -----------------------------------------------------------------
 *  PRE‑SAVE HOOK – hash the password **only when it has changed**
 * ----------------------------------------------------------------- */
userSchema.pre('save', async function (next) {
  // `this` is the document being saved
  if (!this.isModified('password')) return next(); // password unchanged → skip

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

/* -----------------------------------------------------------------
 *  INSTANCE METHOD – compare a plain‑text password with the stored hash
 * ----------------------------------------------------------------- */
userSchema.methods.matchPassword = async function (plainPassword) {
  return bcrypt.compare(plainPassword, this.password);
};

/* -----------------------------------------------------------------
 *  VIRTUAL (optional) – expose a safe version of the user object
 *  (e.g., for returning to the client without the password hash)
 * ----------------------------------------------------------------- */
userSchema.virtual('safeUser').get(function () {
  return {
    id: this._id,
    username: this.username,
    email: this.email,
    profilePic: this.profilePic,
    status: this.status,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
});

/* -----------------------------------------------------------------
 *  MAKE SURE VIRTUALS ARE INCLUDED WHEN CALLING .toObject() / .toJSON()
 * ----------------------------------------------------------------- */
userSchema.set('toObject', { virtuals: true });
userSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', userSchema);