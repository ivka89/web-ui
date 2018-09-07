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

import {Pipe, PipeTransform} from '@angular/core';
import {TableBodyCursor} from '../../../../../core/store/tables/table-cursor';
import {TableModel, TableRow} from '../../../../../core/store/tables/table.model';
import {findTableRow, splitRowPath} from '../../../../../core/store/tables/table.utils';

@Pipe({
  name: 'previousLinkedRow'
})
export class PreviousLinkedRowPipe implements PipeTransform {

  public transform(table: TableModel, cursor: TableBodyCursor): TableRow {
    const {parentPath} = splitRowPath(cursor.rowPath);
    return findTableRow(table.rows, parentPath);
  }

}