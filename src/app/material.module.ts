import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material';

@NgModule({
  imports: [//Modulo que quiero importar
    MatButtonModule
  ],
  exports: [//Modulo que quiero darle a otro modulo que va a usar este
    MatButtonModule
  ]
})

export class MaterialModule {


}
