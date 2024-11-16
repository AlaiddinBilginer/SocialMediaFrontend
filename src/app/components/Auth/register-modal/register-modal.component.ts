import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { matchPassword, passwordValidator } from './register.validators';

@Component({
  selector: 'app-register-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register-modal.component.html',
  styleUrl: './register-modal.component.css'
})
export class RegisterModalComponent implements OnInit {
  registerForm!: FormGroup

  constructor(
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      userName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      fullName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(50),passwordValidator()]],
      confirmPassword: ['', Validators.required]
    }, 
    {
      validators: matchPassword('password', 'confirmPassword'),
    });
  }

  @Output() close = new EventEmitter<void>();
  @Output() switchToLogin = new EventEmitter<void>();

  onRegister() {
    
  }

  closeModal() {
    this.close.emit();
  }

  navigateToLogin() {
    this.switchToLogin.emit();
  }
}
