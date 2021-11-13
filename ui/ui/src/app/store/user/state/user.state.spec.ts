import { TestBed, async } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { UserState } from './user.state';
import { UserActions } from './user.actions';

describe('User actions', () => {
  let store: Store;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([UserState])]
    }).compileComponents();
    store = TestBed.get(Store);
  }));

  it('should login', () => {
    store.dispatch(new UserActions.Login({login: "", password: ""}));
    store.select(state => state.user.items).subscribe((items: string[]) => {
      expect(items).toEqual(jasmine.objectContaining([ 'item-1' ]));
    });
  });

});
