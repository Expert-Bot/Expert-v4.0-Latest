const Sequelize = require('sequelize');
const database = new Sequelize('database', 'username', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
});

module.exports.User = database.define('user', {
    id: {
        type: Sequelize.STRING,
        primaryKey: true,
        unique: true,
    },
    balance: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
    },
    }, { 
		timestamps: false,
	}
);

module.exports.UserItems = database.define('user_items', {
    user_id: Sequelize.STRING,
    item: Sequelize.INTEGER,
    amount: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    }, {
        timestamps: false,
    }
);

module.exports.CurrencyShop = database.define('currency_shop', {
    name: {
        type: Sequelize.STRING,
        unique: true,
    },
    cost: {
        type: Sequelize.INTEGER,
        allowNull: false,
    }
    }, {
        timestamps: false,
    }
);

module.exports.petCooldown = database.define('pet_cooldown', {
    user_id: {
        primaryKey: true,
        type: Sequelize.STRING,
        unique: true,
    },
    expiry: Sequelize.BIGINT,
}
);

module.exports.adventureUser = database.define('adventure_user', {
    id: {
        primaryKey: true,
        type: Sequelize.STRING,
        unique: true,
    }
}
);