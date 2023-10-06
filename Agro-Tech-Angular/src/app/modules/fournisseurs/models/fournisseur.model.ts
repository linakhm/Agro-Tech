//import { VendorSKU } from "./vendorsku.model"

export class Fournisseur  {
  id?: string
  name?: string
  type?: string
  currencyCode?: string // currency code not exit in BE
  paymentTerm?: string
  address?: string
  codeCity?: string
  nameCity?: string
  wilayaName?: string // willaya code missing in FE
  phone?: string
  email?: string
  code?: string
  //vendorSKU?: any
  //vendorSKU?: VendorSKU;
  shippingAddress?: string
    shippingCity?: string
   static readonly BAD_WORDS = ['badword', 'sobadword', 'verybadword'];
    isDeleted: Boolean ;
}
