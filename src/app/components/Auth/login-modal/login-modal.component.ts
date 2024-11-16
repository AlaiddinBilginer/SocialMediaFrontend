import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RegisterModalComponent } from '../register-modal/register-modal.component';

@Component({
  selector: 'app-login-modal',
  standalone: true,
  imports: [ReactiveFormsModule, RegisterModalComponent],
  templateUrl: './login-modal.component.html',
  styleUrl: './login-modal.component.css'
})
export class LoginModalComponent implements OnInit {
  loginForm!: FormGroup;
  isRegisterModalOpen = false;
  isLoginModalOpen = true;

  constructor(private formBuilder: FormBuilder) {}
  
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userNameOrEmail: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  @Output() close = new EventEmitter<void>();

  closeModal() {
    this.close.emit();
  }

  onLogin() {

  }

  toggleRegisterModal() {
    this.isRegisterModalOpen = !this.isRegisterModalOpen;
    this.isLoginModalOpen = false;
  }

  showLoginModal() {
    this.isRegisterModalOpen = false;
    this.isLoginModalOpen = true;
  }
}
