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

import {Data, Layout} from 'plotly.js';
import {ChartConfig, ChartType} from '../../../../../core/store/charts/chart.model';
import {CollectionModel} from '../../../../../core/store/collections/collection.model';
import {DocumentModel} from '../../../../../core/store/documents/document.model';

export abstract class PlotMaker {

  protected collections: CollectionModel[];

  protected documents: DocumentModel[];

  protected config: ChartConfig;

  public updateData(collections: CollectionModel[], documents: DocumentModel[], config: ChartConfig) {
    this.collections = collections;
    this.documents = documents;
    this.config = config;
  }

  public abstract createData(): Data[];

  public abstract createLayout(): Partial<Layout>;

  public abstract getType(): ChartType;
}
