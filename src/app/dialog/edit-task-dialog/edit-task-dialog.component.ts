import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {DataHandlerService} from '../../service/data-handler.service';
import {Task} from '../../model/Task';

@Component({
  selector: 'app-edit-task-dialog',
  templateUrl: './edit-task-dialog.component.html',
  styleUrls: ['./edit-task-dialog.component.css']
})
export class EditTaskDialogComponent implements OnInit {

  private dialogTitle: string;
  private task: Task;

  constructor(
      private dialogRef: MatDialogRef<EditTaskDialogComponent>,
      @Inject(MAT_DIALOG_DATA) private data: [Task, string],
      private dataHandler: DataHandlerService,
      private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.task = this.data[0];
    this.dialogTitle = this.data[1];
  }

}
