import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListThemesPage } from './list-themes.page';

describe('ListThemesPage', () => {
  let component: ListThemesPage;
  let fixture: ComponentFixture<ListThemesPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListThemesPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListThemesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
