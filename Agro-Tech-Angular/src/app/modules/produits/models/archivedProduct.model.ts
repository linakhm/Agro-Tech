import { ProductUsage } from "./produit-usage.model"
import { VendorSKU } from "../../produits/models/vendorsku.model"
import { SalesSKU } from "./salessku.model"
export type ArchivedProduct = {
    id?: string
    code?: string
    name?: string
    type?: string
    status?: boolean
    currency?: string
    inventory?: string
    //Medicamenteux?: string
    medicated?: boolean
    manufacturer?: string

    color?: string
    productusage?: ProductUsage
    maxOver?: string
    prixUnitaireHt?: number
    prixUnitaireTtc?: number
    taxRate?: number
    category?: any
    //vendorSKU?: any
    vendorSKU?: VendorSKU
    salesSKU?: SalesSKU
    //fournisseur?: Fournisseur
}
