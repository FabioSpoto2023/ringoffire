import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Game } from '../models/game';
import { PlayerComponent } from '../player/player.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog'
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { GameInfoComponent } from '../game-info/game-info.component';
import { Firestore, collection, onSnapshot, doc, addDoc, updateDoc } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';

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
export class GameComponent implements OnInit, OnDestroy {
	game!: Game;

	gameId!: string;

	firestore: Firestore = inject(Firestore);
	unsubGames;

	constructor(private route: ActivatedRoute, public dialog: MatDialog) {
		this.unsubGames = this.subGames();
	}

	subGames() {
		return onSnapshot(collection(this.firestore, 'games'), (list) => {
			list.forEach(element => {
				this.route.params.subscribe((params) => {
					if (element.id == params['id']) {
						this.gameId = element.id;
						let game = element.data()
						this.game.currentPlayer = game['currentPlayer'];
						this.game.playerCards = game['playerCards'];
						this.game.players = game['players'];
						this.game.stack = game['stack'];
						this.game.pickCardAnimation = game['pickCardAnimation'];
						this.game.currentCard = game['currentCard'];
					}
				})
			});
		});
	}


	ngOnInit(): void {
		this.newGame();
	}

	saveGame() {
		updateDoc(doc(collection(this.firestore, 'games'), this.gameId), this.game.toJson());
	}

	getGame(docId: string) {
		return doc(collection(this.firestore, 'games'), docId);
	}

	ngOnDestroy(): void {
		this.unsubGames();
	}

	newGame() {
		this.game = new Game();
	}

	pickCard() {
		if (!this.game.pickCardAnimation) {
			this.game.currentCard = this.game.stack.pop() as string;
			this.game.pickCardAnimation = true;

			this.game.currentPlayer++;
			this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;

			this.saveGame();

			setTimeout(() => {
				this.game.playerCards.push(this.game.currentCard);
				this.game.pickCardAnimation = false;
				this.saveGame();
			}, 1000);
		}
	}

	openDialog(): void {
		const dialogRef = this.dialog.open(DialogAddPlayerComponent);

		dialogRef.afterClosed().subscribe((name: string) => {
			if (name && name.length > 0) {
				this.game.players.push(name);
				this.saveGame();
			}
		});
	}
}
