require('dotenv').load();
const BlockIo = require('block_io');
const version = process.env.BLOCK_IO_VERSION; // API version
const block_io = new BlockIo(process.env.BLOCK_IO_KEY, process.env.BLOCK_IO_SECRET, version);

const getAddress = (req, res) => {
    block_io.get_new_address({}, (error, response) => {
        if(error) res.sendError({error}, 'Failed to create address');
        else res.sendResponse({response}, 'Create address - success')
    });
}

const getBalance = (req, res) => {
    block_io.get_address_balance({'address': req.body.address}, (error, response) => {
        if(error) res.sendError({error}, 'Failed to get balance');
        else res.sendResponse({response}, 'Get Balance - success')
    });
}

const payment = (req, res) => {
    block_io.withdraw_from_addresses({'amounts': req.body.amount, 'from_addresses': req.body.fromAddress, 'to_addresses': req.body.toAddress}, (error, response) => {
        if(error) res.sendError({error}, 'Failed to do payment');
        else res.sendResponse({response}, 'Payment - success');
    });
}

const sentTransaction = (req, res) => {
    block_io.get_transactions({'type': 'sent'}, (error, response) => {
        if(error) res.sendError({error}, 'Failed to get sent transactions');
        else res.sendResponse({response}, 'Sent transaction - success');
    });
}

const receiveTransaction = (req, res) => {
    block_io.get_transactions({'type': 'received'}, (error, response) => {
        if(error) res.sendError({error}, 'Failed to get received transactions');
        else res.sendResponse({response}, 'Received transaction - success');
    });
}

module.exports = { getAddress, getBalance, payment, sentTransaction, receiveTransaction }