/*
 * Lumeer: Modern Data Definition and Processing Platform
 *
 * Copyright (C) since 2017 Answer Institute, s.r.o. and/or its affiliates.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import {Injectable, Pipe, PipeTransform} from '@angular/core';
import {ViewModel} from '../../../core/store/views/view.model';
import {Observable, of} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from '../../../core/store/app.state';
import {selectCurrentUserForWorkspace} from '../../../core/store/users/users.state';
import {map} from 'rxjs/operators';
import {userHasRoleInResource} from '../../utils/resource.utils';
import {Role} from '../../../core/model/role';

@Pipe({
  name: 'canManageConfig',
  pure: false
})
@Injectable({
  providedIn: 'root'
})
export class CanManageConfigPipe implements PipeTransform {

  public constructor(private store: Store<AppState>) {
  }

  public transform(currentView: ViewModel): Observable<boolean> {
    if (!currentView) {
      return of(true);
    }

    return this.store.select(selectCurrentUserForWorkspace).pipe(
      map(currentUser => {
        if (!currentUser) {
          return false;
        }

        return userHasRoleInResource(currentUser, currentView, Role.Manage);
      })
    );
  }

}
