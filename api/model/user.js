const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const Token = require('./token');

const UserSchema = mongoose.Schema({
  unit_id: {
    type: String
  },
  title: {
    type: String,
    enum: ['Mr', 'Mrs', 'Dcn']
  },
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  isVerified: { type: Boolean, default: false },
  isAdmin: { type: Boolean, default: false },
  isGroupAdmin: { type: Boolean, default: false },
  passwordResetToken: String,
  passwordResetExpires: Date,
  createdAt: {
    type: Date,
    default: Date.now()
  },
  general: {
    group: {
      type: String
    },
    vocal_part: {
      type: String,
      enum: ['Alto', 'Suprano', 'tenor']
    },
    rehearsal_location: {
      type: String,
      enum: ['Iyana', 'Isashi']
    },
    gender: {
      type: String,
      enum: ['male', 'female']
    }
  },
  personal: {
    phone: {
      type: String
    },
    whatsapp_phone: {
      type: String
    },
    email: {
      type: String
    },
    contact_address: {
      type: String
    },
    pha: {
      type: String
    },
    dob: {
      type: String
    },
    wed_date: {
      type: String
    },
    marital_status: {
      type: String,
      enum: ['single', 'engaged', 'married']
    },
    work_status: {
      type: String,
      enum: ['employed', 'self employed', 'unemployed']
    },
    profession: {
      type: String
    },
    employer_name: {
      type: String
    },
    employer_address: {
      type: String
    },
    state_origin: {
      type: String
    },
    nationality: {
      type: String,
      default: 'Nigeria'
    }
  },
  nok: {
    name: {
      type: String
    },
    address: {
      type: String
    },
    phone: {
      type: String
    },
    occupation: {
      type: String
    },
    relation: {
      type: String
    },
    email: {
      type: String
    }
  },
  choir_roles: {
    membership_status: {
      type: String,
      enum: ['member', 'ordained worker', 'pastorate']
    },
    leadership_status: {
      type: String,
      enum: ['choir master', 'part head']
    },
    sub_group: {
      type: String,
      enum: ['music team', 'praise team', 'legal team']
    }

  },
  church_info: {
    wsf_status: {
      type: String,
      enum: ['home provider', 'member', 'district coordinator']
    },
    new_birth_year: {
      type: String
    },
    holy_spirit_year: {
      type: String
    },
    lfc_joined_year: {
      type: String
    },
    ordination_year: {
      type: String
    },
    province: {
      type: String
    },
    district: {
      type: String
    },
    zone: {
      type: String
    }
  }

},
  { timestamps: true });

UserSchema.pre('save', function (next) {
  const user = this;

  if (!user.isModified('password')) return next();

  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);

      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

UserSchema.methods.generateJWT = function () {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);

  let payload = {
    id: this._id,
    email: this.email,
    firstName: this.firstName,
    lastName: this.lastName,
  };

  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: parseInt(expirationDate.getTime() / 1000, 10)
  });
};

UserSchema.methods.generatePasswordReset = function () {
  this.resetPasswordToken = crypto.randomBytes(20).toString('hex');
  this.resetPasswordExpires = Date.now() + 3600000; //expires in an hour
};

UserSchema.methods.generateVerificationToken = function () {
  let payload = {
    userId: this._id,
    token: crypto.randomBytes(20).toString('hex')
  };
  console.log('payload', payload)
  return new Token(payload);
};
module.exports = mongoose.model("user", UserSchema);