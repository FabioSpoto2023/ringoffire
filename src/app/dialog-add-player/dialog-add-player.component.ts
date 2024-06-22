import { Component } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';


@Component({
	selector: 'app-dialog-add-player',
	standalone: true,
	imports: [
		MatDialogModule,
		MatFormFieldModule,
		FormsModule,
		MatButtonModule,
		MatIconModule,
		MatInputModule
	],
	templateUrl: './dialog-add-player.component.html',
	styleUrl: './dialog-add-player.component.scss'
})
export class DialogAddPlayerComponent {

	constructor(private dialog: MatDialogRef<DialogAddPlayerComponent>) { }

	name: string = '';

	closeDialog() {
		this.dialog.close();
	}
}
