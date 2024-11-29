import { Component, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import { debounceTime, Observable, Subject, tap } from 'rxjs';

@Component({
  selector: 'root-component',
  standalone: true,
  template: `
  @let data = data$ | async;

  @if(!loading) {
    <div data-testing-id="data">{{data}}</div>
  }
`,
  imports: [AsyncPipe],
})
export class RootComponent implements OnInit {
  loading = true;

  data$?: Observable<string>;

  readonly DEBOUNCE_MS = 500;

  ngOnInit(): void {
    const source$ = new Subject<string>();

    this.data$ = source$.pipe(
      debounceTime(this.DEBOUNCE_MS),
      tap(() => (this.loading = false))
    );

    source$.next('1');
  }
}

bootstrapApplication(RootComponent);
