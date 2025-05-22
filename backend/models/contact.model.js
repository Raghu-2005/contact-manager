module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Contact', {
    firstName: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING(13),
      allowNull: false,
      validate: {
        is: /^\+91\d{10}$/,  // regex for +91 followed by 10 digits
      }
    },
    dob: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    picture: {
      type: DataTypes.STRING,
      allowNull: true
    },
    shape: {
      type: DataTypes.STRING,
      allowNull: true
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });
};
