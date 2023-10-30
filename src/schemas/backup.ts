import HistoryType from './history_type'
import joi from 'joi'
import InventoryType from './inventory_type'
import UnitsType from './units_type'

export const indexSchema = joi.object( {
  inventory: InventoryType,
  history: HistoryType,
  units: UnitsType,
} )