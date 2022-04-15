# eaapp




Prepare the database
# MIGRATIONS Structure - node with sequelize-cli (to run the migartions)
Commands for sequelize to generate databse structure.
# SEEDERS Data - node with sequelize-cli (to run the seeders)
Commands for sequelize to generate records in the database.



Run the App
# Connection config.json + models/index.js
Create a sequelize instance with the values from the config.
Establish a database connection (create a sequelize db instance)
Associate all models in /models with the db instance
Sequelize DB (
    config
    associates (
        all models -> its own functions because it extends Model sequelize class
    )
)

# Endpoints using express

