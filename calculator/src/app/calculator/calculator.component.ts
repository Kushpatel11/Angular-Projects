import { Component, HostListener, signal } from '@angular/core';
import $ from 'jquery'; // Import jQuery

@Component({
  selector: 'app-calculator',
  standalone: true,
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css'],
})
export class CalculatorComponent {
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

  ngAfterViewInit() {
    this.addJQueryEffects();
  }

  addJQueryEffects() {
    // Example: Flash effect on button click
    $('.btns').on('click', function () {
      $(this).fadeOut(100).fadeIn(100);
    });

    // Example: Highlighting the result text
    $('#result').hover(
      function () {
        $(this).css('color', 'blue');
      },
      function () {
        $(this).css('color', 'black');
      }
    );
  }

  handleInput(btnValue: string) {
    if (btnValue === 'C') {
      this.displayResult.set('');
    } else if (btnValue === 'x') {
      this.displayResult.set(this.displayResult().slice(0, -1));
    } else if (btnValue === '=') {
      try {
        this.displayResult.set(eval(this.displayResult()).toString());
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
      let match = this.displayResult().match(/([\d.]+)([+\-*/])([\d.]+)$/);
      if (match) {
        let first = parseFloat(match[1]);
        let operator = match[2];
        let last = parseFloat(match[3]);
        let perValue = (last / 100) * first;
        this.displayResult.set(
          this.displayResult().replace(/([\d.]+)$/, perValue.toString())
        );
      } else if (this.displayResult().length > 0) {
        this.displayResult.set(
          (parseFloat(this.displayResult()) / 100).toString()
        );
      }
    } else {
      if (this.displayResult().length >= this.maxChars) return;
      this.displayResult.set(this.displayResult() + btnValue);
    }
  }

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
