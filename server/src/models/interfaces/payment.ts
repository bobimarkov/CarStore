import { type Types, type Document } from 'mongoose'

interface ShipmentAddress {
  _id: Types.ObjectId
  address: string
  city: string
  postalCode: string
  country: string
}

interface PaymentDocumentTypeOverride {
  shipmentAddress: Types.Subdocument<Types.ObjectId> & ShipmentAddress
}

interface Payment extends Document {
  order: Types.ObjectId
  shipmentAddress: ShipmentAddress
  createdAt: number
  updatedAt: number
}

export default Payment
export { type ShipmentAddress, type PaymentDocumentTypeOverride }
