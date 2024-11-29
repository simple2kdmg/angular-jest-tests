import {Component, OnInit} from '@angular/core';
import {AsyncPipe} from '@angular/common';
import {debounceTime, Observable, startWith, tap} from 'rxjs';
import {FormControl, ReactiveFormsModule} from '@angular/forms';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: 'app.component.html',
    imports: [AsyncPipe, ReactiveFormsModule],
})
export class AppComponent implements OnInit {
    loading = true;

    data$?: Observable<string>;

    readonly control = new FormControl<string>('DATA', {nonNullable: true})
    readonly DEBOUNCE_MS = 500;

    ngOnInit(): void {
        this.data$ = this.control.valueChanges.pipe(
            startWith(this.control.value),
            tap((x) => {
                this.loading = true;
            }),
            debounceTime(this.DEBOUNCE_MS),
            tap((x) => {
                this.loading = false;
            }),
        );
    }
}