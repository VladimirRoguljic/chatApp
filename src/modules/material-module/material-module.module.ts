import { NgModule } from '@angular/core';
import { MatDialogModule} from '@angular/material'
import {
  MatCardModule,
  MatInputModule,
  MatButtonModule,
  MatSidenavModule,
} from "@angular/material";
import {MatRadioModule} from '@angular/material/radio'

const modules = [
  MatCardModule,
  MatInputModule,
  MatButtonModule,
  MatSidenavModule,
  MatDialogModule,
  MatRadioModule
];



@NgModule({
  imports: modules,
  exports: modules,
})
export class MaterialModuleModule { }
