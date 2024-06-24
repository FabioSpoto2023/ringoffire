export class Game {
    public players: string[] = [];
    public stack: string[] = [];
    public playerCards: string[] = [];
    public currentPlayer: number = 0;
    public pickCardAnimation: boolean = false;
	public currentCard: string = '';

    constructor() {
        for (let i = 1; i < 14; i++) {
            this.stack.push('hearts_' + i);
            this.stack.push('clubs_' + i);
            this.stack.push('diamonds_' + i);
        }
        this.shuffle(this.stack);
    }

    shuffle(list: string[]) {
        let currentIndex = list.length;
        while (currentIndex != 0) {
            let randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [list[currentIndex], list[randomIndex]] = [
                list[randomIndex], list[currentIndex]];
        }
    }

    public toJson() {
        return {
            players: this.players,
            stack: this.stack,
            playerCards: this.playerCards,
            currentPlayer: this.currentPlayer,
            pickCardAnimation: this.pickCardAnimation,
            currentCard: this.currentCard
        }
    }
}