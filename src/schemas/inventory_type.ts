import { dateString } from '../reg_exp'
import joi from 'joi'

const ArticleInfoType = joi.object( {
  amount: joi.number().strict(),
  input: joi.number().strict(),
  output: joi.number().strict(),
} )

const HistoryIndexType = joi.object().pattern( dateString, ArticleInfoType ).required()

const ArticleType = joi.object( {
  id: joi.string().required(),
  name: joi.string().required(),
  weight: joi.number().required().strict(),
  price: joi.number().required().strict(),
  amount: joi.number().required().strict(),
  history: HistoryIndexType,
} )

const InventoryType = joi.object().pattern( /./, ArticleType ).required()

export default InventoryType