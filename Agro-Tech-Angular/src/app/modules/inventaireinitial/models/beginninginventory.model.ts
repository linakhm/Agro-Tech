import { Time } from "@angular/common";

export class BeginningInventory 
    {
        id?: string;
        codeDeTransaction?: string;
        typeDeProduit?: string;
        codeProduit?: string;
        nomDuProduit?: string;
        uniteDinventaire?: string;
        prixUnitaire?: Number;
        codeDeLot?: Number;
        codeDeLocalisation?: Number;
        codeDeReference?: Number;

    dateDeEvenement?: string; // Change type to string
    dateExpiration?: string;   // Change type to string
    temps?: string;            // Change type to string
    commentaire?: string;
    Vide?: boolean;           // Use lowercase 'boolean'
    isDeleted: boolean;      // Use lowercase 'boolean'

     /*   dateDeEvenement?: Date;
        dateExpiration?:Date;
        temps?:Time;
        commentaire?:string;
        Vide?: Boolean;
        isDeleted: Boolean;
        */
  
    }