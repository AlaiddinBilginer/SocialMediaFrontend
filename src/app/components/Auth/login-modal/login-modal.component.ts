import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RegisterModalComponent } from '../register-modal/register-modal.component';
import { AuthService } from '../../../services/auth/auth.service';
import { LoginRequest } from '../../../contracts/auth/login-request';
import { NotificationIconType, NotificationPositionType, NotificationService } from '../../../services/common/notification.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoginResponse } from '../../../contracts/auth/login-response';
import { ResponseModel } from '../../../contracts/common/response-model';
import { LocalStorageService } from '../../../services/common/local-storage.service';
import { Token } from '../../../models/token';

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

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private notificationService: NotificationService,
    private ngxSpinnerService: NgxSpinnerService,
    private localStorageService: LocalStorageService
  ) {}
  
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
    this.ngxSpinnerService.show();
    const loginRequest: LoginRequest = this.loginForm.value;

    this.authService.login(loginRequest).subscribe({
      next: (response: any) => {
        if(response.succeeded) {
          this.ngxSpinnerService.hide();
          this.closeModal();
          const token: Token = response.token;
          this.localStorageService.set('accessToken', token.accessToken);
          this.notificationService.showNotification(response.message, "Giriş Başarılı", {
            notificationIconType: NotificationIconType.Success,
            notificationPositionType: NotificationPositionType.TopEnd
          });
        } else {
          this.ngxSpinnerService.hide();
          this.notificationService.showNotification(response.message, "Giriş Başarısız", {
            notificationIconType: NotificationIconType.Error,
            notificationPositionType: NotificationPositionType.Center
          });
        }
      },
      error: (err) => {
        this.ngxSpinnerService.hide();
        console.log(err);
        this.notificationService.showNotification(
          "Bir hata oluştu, lütfen tekrar deneyin.",
          "Hata",
          {
            notificationIconType: NotificationIconType.Error,
            notificationPositionType: NotificationPositionType.Center,
          }
        );
      }
    })
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
