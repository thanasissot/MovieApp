import {ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterModule} from '@angular/router';
import {DebugElement, Predicate} from '@angular/core';
import {By} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {EuiAppModule} from '@eui/components/layout';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {CoreModule} from "./core/core.module";
import {routes} from "./app-routing.module";

describe('AppComponent', () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                RouterModule.forRoot(routes),
                CoreModule,
                EuiAppModule,
                HttpClientTestingModule,
            ],
            declarations: [AppComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
    });

    it('should create the app', () => {
        expect(component).toBeTruthy();
    });

    it('should have correct sidebarItems', () => {
        expect(component.sidebarItems).toEqual([
            {label: 'Home', url: 'screen/home'},
            {
                label: 'Module 1', url: 'screen/module1', children: [
                    {label: 'page 1', url: 'screen/module1/page1'},
                    {label: 'page 2', url: 'screen/module1/page2'},
                ]
            },
            {label: 'Module 2', url: 'screen/module2'},
        ]);
    });

    it('should have correct notificationItems', () => {
        expect(component.notificationItems).toEqual([
            {label: 'Title label 1', subLabel: 'Subtitle label'},
            {label: 'Title label 2', subLabel: 'Subtitle label'},
            {label: 'Title label 3', subLabel: 'Subtitle label'},
            {label: 'Title label 4', subLabel: 'Subtitle label'},
        ]);
    });

    it('should render correct number of eui-app-sidebar-menu items', () => {
        fixture.detectChanges();
        const compiled = fixture.debugElement;
        expect(compiled.queryAll(By.css('eui-menu-item')).length).toEqual(component.sidebarItems.length);
    });

    it('should render correct number of eui-notifications on icon badge', () => {
        fixture.detectChanges();
        const compiled = fixture.debugElement;
        const predicate = By.css('eui-notifications > eui-icon-svg-button > button > eui-icon-svg > eui-badge');
        expect(compiled.queryAll(predicate)[0].nativeNode.innerText).toEqual(component.notificationItems.length.toString());
    });

    it('should render correct number of eui-notifications on list', () => {
        fixture.detectChanges();
        const compiled = fixture.debugElement;
        const notificationButton: Predicate<DebugElement> = By.css('eui-notifications > eui-icon-svg-button > button');
        compiled.query(notificationButton).nativeElement.click();
        fixture.detectChanges();
        expect(compiled.queryAll(By.css('eui-notification-item')).length)
            .toEqual(component.notificationItems.length);
    });
});
