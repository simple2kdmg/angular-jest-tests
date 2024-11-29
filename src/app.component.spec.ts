import {
    ComponentFixture,
    fakeAsync,
    TestBed,
    tick,
} from '@angular/core/testing';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {AppComponent} from "./app.component";

class PageObject {
    constructor(private readonly fixture: ComponentFixture<AppComponent>) {
    }

    get data(): DebugElement {
        return this.fixture.debugElement.query(By.css('[data-testing-id="data"]'));
    }
}

function realDelay(delayMs: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, delayMs));
}

describe('AppComponent', (): void => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;
    let pageObject: PageObject;

    beforeEach((): void => {
        TestBed.configureTestingModule({
            imports: [AppComponent],
        });
    });

    beforeEach((): void => {
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        pageObject = new PageObject(fixture);
    });

    it(`with fake async`, fakeAsync(() => {
        fixture.detectChanges();
        tick(component.DEBOUNCE_MS + 10);
        fixture.detectChanges();

        expect(pageObject.data).toBeTruthy();
    }));

    it(`with fake async and whenStable`, fakeAsync(() => {
        fixture.detectChanges();

        expect(component.loading).toEqual(true);

        fixture.whenStable().then(() => {
            expect(component.loading).toEqual(false);
            expect(pageObject.data.nativeElement.textContent).toEqual('DATA');
        });
    }));

    it(`with real async`, async () => {
        fixture.detectChanges();

        await realDelay(component.DEBOUNCE_MS);
        fixture.detectChanges();

        expect(pageObject.data).toBeTruthy();
    });
});
