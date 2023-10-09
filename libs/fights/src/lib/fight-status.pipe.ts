import { Pipe, PipeTransform } from '@angular/core';
import { Fight, FightStatus } from '@zfc-ui/fight-state';

@Pipe({
  name: 'fightStatus',
})
export class FightStatusPipe implements PipeTransform {
  transform(fight: Fight): string {
    switch (fight.status) {
      case FightStatus.PaymentReceived:
        return `Fight Minting`;
      case FightStatus.Minted:
        return `Fight Complete`;
      case FightStatus.AwaitingPayment:
      case FightStatus.Pending:
        return `Awaiting Payment`;
      case FightStatus.Expired:
        return 'Time Expired';
      default:
        return 'Unknown';
    }
  }
}
