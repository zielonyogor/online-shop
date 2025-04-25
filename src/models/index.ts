import { Optional, Sequelize, Model, DataTypes } from 'sequelize';

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './shop.sqlite'
});

interface ItemAttributes {
  id: number;
  name: string;
  description: string | null;
  image: string | null;
  category: string;
  price: number;
  quantity: number;
}

interface ItemCreationAttributes extends Optional<ItemAttributes, 'id'> {}

class Item extends Model<ItemAttributes, ItemCreationAttributes> implements ItemAttributes {
  public id!: number;
  public name!: string;
  public description!: string | null;
  public image!: string | null;
  public category!: string;
  public price!: number;
  public quantity!: number;
}

Item.init({
  id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
  },
  name: DataTypes.STRING,
  description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  category: DataTypes.STRING,
  price: DataTypes.DECIMAL,
  quantity: DataTypes.INTEGER,
}, {sequelize, modelName: 'Item'});


export { sequelize, Item };
