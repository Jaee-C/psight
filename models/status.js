const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('status', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    category: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'status_group',
        key: 'id'
      }
    },
    description: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    project_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'project',
        key: 'id'
      }
    },
    project_lead: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'project',
        key: 'lead'
      }
    }
  }, {
    sequelize,
    tableName: 'status',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "fk_status_project1_idx",
        using: "BTREE",
        fields: [
          { name: "project_id" },
          { name: "project_lead" },
        ]
      },
      {
        name: "fk_status_status_group1_idx",
        using: "BTREE",
        fields: [
          { name: "category" },
        ]
      },
    ]
  });
};
