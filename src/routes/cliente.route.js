const express = require('express')
const clienteController = require('../controllers/cliente.controller')

const router = express.Router()
router.get('/', clienteController.clientectr.getClientes)
router.get('/:id', clienteController.clientectr.getClientebyId)
router.post('/', clienteController.clientectr.CreateClientes)
router.put('/:id', clienteController.clientectr.updateClientes)
router.delete('/:id', clienteController.clientectr.deleteClientes)

module.exports = router
