import {
  Component,
  ElementRef,
  ViewChild,
  HostListener,
  inject,
} from '@angular/core';
import { CalculatorService } from './calculator.service';

@Component({
  selector: 'app-calculator',
  standalone: true,
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css'],
})
export class CalculatorComponent {
  calculatorService = inject(CalculatorService);

  @ViewChild('result') resultElement!: ElementRef;

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

  get displayResult() {
    return this.calculatorService.getDisplayValue();
  }

  get fontSize() {
    return this.calculatorService.updateDisplay();
  }

  handleInput(btnValue: string) {
    this.calculatorService.handleInput(btnValue);
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
