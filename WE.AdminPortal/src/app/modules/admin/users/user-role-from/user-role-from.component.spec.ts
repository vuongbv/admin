import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRoleFromComponent } from './user-role-from.component';

describe('UserRoleFromComponent', () => {
  let component: UserRoleFromComponent;
  let fixture: ComponentFixture<UserRoleFromComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserRoleFromComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserRoleFromComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
