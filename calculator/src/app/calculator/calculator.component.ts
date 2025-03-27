import {
  Component,
  ElementRef,
  ViewChild,
  HostListener,
  signal,
} from '@angular/core';

@Component({
  selector: 'app-calculator',
  standalone: true,
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css'],
})
export class CalculatorComponent {
  @ViewChild('result') resultElement!: ElementRef;
  displayResult = signal('');
  maxChars = 132;

  buttons = [
    'C',
    '+/-',
    '%',
    '/',
    '7',
    '8',
    '9',
    '*',
    '4',
    '5',
    '6',
    '-',
    '1',
    '2',
    '3',
    '+',
    '0',
    '.',
    '=',
    'x',
  ];

  // Update display styling dynamically
  updateDisplay() {
    if (!this.resultElement) return;

    let resultEl = this.resultElement.nativeElement;
    resultEl.textContent = this.displayResult();

    // Adjust font size dynamically
    let length = this.displayResult().length;
    resultEl.style.fontSize =
      length > 81
        ? '0.8rem'
        : length > 18
        ? '1rem'
        : length > 13
        ? '1.5rem'
        : '2rem';
  }

  // Handle button inputs
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

    this.updateDisplay();
  }

  // Handle keyboard inputs
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    let key = event.key;
    if (key >= '0' && key <= '9') this.handleInput(key);
    else if (['+', '-', '*', '/'].includes(key)) this.handleInput(key);
    else if (key === 'Enter') this.handleInput('=');
    else if (key === 'Backspace') this.handleInput('x');
    else if (key === 'Escape') this.handleInput('C');
    else if (key === '%') this.handleInput('%');
  }
}
