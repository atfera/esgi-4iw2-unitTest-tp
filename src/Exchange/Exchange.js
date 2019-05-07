import { DBConnection } from '../DBConnection';
import { EmailSender } from '../EmailSender';

export class Exchange {

  constructor(receiver, product, owner, dateStart, dateEnd) {
    this.receiver = receiver;
    this.product = product;
    this.owner = owner;
    this.dateStart = dateStart;
    this.dateEnd = dateEnd;

    this.DBConnection = new DBConnection();
    this.EmailSender = new EmailSender();
  }

  isDate(date) {
    if (Object.prototype.toString.call(date) === "[object Date]")
      return true;
    return false;
  }

  save() {
    const { receiver, product, owner, dateStart, dateEnd } = this;
    
    if (receiver == null || !receiver.isValid()) {
      throw new Error('Receiver not valid');
    }

    if (product == null || !product.isValid()){
      throw new Error('Product not valid');
    }

    if (owner == null || !owner.isValid()) {
      throw new Error('Owner not valid');
    }

    if (
      dateStart == null ||
      dateEnd == null ||
      !this.isDate(dateEnd) ||
      !this.isDate(dateStart) ||
      ( dateEnd - dateStart ) < 0
    ) {
      throw new Error('Date not valid');
    }

    return new Promise((resolve, reject) => {
      try {
        this.DBConnection.saveExchange(this);
        if (receiver.age < 18) {
          this.EmailSender.sendEmail(receiver.email, 'Exchange saved!');
        }
        resolve(true);
      } catch(error){
        reject(error);
      }
    })

  }
}