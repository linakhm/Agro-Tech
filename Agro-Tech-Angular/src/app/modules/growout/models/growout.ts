import { Division } from "app/modules/division/models/division"

export type Growout = {

      id ?: string
      code  ?: string
	  name  ?: string 
	  address  ?: string
	  codeCity  ?: string
	  nameCity  ?: string
	  wilayaCode  ?: string
	  wilayaName  ?: string
      division ?: Division
	  zipCode  ?: string
	  phoneNumber  ?: string
	  email  ?: string
}