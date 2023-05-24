import { Op } from 'sequelize';
import {
  ADMIN, DEV, HR, PM,
} from '../constants';

module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define(
    'Employee',
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      middleName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      gender: {
        type: DataTypes.ENUM('male', 'female'),
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM(ADMIN, PM, HR, DEV),
        allowNull: false,
      },
      DOB: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      avatar: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      verifyToken: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      isArchived: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      idDefaultPassword: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
      joiningDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      knownTech: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
      },
      careerStartDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      defaultScope: {
        where: { isArchived: false },
        attributes: { exclude: ['password', 'verifyToken', 'role'] },
      },
      scopes: {
        admin: {
          where: { isArchived: false },
          attributes: { exclude: ['password', 'verifyToken'] },
        },
        pm: {
          where: {
            [Op.and]: [
              { isArchived: false },
              {
                role: {
                  [Op.or]: ['PM', 'DEV'],
                },
              },
            ],
          },
          attributes: { exclude: ['password', 'verifyToken'] },
        },
        login: {
          attributes: { include: ['password', 'verifyToken'] },
        },
      },
    },
  );
  Employee.associate = (models) => {
    Employee.hasOne(models.EmployeeContact, {
      foreignKey: 'employeeId',
      onDelete: 'CASCADE',
      hooks: true,
    });
    Employee.hasOne(models.EmployeeAcademic, {
      foreignKey: 'employeeId',
      onDelete: 'CASCADE',
      hooks: true,
    });
    Employee.hasOne(models.EmployeePreWork, {
      foreignKey: 'employeeId',
      onDelete: 'CASCADE',
      hooks: true,
    });
    Employee.hasMany(models.ProjectEmployee, {
      foreignKey: 'employeeId',
      onDelete: 'CASCADE',
      hooks: true,
    });
    Employee.hasMany(models.Poc, {
      foreignKey: 'employeeId',
      onDelete: 'CASCADE',
      hooks: true,
    });
    Employee.belongsToMany(models.Technology, {
      through: 'EmployeeTech',
      foreignKey: 'employeeId',
      uniqueKey: 'empTech',
    });
    Employee.hasMany(models.Leave, {
      foreignKey: 'employeeId',
      onDelete: 'CASCADE',
      hooks: true,
    });
  };
  return Employee;
};
