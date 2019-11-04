import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatTabsModule} from '@angular/material/tabs';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatCardModule,
    MatCheckboxModule,
    MatIconModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatButtonModule,
    MatInputModule,
    MatTabsModule
  ],
  exports: [
    MatCardModule,
    MatCheckboxModule,
    MatIconModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatButtonModule,
    MatInputModule,
    MatTabsModule
  ]
})
export class MaterialModule { }
