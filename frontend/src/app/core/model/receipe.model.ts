export class ReceipeModel {
    _id? : string;
    title: string;
    ingredients: string;
    instructions: string;
    prepTime: number;
    cookTime: number;
    servings: number;
    difficulty?: string;

    constructor() {
        this.title = '';
        this.ingredients = '';
        this.instructions = '';
        this.prepTime = 0;
        this.cookTime = 0;
        this.servings = 1;
        this.difficulty = 'Medium';
    }
}
