import { Component } from '@angular/core';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  template: `
    <div class="contact-us-container">
      <div class="contact-card">
        <h1>Contact Us</h1>
        <p>We would love to hear from you.</p>

        <div class="contact-details">
          <div>
            <span class="label">Email</span>
            <a href="mailto:support@example.com">support@example.com</a>
          </div>
          <div>
            <span class="label">Phone</span>
            <a href="tel:+15551234567">+1 (555) 123-4567</a>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }

    .contact-us-container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      background: linear-gradient(135deg, #f5f7ff 0%, #eef2ff 100%);
    }

    .contact-card {
      width: min(100%, 560px);
      background: white;
      border-radius: 1rem;
      box-shadow: 0 18px 38px rgba(15, 23, 42, 0.08);
      padding: 2rem;
    }

    h1 {
      margin: 0 0 0.75rem;
      font-size: 2rem;
      color: #0f172a;
    }

    p {
      margin: 0 0 1.5rem;
      color: #475569;
    }

    .contact-details {
      display: grid;
      gap: 1rem;
    }

    .label {
      display: block;
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: #64748b;
      margin-bottom: 0.35rem;
    }

    a {
      color: #2563eb;
      text-decoration: none;
      font-weight: 600;
    }

    a:hover {
      text-decoration: underline;
    }
  `],
})
export class ContactUsComponent {}
