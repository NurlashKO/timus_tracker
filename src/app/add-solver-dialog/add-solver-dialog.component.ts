import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormGroupDirective,
  FormControl,
  AbstractControl,
  NgForm,
  ValidatorFn
} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {TimusServiceService} from '../service/timus-service.service';
import { AngularFireDatabase } from 'angularfire2/database';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-add-solver-dialog',
  templateUrl: './add-solver-dialog.component.html',
  styleUrls: ['./add-solver-dialog.component.css']
})
export class AddSolverDialogComponent implements OnInit {

  addSolverForm: FormGroup;
  matcher = new MyErrorStateMatcher();

  constructor(public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<AddSolverDialogComponent>,
              private db: AngularFireDatabase,
              private fb: FormBuilder,
              private timusService: TimusServiceService) { }

  ngOnInit() {
    this.addSolverForm = this.fb.group({
      name: new FormControl(
        '',
        [
          Validators.required,
          Validators.maxLength(40),
        ]
      ),
      solver: new FormControl(
        '',
        [
          Validators.required,
        ],
        [
          this.validateSolverRegistered()
        ],
      )
    });
  }

  validateSolverRegistered() {
    return (control: AbstractControl) => {
      return new Promise (resolve => {
        this.timusService.solverRegistered(control.value)
          .subscribe(res => {
            if (!res) {
              resolve({'solverRegistered': true}) 
            } else {
              this.addSolverForm.controls.name.setValue(res);
              resolve(null);
            }
          }
        )
        }
      )
    }
  }

  addSolver() {
    const id = this.addSolverForm.controls.solver.value;
    const name = this.addSolverForm.controls.name.value;
    this.db.list('solvers').set(id, {"name": name, "solved": 0})
    let snackBarRef = this.snackBar.open('Added. Update may take up to 1 minute.', null, {
      duration: 3000,
    });
    this.dialogRef.close();
  }
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
