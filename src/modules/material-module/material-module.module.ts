import { NgModule } from '@angular/core';
import {MatDialogModule, MatIconModule, MatListModule, MatSelectModule, MatToolbarModule} from '@angular/material';
import {
  MatCardModule,
  MatInputModule,
  MatButtonModule,
  MatSidenavModule,
} from "@angular/material";
import {MatRadioModule} from '@angular/material/radio'
import {MatGridListModule} from '@angular/material/grid-list';
import {MatFormFieldModule} from '@angular/material/form-field'

const modules = [
  MatCardModule,
  MatInputModule,
  MatButtonModule,
  MatSidenavModule,
  MatDialogModule,
  MatRadioModule,
  MatGridListModule,
  MatFormFieldModule,
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatSelectModule,
  MatInputModule
];



@NgModule({
  imports: modules,
  exports: modules,
})
export class MaterialModuleModule { }
