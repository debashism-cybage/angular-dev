```typescript
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor() { }

  public fetchData(): string {
    return 'This is a test message from the service';
  }
}
```