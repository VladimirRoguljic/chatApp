import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {takeUntil} from "rxjs/internal/operators";
import {Subject} from "rxjs";
import {UserManagementAction} from "../../enums/UserManagementAction";
import Swal from 'sweetalert2';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GlobalService} from "../../services/global.service";

@Component({
  selector: 'app-usermanagment',
  templateUrl: './usermanagment.component.html',
  styleUrls: ['./usermanagment.component.css']
})
export class UsermanagmentComponent implements OnInit, OnDestroy {
  ngUnsubscribe: Subject<any> = new Subject<any>();
  mode: string;
  actionCode: string;
  actions = UserManagementAction;
  form: FormGroup;
  actionCodeChecked: boolean;
  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private _fb: FormBuilder,
              private _global: GlobalService,
              private authService: AuthService) { }

  ngOnInit() {
    this.activatedRoute.queryParams.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(params => {
           if(!params) this.router.navigate(['login']);
           this.mode = params['mode'];
           this.actionCode = params['oobCode'];
           switch (params['mode']) {
             case this.actions.resetPassword: {
               this.authService.getAuth().verifyPasswordResetCode(this.actionCode)
                 .then(password => {
                    this.actionCodeChecked = true;
                 }).catch((err) => {
                     Swal.fire({
                        title: `${err.message}`,
                        type: 'warning'
                     }).then(result => {
                       this.router.navigate(['/login'])
                     })

               })
             } break;

             case this.actions.verifyEmail: {
               this.authService.getAuth().applyActionCode(this.actionCode).then((email) => {
                 this.actionCodeChecked = true;
                   Swal.fire({
                       title: 'Your email has been verified',
                       type: 'success'
                   }).then((result) => {
                       this.router.navigate(['login'])
                   })
               }).catch((err) => {
                 Swal.fire({
                     title: `${err.message}`,
                     type: 'warning'
                 }).then(result => {
                     this.router.navigate(['login'])
                 })
               })
             }break;

             default: {
               Swal.fire({
                  title: 'query parameters are missing',
                  type: 'warning'
               }).then(result => {
                   this.router.navigate(['login']);
               });

             }
           }
      });

    this.buildForm();
  }

  buildForm() {
    this.form = this._fb.group({
        newPassword: ['', Validators.required],
        confirmPassword: ['', Validators.required]
    })
  }

  handleResetPassword(form) {
    let pass = this.form.get('newPassword').value;
    let confirmPass = this.form.get('confirmPassword').value;
    if (this.form.invalid) {
      return this._global.checkFormErrors(this.form);
    }
    else if(pass !== confirmPass) {
       Swal.fire({
           title: 'New Password and Confirm Password do not match',
           type: 'warning'
       })
    }

    else  {
      this.authService.getAuth().confirmPasswordReset(this.actionCode, form.newPassword)
        .then(res => {
          Swal.fire({
            title: 'New password has been saved',
            type: 'success'
          }).then(result => {
            if(result.value) this.router.navigate(['/login'])
          }).catch((err) => {
            Swal.fire({
              title: `${err.message}`,
              type: 'warning'
            })
          })
        })
    }

  }


  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete()
  }

}
