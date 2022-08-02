const { getConnection } = require('../database/database')

const clientectr = {}

clientectr.getClientes = async (req, res) => {
  try {
    const connection = await getConnection()
    const result = await connection.query('Select * from cliente')
    res.json(result)
  } catch (e) {
    console.log(e)
    return res.status(500).send(e.message)
  }
}
clientectr.getClientebyId = async (req, res) => {
  try {
    const { id } = req.params
    const connection = await getConnection()
    const result = await connection.query(
      'Select * from cliente where idcliente = ?',
      id,
    )
    if (result.length == 0) {
      res.status(404).json({
        mensaje: `El cliente con el ID: ${id} no existe en la base de datos!`,
      })
    }

    result.forEach(async (datos) => {
      datos
      res.status(200).json(datos)
    })
    return result
  } catch (e) {
    return res.status(500).send({ mensaje: 'Bad Request' })
  }
}

clientectr.CreateClientes = async (req, res) => {
  try {
    const { nombre, apellido, edad } = req.body
    if (nombre === '' || apellido === '' || edad === '') {
      res
        .status(400)
        .json({ mensaje: 'Las propiedades no puede contener valores vacios' })
    } else {
      const cliente = { nombre, apellido, edad }
      const connection = await getConnection()
      await connection.query('Insert into cliente set ?', cliente)
      res.status(201).json({
        mensaje: 'El cliente ha sido creado con exito!',
        cliente: cliente,
      })
    }
  } catch (e) {
    console.log(e)
    return res.status(500).json({
      mensaje: 'Error al crear al crear un nuevo cliente',
      error: e.message,
    })
  }
}
const validarId = async (id) => {
  const connection = await getConnection()
  const result = await connection.query(
    'Select * from cliente where idcliente = ?',
    id,
  )
  return result
}

clientectr.updateClientes = async (req, res) => {
  try {
    const { id } = req.params
    const { nombre, apellido, edad } = req.body
    const cliente = { nombre, apellido, edad }
    const connection = await getConnection()
    await connection.query('Update cliente set ? where idcliente = ?', [
      cliente,
      id,
    ])

    await validarId(id).then((resultado) => {
      console.log('resultado updatecliente:', resultado)
      if (resultado.length == 0) {
        return res.status(404).json({
          message: `Error: no se pudo editar, el cliente con el ID: ${id}, no existe en la base de datos!`,
        })
      } else {
        res.status(201).json({
          mensaje: 'El cliente ha sido actualizado con éxito!',
          cliente: cliente,
        })
      }
    })
  } catch (e) {
    console.log(e)
    res.status(500).json({
      mensaje: 'Error al actualizar el cliente en la base de datos',
      error: e.message,
    })
  }
}
clientectr.deleteClientes = async (req, res) => {
  try {
    const { id } = req.params
    const connection = await getConnection()
    await validarId(id).then((resultado) => {
      console.log('resultado deletecliente: ', resultado)
      if (resultado.length == 0) {
        return res.status(404).json({
          message: `Error: no se pudo eliminar, el cliente con el ID: ${id}, no existe en la base de datos!`,
        })
      } else {
        connection.query('Delete from cliente where idcliente = ?', id)
        res.status(200).json({
          mensaje: 'El cliente ha sido eliminado con éxito!',
        })
      }
    })
  } catch (e) {
    console.log(e)
    return res.status(500).json({
      mensaje: 'Error al eliminar el cliente en la base de datos',
      error: e.message,
    })
  }
}

module.exports = { clientectr }
