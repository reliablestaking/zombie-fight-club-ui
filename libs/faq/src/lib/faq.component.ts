import { Component } from '@angular/core';

interface Question {
  title: string;
  answer: string;
}

@Component({
  selector: 'zfc-ui-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
})
export class FaqComponent {
  readonly questions: Question[] = [
    {
      title: 'What is Zombie Fight Club?',
      answer: "Zombie Fight Club is a way to combine Zombie Chains and Zombie Hunter NFTs into unqiue fight NFTs with bonus free Alien NFTs for the winner of the fight.",
    },
    {
      title: 'Who gets the free Alien NFT?',
      answer: "The owner of the NFT that wins the fight is sent a free Alien NFT!",
    },
    {
      title: 'How are fight winners determined?',
      answer: "Every trait of a zombie or hunter has been assigned a numerical strength. The total strength is then determined for each nft and a random value is added or removed from the value. The nft with the higher strength is the winner. The community overwhelming chose to keep the trait stengths unknown.",
    },
    {
      title: 'How are aliens determined?',
      answer: "Each alien is randomly generated and is not influenced by the fight results or nfts used in any way. While random, aliens traits have their own rarity so some will be less or more rare than others.",
    },
    {
      title: 'What are the Zombie Fight Club policy IDs?',
      answer: "Zombie Fight Club Fight Policy is 3270d31cb0803a014924e186d1f0b672ccff0ecb9f6d4b4e2709b301, Zombie Fight Club Alien Policy is 4db36a48c088879b67612abea7236a2476d38d04d51e29df240eb007",
    },
    {
      title: 'What is the purpose of fight and alien NFTs?',
      answer: "You should not expect or anticipate any benefits beyond digital ownership of really awesome looking Fight and Alien NFTs.",
    },
  ];
}
