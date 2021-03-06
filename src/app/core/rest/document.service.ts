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

import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {isNullOrUndefined} from 'util';
import {environment} from '../../../environments/environment';
import {DocumentDto} from '../dto';
import {DocumentMetaDataDto} from '../dto/document.dto';
import {AppState} from '../store/app.state';
import {selectWorkspace} from '../store/navigation/navigation.state';
import {Workspace} from '../store/navigation/workspace.model';

// TODO send data attribute without '_id'
@Injectable()
export class DocumentService {

  private workspace: Workspace;

  constructor(private httpClient: HttpClient,
              private store: Store<AppState>) {
    this.store.select(selectWorkspace).subscribe(workspace => this.workspace = workspace);
  }

  public createDocument(document: DocumentDto): Observable<DocumentDto> {
    return this.httpClient.post<DocumentDto>(this.apiPrefix(document.collectionId), document);
  }

  public patchDocument(collectionId: string, documentId: string, document: Partial<DocumentDto>): Observable<DocumentDto> {
    return this.httpClient.patch<DocumentDto>(`${this.apiPrefix(collectionId)}/${documentId}`, document);
  }

  public updateDocumentData(document: DocumentDto): Observable<DocumentDto> {
    return this.httpClient.put<DocumentDto>(`${this.apiPrefix(document.collectionId)}/${document.id}/data`, document.data)
      .pipe(map(returnedDocument => {
          return {...returnedDocument, collectionId: document.collectionId};
        })
      );
  }

  public patchDocumentData(document: DocumentDto): Observable<DocumentDto> {
    return this.httpClient.patch<DocumentDto>(`${this.apiPrefix(document.collectionId)}/${document.id}/data`, document.data);
  }

  public updateDocumentMetaData(document: DocumentDto): Observable<DocumentDto> {
    return this.httpClient.put<DocumentDto>(`${this.apiPrefix(document.collectionId)}/${document.id}/meta`, document.metaData);
  }

  public patchDocumentMetaData(collectionId: string, documentId: string, metaData: DocumentMetaDataDto): Observable<DocumentDto> {
    return this.httpClient.patch<DocumentDto>(`${this.apiPrefix(collectionId)}/${documentId}/meta`, metaData);
  }

  public removeDocument(collectionId: string, documentId: string): Observable<HttpResponse<any>> {
    return this.httpClient.delete(
      `${this.apiPrefix(collectionId)}/${documentId}`,
      {observe: 'response', responseType: 'text'}
    );
  }

  public addFavorite(collectionId: string, documentId: string): Observable<any> {
    return this.httpClient.post(`${this.apiPrefix(collectionId)}/${documentId}/favorite`, {});
  }

  public removeFavorite(collectionId: string, documentId: string): Observable<any> {
    return this.httpClient.delete(`${this.apiPrefix(collectionId)}/${documentId}/favorite`);
  }

  public getDocument(collectionId: string, documentId: string): Observable<DocumentDto> {
    return this.httpClient.get<DocumentDto>(`${this.apiPrefix(collectionId)}/${documentId}`);
  }

  public getDocuments(collectionId: string, pageNumber?: number, pageSize?: number): Observable<DocumentDto[]> {
    const queryParams = new HttpParams();

    if (!isNullOrUndefined(pageNumber) && !isNullOrUndefined(pageSize)) {
      queryParams.set('page', pageNumber.toString())
        .set('size', pageSize.toString());
    }

    return this.httpClient.get<DocumentDto[]>(this.apiPrefix(collectionId), {params: queryParams});
  }

  private apiPrefix(collectionId: string): string {
    const organizationCode = this.workspace.organizationCode;
    const projectCode = this.workspace.projectCode;

    return `${environment.apiUrl}/rest/organizations/${organizationCode}/projects/${projectCode}/collections/${collectionId}/documents`;
  }

}
