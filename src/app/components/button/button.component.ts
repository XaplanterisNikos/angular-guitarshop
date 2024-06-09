import { Component, EventEmitter, Output } from '@angular/core';

/**
 * Represents a button component.
 * This component encapsulates functionality for login and logout actions.
 */
@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {
  
  /** Event emitter for login action. */
  @Output() loginEvent = new EventEmitter();

  /** Event emitter for logout action. */
	@Output() logoutEvent = new EventEmitter();
}
