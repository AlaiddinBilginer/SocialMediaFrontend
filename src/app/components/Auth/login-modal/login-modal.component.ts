import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RegisterModalComponent } from '../register-modal/register-modal.component';
import { AuthService } from '../../../services/auth/auth.service';
import { LoginRequest } from '../../../contracts/auth/login-request';
import { NotificationIconType, NotificationPositionType, NotificationService } from '../../../services/common/notification.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { LocalStorageService } from '../../../services/common/local-storage.service';
import { Token } from '../../../models/token';
import { IdentityService } from '../../../services/auth/identity.service';

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
    private localStorageService: LocalStorageService,
    private identityService: IdentityService,
  ) {
    identityService.checkIdentity();
  }
  
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
          this.identityService.checkIdentity();
          this.notificationService.showNotification(response.message + '. Hoş geldin :)', "Giriş Başarılı", {
            notificationIconType: NotificationIconType.Success,
            notificationPositionType: NotificationPositionType.BottomRight
          });
        } else {
          this.ngxSpinnerService.hide();
          this.notificationService.showNotification(response.message, "Giriş Başarısız", {
            notificationIconType: NotificationIconType.Error,
            notificationPositionType: NotificationPositionType.BottomRight
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
