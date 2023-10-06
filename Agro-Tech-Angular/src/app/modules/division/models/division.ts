import { Company } from "../../company/models/comany"

export type Division ={

    id?: string
    code?: string
    name?: string
    speciesType?: string
    measurement?: string
    address?: string
    codeCity?: string
    nameCity?: string
    wilayaName?: string
    wilayaCode?: string
    phone?: string
    zipCode?: string
    campany?: Company
  

}