import {Component, ViewChild, Inject} from '@angular/core';
import {MatTableDataSource, MatSort} from '@angular/material';
import {Solver} from './model/solver';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import {MatDialog} from '@angular/material';
import {AddSolverDialogComponent} from './add-solver-dialog/add-solver-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  displayedColumns = ['id', 'name', 'solved_today', 'solved'];
  dataSource = new MatTableDataSource();
  items: Observable<any[]>;
  constructor(public dialog: MatDialog, db: AngularFireDatabase) {
    this.items = db.list('solvers').valueChanges();
    this.items.subscribe(data => {
      data.sort((a, b) => (a.solved > b.solved) ? -1: 1)
        .map((a, index) => a.id = index+1);
      this.dataSource.data = data;
    })
  }

  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  addUserClick() {
    let dialogRef = this.dialog.open(AddSolverDialogComponent, {
      height: '200px',
      width: '450px',
    });
  }
}