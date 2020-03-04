import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, RequiredValidator } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  projectForm: FormGroup;

  ngOnInit(){
    this.projectForm = new FormGroup({
      'projectName': new FormControl(null, [Validators.required/* , this.validateProjectName */], this.asyncValidateProjectName),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'status': new FormControl(null)
    });
  }

  validateProjectName(control: FormControl): {[s: string] : boolean} {
    if(control.value === 'test'){
      return {'errorInvalidProjectName' : true};
    }

    return null;
  }

  onSubmit(){
    console.log(this.projectForm);
  }

  onReset(){
    this.projectForm.reset();
  }

  asyncValidateProjectName(control: FormControl): Promise<any> | Observable<any> {
    const validator = new Promise(
      (resolve, reject) => {
        setTimeout(() => {
          if(control.value === 'test'){
            resolve({'errorInvalidProjectName' : true});
          }
      
          resolve(null);
        } ,1500);
      }
    );
    return validator;
  }
}
