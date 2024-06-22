import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Game } from '../models/game';
import { PlayerComponent } from '../player/player.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog'
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { GameInfoComponent } from '../game-info/game-info.component';

@Component({
	selector: 'app-game',
	standalone: true,
	imports: [
		CommonModule,
		PlayerComponent,
		MatButtonModule,
		MatIconModule,
		GameInfoComponent
	],
	templateUrl: './game.component.html',
	styleUrl: './game.component.scss'
})
export class GameComponent implements OnInit {
	pickCardAnimation: boolean = false;
	currentCard: string = '';
	game!: Game;

	constructor(public dialog: MatDialog) { }

	ngOnInit(): void {
		this.newGame();
	}

	newGame() {
		this.game = new Game();
	}

	pickCard() {
		if (!this.pickCardAnimation) {
			this.currentCard = this.game.stack.pop() as string;
			this.pickCardAnimation = true;

			setTimeout(() => {
				this.game.playerCards.push(this.currentCard);
				this.pickCardAnimation = false;
			}, 1000);
		}
	}

	openDialog(): void {
		const dialogRef = this.dialog.open(DialogAddPlayerComponent);

		dialogRef.afterClosed().subscribe((name: string) => {
			this.game.players.push(name)
		});
	}
}
