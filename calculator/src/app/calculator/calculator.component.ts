import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css'],
})
export class CalculatorComponent {
  displayResult: string = '';
  maxChars: number = 132;

  buttons: string[] = [
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

  updateDisplay() {
    let resultElement = document.getElementById('result');

    if (resultElement) {
      let fontSize = '2rem';
      if (this.displayResult.length > 81) fontSize = '0.8rem';
      else if (this.displayResult.length > 18) fontSize = '1rem';
      else if (this.displayResult.length > 13) fontSize = '1.5rem';

      resultElement.style.fontSize = fontSize;
      resultElement.style.wordBreak = 'break-all';
      resultElement.style.textAlign = 'right';
      resultElement.style.maxWidth = '100%';
    }
  }

  handleInput(btnValue: string) {
    if (btnValue === 'C') {
      this.displayResult = '';
    } else if (btnValue === 'x') {
      this.displayResult = this.displayResult.slice(0, -1);
    } else if (btnValue === '=') {
      try {
        this.displayResult = eval(this.displayResult).toString();
      } catch {
        this.displayResult = 'Error';
      }
    } else if (btnValue === '+/-') {
      if (this.displayResult.length > 0) {
        this.displayResult = (parseFloat(this.displayResult) * -1).toString();
      }
    } else if (btnValue === '%') {
      let match = this.displayResult.match(/([\d.]+)([+\-*/])([\d.]+)$/);
      if (match) {
        let first = parseFloat(match[1]);
        let operator = match[2];
        let last = parseFloat(match[3]);

        let perValue = (last / 100) * first;
        this.displayResult = this.displayResult.replace(
          /([\d.]+)$/,
          perValue.toString()
        );
      } else if (this.displayResult.length > 0) {
        this.displayResult = (parseFloat(this.displayResult) / 100).toString();
      }
    } else {
      if (this.displayResult.length >= this.maxChars) return;
      this.displayResult += btnValue;
    }

    this.updateDisplay();
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    let key = event.key;

    if (key >= '0' && key <= '9') {
      this.handleInput(key);
    } else if (['+', '-', '*', '/'].includes(key)) {
      this.handleInput(key);
    } else if (key === 'Enter') {
      this.handleInput('=');
    } else if (key === 'Backspace') {
      this.handleInput('x');
    } else if (key === 'Escape') {
      this.handleInput('C');
    } else if (key === '%') {
      this.handleInput('%');
    }
  }
}
