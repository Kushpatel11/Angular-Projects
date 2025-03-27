import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CalculatorService {
  displayResult = signal('');

  private maxChars = 132;

  getDisplayValue() {
    return this.displayResult();
  }

  updateDisplay() {
    let length = this.displayResult().length;
    return length > 81
      ? '0.8rem'
      : length > 18
      ? '1rem'
      : length > 13
      ? '1.5rem'
      : '2rem';
  }

  handleInput(btnValue: string) {
    if (btnValue === 'C') {
      this.displayResult.set('');
    } else if (btnValue === 'x') {
      this.displayResult.set(this.displayResult().slice(0, -1));
    } else if (btnValue === '=') {
      try {
        this.displayResult.set(
          new Function('return ' + this.displayResult())().toString()
        );
      } catch {
        this.displayResult.set('Error');
      }
    } else if (btnValue === '+/-') {
      if (this.displayResult().length > 0) {
        this.displayResult.set(
          (parseFloat(this.displayResult()) * -1).toString()
        );
      }
    } else if (btnValue === '%') {
      this.displayResult.set(
        (parseFloat(this.displayResult()) / 100).toString()
      );
    } else {
      if (this.displayResult().length >= this.maxChars) return;
      this.displayResult.set(this.displayResult() + btnValue);
    }
  }
}
