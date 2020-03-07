import { NgModule } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  imports: [//Modulo que quiero importar
    MatButtonModule,
    MatTableModule,
    MatInputModule,
    MatDialogModule
  ],
  exports: [//Modulo que quiero darle a otro modulo que va a usar este
    MatButtonModule,
    MatTableModule,
    MatInputModule,
    MatDialogModule
  ]
})

export class MaterialModule {


}
