import { Component, Inject } from "@angular/core";
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from "@angular/material/dialog";
import { TranslateService } from "@ngx-translate/core";


@Component({
  selector: "app-simple-dialog-dynamic",
  templateUrl: "./simple-dialog-dynamic.component.html",
  styleUrls: ["./simple-dialog-dynamic.component.scss"]
})
export class SimpleDialogDynamicComponent {
  style: number;
  title: string;
  message: string;
  information: string;
  button: number;
  allow_outside_click: boolean;
  Ok;
  Cancel;

  constructor(
    private translate: TranslateService,
    public dialogRef: MatDialogRef<SimpleDialogDynamicComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {     
    this.style = data.style || 0;
    this.title = data.title;
    this.message = data.message;
    this.information = data.information;
    this.button = data.button;
    this.dialogRef.disableClose = !data.allow_outside_click || false;
  }
  onClose() {
    this.dialogRef.close({ result: "close" });
  }
  onOk() {
    this.dialogRef.close({result: "ok"});
  }
  onCancel() {
    this.dialogRef.close({result: "cancel"});
  }
  onYes() {
    this.dialogRef.close({result: "yes"});
  }
  onNo() {
    this.dialogRef.close({result: "no"});
  }
  onAccept() {
    this.dialogRef.close({result: "accept"});
  }
  onReject() {
    this.dialogRef.close({result: "reject"});
  }


}
