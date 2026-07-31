```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { PasswordInputComponent } from './password-input.component';

describe('PasswordInputComponent', () => {
  let component: PasswordInputComponent;
  let fixture: ComponentFixture<PasswordInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PasswordInputComponent],
      imports: [
        ReactiveFormsModule,
        MatIconModule,
        MatFormFieldModule,
        NoopAnimationsModule
      ]
    })
   .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle password visibility when eye icon is clicked', () => {
    const passwordInput = fixture.nativeElement.querySelector('input[type="password"]');
    const eyeIcon = fixture.nativeElement.querySelector('.icon-toggle');

    expect(passwordInput.type).toBe('password');

    // Click the eye icon to show the password
    eyeIcon.click();
    fixture.detectChanges();

    expect(passwordInput.type).toBe('text');

    // Click the eye icon again to hide the password
    eyeIcon.click();
    fixture.detectChanges();

    expect(passwordInput.type).toBe('password');
  });
});
```