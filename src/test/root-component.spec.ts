import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { RootComponent } from '../root-component';

class PageObject {
  constructor(private readonly fixture: ComponentFixture<RootComponent>) {}

  get data(): DebugElement {
    return this.fixture.debugElement.query(By.css('[data-testing-id="data"]'));
  }
}

function realDelay(delayMs: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, delayMs));
}

describe('App', (): void => {
  let component: RootComponent;
  let fixture: ComponentFixture<RootComponent>;
  let pageObject: PageObject;

  beforeEach((): void => {
    TestBed.configureTestingModule({
      imports: [RootComponent],
    });
  });

  beforeEach((): void => {
    fixture = TestBed.createComponent(RootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    pageObject = new PageObject(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should trigger tap after debounceTime`, fakeAsync(() => {
    fixture.detectChanges();
    tick(component.DEBOUNCE_MS);
    fixture.detectChanges();

    expect(pageObject.data).toBeTruthy();
  }));

  it(`should trigger tap after debounceTime`, async () => {
    fixture.detectChanges();

    await realDelay(component.DEBOUNCE_MS);
    fixture.detectChanges();

    expect(pageObject.data).toBeTruthy();
  });
});
