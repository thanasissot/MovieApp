import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent {
    sidebarItems = [
        { label: 'Movies', url: 'screen/home' },
        { label: 'Actors', url: 'screen/actor-page'},
        { label: 'Module 2', url: 'screen/module2', children: [
                { label: 'page 1', url: 'screen/module1/page1' },
                { label: 'page 2', url: 'screen/module1/page2' },
            ]  },
    ];
    notificationItems = [
        { label: 'Title label 1', subLabel: 'Subtitle label' },
        { label: 'Title label 2', subLabel: 'Subtitle label' },
        { label: 'Title label 3', subLabel: 'Subtitle label' },
        { label: 'Title label 4', subLabel: 'Subtitle label' },
    ];
}
