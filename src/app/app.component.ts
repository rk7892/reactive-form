import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'forms';

  // showPassword = false;
  // #subscription = new Subscription();

  myReactiveForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{1,4}$'),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$'
      ),
    ]),
    dob: new FormControl('', [Validators.required]),
    passwordVisibility: new FormControl(''),
    Address: new FormArray([new FormControl('Addr1')], [Validators.required]),
  });

  // constructor() {
  //   this.#subscription.add(this.myReactiveForm.controls.passwordVisibility.valueChanges.subscribe((value) => {
  //     console.log(value);
  //     this.showPassword = value === 'show';
  //   })
  //   )
  // }

  getAddressFromArray() {
    return this.myReactiveForm.get('Address') as FormArray;
  }

  addControlToAddress() {
    this.getAddressFromArray().push(new FormControl('Addr'));
  }
  removeAddress(index: number) {
    this.getAddressFromArray().removeAt(index);
  }

  handleValitade() {
    if (this.myReactiveForm.invalid) {
      window.alert('please fill all mandatory fields');
    }
    console.log(this.myReactiveForm.valid);
    console.log(this.myReactiveForm.value);
  }

  // ngOnDestroy(): void {
  //   this.#subscription.unsubscribe();
  // }
}
