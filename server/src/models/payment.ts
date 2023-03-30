import { type Model, Schema, SchemaTypes, model } from 'mongoose'
import { type ShipmentAddress, type PaymentDocumentTypeOverride } from './interfaces/payment'
import type Payment from './interfaces/payment'

const shipmentAddressSchema = new Schema<ShipmentAddress>({
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  postalCode: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  }
})

const paymentSchema = new Schema<Payment, Model<Payment, unknown, PaymentDocumentTypeOverride>>({
  order: {
    type: SchemaTypes.ObjectId,
    ref: 'Order',
    required: true
  },
  shipmentAddress: {
    type: shipmentAddressSchema,
    required: true
  }
}, {
  timestamps: true
})

const paymentModel = model<Payment, Model<Payment, unknown, PaymentDocumentTypeOverride>>('payment', paymentSchema)

export default paymentModel
