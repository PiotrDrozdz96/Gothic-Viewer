import { NgModule } from '@angular/core';

import { InputFileReaderComponent } from '@common/components';
const components = [InputFileReaderComponent];

@NgModule({
  declarations: components,
  exports: components,
})
export class ComponentsModule { }
