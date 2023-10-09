import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'zfc-ui-copy-input',
  templateUrl: './copy-input.component.html',
  styleUrls: ['./copy-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class CopyInputComponent {
  @Input() public name = '';
  @Input() public value = '';

  constructor(private snackBar: MatSnackBar) {}

  public copy(): void {
    this.snackBar.open('Copied to clipboard', undefined, {
      duration: 2000,
      panelClass: 'snackbar',
    });
  }
}
