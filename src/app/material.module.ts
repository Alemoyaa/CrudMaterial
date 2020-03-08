import { NgModule } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTabsModule} from '@angular/material/tabs';
import {MatNativeDateModule} from '@angular/material/core';

import {MatGridListModule} from '@angular/material/grid-list';
import {MatPaginatorModule} from '@angular/material/paginator'; ;

import {MatSnackBarModule} from '@angular/material/snack-bar';


@NgModule({
  imports: [//Modulo que quiero importar
    MatButtonModule,
    MatTableModule,
    MatInputModule,
    MatDialogModule,
    MatCardModule,
    MatToolbarModule,
    MatNativeDateModule,
    MatTabsModule,
    MatGridListModule,//Esto es para los card
    MatPaginatorModule,
    MatSnackBarModule
  ],
  exports: [//Modulo que quiero darle a otro modulo que va a usar este
    MatButtonModule,
    MatTableModule,
    MatInputModule,
    MatDialogModule,
    MatCardModule,
    MatToolbarModule,
    MatNativeDateModule,
    MatTabsModule,
    MatGridListModule,//Esto es para los card
    MatPaginatorModule,
    MatSnackBarModule
  ]
})

export class MaterialModule {


}
