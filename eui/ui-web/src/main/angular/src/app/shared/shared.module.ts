// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Common 3rd party module used accross the app
import { TranslateModule } from '@ngx-translate/core';

// eUI specific modules - commonly used accross the app - prefered way
// keep here to avoid imports within features modules
import { EuiPageModule } from '@eui/components/eui-page';
import { EuiIconModule } from '@eui/components/eui-icon';
import { EuiCardModule } from '@eui/components/eui-card';
import { EuiTableModule } from '@eui/components/eui-table';
import { EuiPaginatorModule } from '@eui/components/eui-paginator';
// import ALL eUI components
import { EuiAllModule } from '@eui/components';

const MODULES = [
    CommonModule,
    FormsModule, ReactiveFormsModule,

    TranslateModule,

    // put here commonly used eUI modules components throughout the application
    EuiAllModule

    // in case of you really want to import all eUI components, see commented imports above
    // EuiAllModule,
];

@NgModule({
    imports: [
        ...MODULES,
    ],
    declarations: [
    ],
    exports: [
        ...MODULES,
    ]
})
export class SharedModule {}
