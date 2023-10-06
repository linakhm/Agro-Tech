import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BeginningInventory } from '../../../models/beginninginventory.model';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { SharedService } from '../../../../company/services/shared.service';

@Component({
    selector: 'app-beginninginventory-details',
    templateUrl: './beginninginventory-details.component.html',
    styleUrls: ['./beginninginventory-details.component.scss']
})
export class BeginninginventoryDetailsComponent implements OnInit {

    //@Output() dataEmitted: EventEmitter<BeginningInventory> = new EventEmitter<BeginningInventory>();
    @Input() beginninginventory!: BeginningInventory; // If you need to receive data from the parent
  //  @Input() addinventoryform: FormGroup;
    @Input() formGroup: FormGroup;

   // @Output() formValueEmitted: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  //  @Input() beginninginventory: BeginningInventory;
    //addinventoryform: FormGroup;
    constructor(private formBuilder: FormBuilder, private sharedService: SharedService) { }
    addform: FormGroup;

    ngOnInit(): void {
        console.log('ngOnInit  before init form :', this.beginninginventory);

        this.initForm();
        /*this.addinventoryform = this.formBuilder.group({
            codeDeReference: ["", [Validators.required, RxwebValidators.unique({ message: 'code De Reference must be unique' })]],
            commentaire: ["", Validators.required],
            Vide: ["",Validators.required], 
            isDeleted: ["",Validators.required],
        });
        */
        console.log('ngOnInit -after initform beginninginventory:', this.beginninginventory);



    }
    initForm() {
        this.addform = this.formBuilder.group({

               // codeDeReference: ["", [Validators.required, RxwebValidators.unique({ message: 'code De Reference must be unique' })]],
                codeDeReference: [0, {
                    validators: [Validators.required, RxwebValidators.unique({ message: 'code De Reference must be unique' })],
                }],
            commentaire: ["commentaire",[Validators.required]],
            Vide: [false, [Validators.required]],
            isDeleted: [false,[Validators.required]],
        });

       

    }


    geValues(event) {
        console.log("event :", event);

     //   const inventoryData = this.addform.value as BeginningInventory;

      //  this.beginninginventory = inventoryData; // Set the data in this.beginninginventory

        if (this.addform.invalid) {
            console.log('FFFFFFFFFFFFFFFFFFFFFFForm is invalid.');
            this.sharedService.setIsActive(false);

            return;
        }
        console.log('*********Form data:', this.beginninginventory);
        this.sharedService.setIsActive(true);
        //this.dataEmitted.emit(inventoryData); // Emit the data
        //console.log('Data emitted from child component:', inventoryData);

    }

    get f() {
        return this.addform.controls;
    }

    emitDataToMainForm() {
        if (this.addform.valid) {
            this.formGroup.patchValue({
                codeDeReference: this.addform.get('codeDeReference').value,
                commentaire: this.addform.get('commentaire').value,
                Vide: this.addform.get('Vide').value,
                isDeleted: this.addform.get('isDeleted').value,
                // Add more properties for other sub-forms if needed
            });
        }
    }

    }

       
