import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Game } from '../models/game';

@Component({
	selector: 'app-game',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './game.component.html',
	styleUrl: './game.component.scss'
})
export class GameComponent implements OnInit {
	pickCardAnimation: boolean = false;
	currentCard: string = '';
	game!: Game;

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

}
