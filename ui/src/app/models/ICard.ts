export interface ICard {
  noun: string;
  type: 'red'|'blue'|'innocent bystander'|'assassin';
  revealed: boolean;
  revealedImage: string;
}
