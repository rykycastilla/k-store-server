import { dateString } from '../reg_exp'
import joi from 'joi'

const HistoryType = joi.array().items( joi.string().pattern( dateString ) ).required()

export default HistoryType