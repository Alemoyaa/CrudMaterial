import { NgModule } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  imports: [//Modulo que quiero importar
    MatButtonModule,
    MatTableModule,
    MatInputModule,
    MatDialogModule,
    MatCardModule
  ],
  exports: [//Modulo que quiero darle a otro modulo que va a usar este
    MatButtonModule,
    MatTableModule,
    MatInputModule,
    MatDialogModule,
    MatCardModule
  ]
})

export class MaterialModule {


}
