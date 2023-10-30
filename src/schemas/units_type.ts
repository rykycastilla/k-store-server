import { currency, massUnit } from '../reg_exp'
import joi from 'joi'

const MassType = joi.string().pattern( massUnit ).required()

const CurrencyType = joi.string().pattern( currency ).required()

const UnitsType = joi.object( {
  mass: MassType,
  currency: CurrencyType,
} ).required()

export default UnitsType