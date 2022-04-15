const express = require('express');
// const { where } = require('sequelize/types');
const { Customers, Order, Item, Sequelize } = require('./models');


const app = express();
const PORT = 4000;


app.use(express.json());


app.get('/customers', async (req, res) => {
    const result = await Customers.findAll().catch((err) => {
        res.status(500).send(`something wnt wrong ${err}`);
    })

    res.status(200).send(result);
})

app.post('/customers', async (req, res) => {
    const { firstName, lastName, email, password, address } = req.body;
    const result = await Customers.create({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        address: address
    }).catch((err) => {
        res.status(400).send(`something went wrong ${err}`)
    })
    res.status(200).send(result);
})


app.delete('/customers/:customer_id', async (req, res) => {
    const removalCustomer = await Customers.findAll({
        where: {
            id: req.params.customer_id
        }
    }).catch((err) => {
        res.status(500).send(`something went wrong ${err}`)
    })

    await Customers.destroy({
        where: {
            id: req.params.customer_id
        }
    }).catch((err) => {
        res.status(500).send(`couldn't delete the customer ${err}`)
    })
    res.status(200).send(removalCustomer);
})

app.put('/customers/:customer_id', async (req, res) => {
    const { firstName, lastName, email, password, address } = req.body;
    await Customers.update({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        address: address
    }, {
        where: { id: req.params.customer_id }
    }).catch((err) => {
        res.status(500).send(`couldn't update the customer ${err}`)
    })

    const updatedCustomer = await Customers.findAll({
        where: {
            id: req.params.customer_id
        }
    }).catch((err) => {
        res.status(500).send(`something went wrong ${err}`)
    })
    res.status(200).send(updatedCustomer)
})


app.post('/orders/:customer_id', async (req, res) => {
    const customer_id = req.params.customer_id
    const { address } = req.body
    const newOrder = await Order.create({
        address: address,
        customerId: customer_id
    }).catch((err) => {
        res.status(500).send(`something went wrong ${err}`)
    })
    res.status(200).send(newOrder);
})

app.get('/orders', async (req, res) => {
    const orders = await Order.findAll().catch((err) => {
        res.status(500).send(`something went wrong ${err}`)
    })
    res.status(200).send(orders);
})

app.delete('/orders/:order_id', async (req, res) => {
    await Order.destroy({
        where: { id: req.params.order_id }
    }).catch((err) => {
        res.status(400).send(`something went wrong ${err}`);
    })
    res.status(200).send('deleted');
})

app.put('/orders/:order_id', async (req, res) => {
    const { address } = req.body;
    const updatedOrder = await Order.update({
        address: address,
        deliveredAt: new Date()
    }, {
        returning: true,
        where: { id: req.params.order_id },
    })
    res.status(200).send(updatedOrder)
})


app.post('/items/:order_id', async (req, res) => {
    const { name, cost, productType } = req.body;
    const newItem = await Item.create({
        name: name,
        cost: cost,
        productType: productType,
        orderId: req.params.order_id
    }, {
        returning: true
    }).catch((err) => {
        res.status(400).send(`unable to add new item ${err}`)
    })
    res.status(200).send(newItem);
})

app.get('/items', async(req, res) => {
    const items = await Item.findAll().catch((err) => {
        res.status(500).send(`something went wrong ${err}`);
    })
    res.status(200).send(items);
})

app.put('/items/:item_id', async(req, res) => {
    const { name, cost, productType } = req.body;
    const updatedItem = await Item.update({
        name: name,
        cost: cost,
        productType: productType
    },{
        where: { id: req.params.item_id },
        returning: true
    }).catch((err) => {
        res.status(400).send(`something went wrong ${err}`);
    })
    res.status(200).send(updatedItem)
})


app.delete('/items/:item_id', async(req, res) => {
    await Item.destroy({
        where: { id: req.params.item_id }
    }).catch((err) => {
        res.status(400).send(`something went wrong ${err}`);
    })
    res.status(200).send('deleted')
})



app.listen(PORT);
