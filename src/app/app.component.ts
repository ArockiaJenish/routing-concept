import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms'
import { reduce } from 'rxjs';
import { PostService } from './post.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  empForm!: FormGroup;


  email = new FormControl({ value: '53', disabled: true }, [Validators.required, Validators.email]);
  name = 'Arockia Jenish';
  // fg = new FormGroup({
  //   email: new FormControl({ value: this.name, disabled: true }, [Validators.required, Validators.email]),
  //   password: new FormControl('', [Validators.required])
  // })

  fg: FormGroup;

  constructor(private fb: FormBuilder, private service: PostService) {

    this.fg = this.fb.group({
      name: ['', [Validators.required]],
      userName: this.fb.control('', Validators.required),
      email: this.fb.control('', [Validators.required, Validators.email]),
      phone: this.fb.control('', [Validators.required, Validators.pattern("^([0|\+[0-9]{1,5})?([6789][0-9]{9})$")]),
      company: this.fb.control('', Validators.required),
      website: this.fb.control('', [Validators.required])
    })

    this.fg.valueChanges.subscribe(data => {
      console.log(data);
    })
  }

  register() {
    this.fg.updateValueAndValidity();
    console.log("email " + this.fg.value.email.valid);
    console.log("Valid ", this.fg.valid);
    console.log("error ", this.fg.controls['email'].errors);
    console.log("fg value = ", this.fg);
    if (this.fg.controls['email'].errors)
      console.log("email error");

    if (this.fg.valid) {
      this.service.saveData(this.fg.value).subscribe(res => {
        console.log("responset = ")
        console.log(res);
      }, err => {
        console.log(err);
      })
    }
  }

  getValue() {
    console.log("Error ", this.email.errors)
    console.log("Valid ", this.email.valid)
  }



  applyClass() {
    let classes = {
      "boldClass": true,
      "italic": true
    };
    return classes;
  }

  public bold: boolean = true;

  change() {
    if (this.bold)
      this.bold = false;
    else
      this.bold = true;
  }

  public red: string = 'red';

  get names() {
    return this.fg.controls['name'];
  }

  get userName() {
    return this.fg.get('userName');
  }

  get emails() {
    return this.fg.controls['email'];
  }

  get phone() {
    return this.fg.get('phone');
  }

  get website() {
    return this.fg.get('website');
  }

  companies = ['Prodian Infotech', 'Google', 'Microsoft', 'TCS', 'CTS', 'Zoho', 'AVA Soft', 'Colon Infotch', 'Infosys']

  get company() {
    return this.fg.get('company');
  }
}

