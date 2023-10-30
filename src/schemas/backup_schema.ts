import HistoryType from './history_type'
import joi from 'joi'
import InventoryType from './inventory_type'
import UnitsType from './units_type'

const backupSchema = joi.object( {
  inventory: InventoryType,
  history: HistoryType,
  units: UnitsType,
  date: joi.number().strict(),
} )

export default backupSchema