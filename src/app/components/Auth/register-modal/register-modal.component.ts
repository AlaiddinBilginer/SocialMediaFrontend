import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { matchPassword, passwordValidator } from './register.validators';
import { AuthService } from '../../../services/auth/auth.service';
import { RegisterRequest } from '../../../contracts/auth/register-request';
import { NotificationIconType, NotificationPositionType, NotificationService } from '../../../services/common/notification.service';
import { NgxSpinnerService } from 'ngx-spinner';

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
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private notificationService: NotificationService,
    private ngxSpinnerService: NgxSpinnerService
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
    this.ngxSpinnerService.show();
    const registerRequest: RegisterRequest = this.registerForm.value;

    this.authService.register(registerRequest).subscribe({
      next: (response) => {
        this.ngxSpinnerService.hide();
        if(response.succeeded)
          this.closeModal();
        this.notificationService.showNotification(
          response.message,
          response.succeeded ? "Kayıt Başarılı" : "Kayıt Başarısız",
          {
            notificationIconType: response.succeeded 
            ? NotificationIconType.Success : NotificationIconType.Error,
            notificationPositionType: NotificationPositionType.BottomRight,
          }
        );
      },
      error: (err) => {
        this.ngxSpinnerService.hide();
        console.log(err);
        this.notificationService.showNotification(
          "Bir hata oluştu, lütfen tekrar deneyin.",
          "Hata",
          {
            notificationIconType: NotificationIconType.Error,
            notificationPositionType: NotificationPositionType.BottomRight,
          }
        );
      },
    });
  }

  closeModal() {
    this.close.emit();
  }

  navigateToLogin() {
    this.switchToLogin.emit();
  }
}
