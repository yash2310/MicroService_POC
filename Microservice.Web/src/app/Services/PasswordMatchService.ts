import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl } from '@angular/forms';

@Injectable()
export class PasswordMatchService {

    static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
        let config = {

            'invalidPasswod': 'Password not matched..!!'

        };

        return config[validatorName];
    }
    constructor(private router: Router) { }
    static passwordValidator(AC: AbstractControl) {
      
        let newpassword = AC.get('newpassword').value;
        let confirm = AC.get('confirm').value;

        if (newpassword != confirm) {
            // console.log('false');
            AC.get('confirm').setErrors({ passwordValidator: true })
            // this.router.navigate(['/user/master'])
        }
        else {
            console.log('true');
            return null;

        }

    }

}