import { Time } from "@angular/common";
import { Costcenter } from "../../externaltransfers/models/costcenter.model";
import { Produit } from "../../produits/models/produit.model";

export type Externaltransfer =
    {
 
        refNumber?: string;
        transactionCode?: string ;
        transactionDate?: Date;
        warehouseCode?: string;
        externalSourceCostCenter?: Costcenter;
        inventoryUnits?: number;
        price?: number;
        unitPrice?: number;
        lotCode?: boolean;
        locationCode?: string;
        eventDate?: Date;
        expirationDate?: Date;
        time?: Time;
        comment?: string;
        isVoid?: boolean;
        product?: Produit;
        }
