import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {CONFIG_TOKEN, EuiAppConfig, I18nService, UserService} from '@eui/core';
import {of} from 'rxjs';
import {AppStarterService} from './app-starter.service';
import SpyObj = jasmine.SpyObj;

describe('AppStarterService', () => {
    let service: AppStarterService;
    let httpMock: HttpTestingController;
    let userServiceMock: SpyObj<UserService>;
    let i18nServiceMock: SpyObj<I18nService>;
    let configMock: EuiAppConfig;

    beforeEach(() => {
        userServiceMock = jasmine.createSpyObj('UserService', ['init']);
        i18nServiceMock = jasmine.createSpyObj('I18nService', ['init']);
        configMock = {global: {}, modules: {core: {base: 'localhost:3000', userDetails: 'dummy'}}};

        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                AppStarterService,
                {provide: UserService, useValue: userServiceMock},
                {provide: I18nService, useValue: i18nServiceMock},
                {provide: CONFIG_TOKEN, useValue: configMock},
            ],
        });

        service = TestBed.inject(AppStarterService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should call start method', () => {
        userServiceMock.init.and.returnValue(of(null));
        i18nServiceMock.init.and.returnValue(of(null));
        service.start().subscribe(() => {
            expect(userServiceMock.init).toHaveBeenCalled();
            expect(i18nServiceMock.init).toHaveBeenCalled();
        });
    });

    it('should call initUserService method', () => {
        userServiceMock.init.and.returnValue(of(null));
        service.initUserService().subscribe(() => {
            expect(userServiceMock.init).toHaveBeenCalled();
        });
    });

    it('should fetch user details', () => {
        const dummyUserDetails = {userId: 'anonymous'};
        service['fetchUserDetails']().subscribe(userDetails => {
            expect(userDetails).toEqual(dummyUserDetails);
        });

        const req = httpMock.expectOne(`${configMock.modules.core.base}${configMock.modules.core.userDetails}`);
        expect(req.request.method).toBe('GET');
        req.flush(dummyUserDetails);
    });
});
