import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthenticationService } from '../service/authentication.service';
import { CommonService } from '../service/common/common.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {
  rfValidateForm: FormGroup;
  isLoading = false;
  constructor(private fb: FormBuilder,
              private route: Router,
              private authenSvc: AuthenticationService,
              private commonSvc: CommonService) {
    this.rfValidateForm = this.fb.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.commonSvc.setLoading(true);
  }
  async submitForm() {
    for (const i of Object.keys(this.rfValidateForm.controls)) {
      this.rfValidateForm.controls[i].markAsDirty();
      this.rfValidateForm.controls[i].updateValueAndValidity();
    }

    if (this.rfValidateForm.valid) {

      this.commonSvc.setLoading(true);
      this.isLoading = true;
      try {
        const result = await this.authenSvc.login(this.rfValidateForm.value);
        console.log(result);
        this.commonSvc.setLoading(false);
        this.isLoading = false;
        // navigate
        this.authenSvc.saveToStorage(result.accessToken);
        this.route.navigateByUrl('/admin/driver');

      } catch (error) {
        if (error.status === 401) {
          this.rfValidateForm.controls.password.setErrors({ authen: true });
        }
        this.isLoading = false;
        this.commonSvc.setLoading(false);
      }

    }
  }
}
