import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {WalkthroughComponent} from './walkthrough/walkthrough.component';
import {PickItemComponent} from './pick_item/pick-item.component';
import {ActiveTableComponent} from './active_table/active-table.component';
import {ContingencyTableComponent} from './contingency_table/contingency-table.component';
import {DigitalAssistentComponent} from './digital_assistent/digital-assistent.component';
import {CommonComponentsModule} from '../';
import {FormsModule} from '@angular/forms';
import {
  ResearchComponent,
  FilterComponent,
  DocumentInfoComponent,
  DocumentPreviewComponent,
  DocumentPostItComponent,
  DocumentVersionsComponent,
  DocumentContentComponent
} from './research';
import {BrowserModule} from '@angular/platform-browser';
import {PerfectScrollbarModule} from 'angular2-perfect-scrollbar';
import {DocumentInfoService} from '../../services/document-info.service';
import {HistoryChatComponent} from './active_table/history-chat.component';

const viewsRoutes: Routes = [
  {
    path: 'views',
    data: {
      id: 'views',
      title: 'Views',
      icon: 'fa-eye',
      collapsed: true,
    },
    children: [
      {
        path: 'research',
        component: ResearchComponent,
        data: {
          id: 'research', title: 'Research', icon: 'fa-search'
        },
        children: []
      },
      {
        path: 'pick_item',
        component: PickItemComponent,
        data: {
          id: 'pick_item', title: 'Pick item', icon: 'fa-eyedropper'
        },
        children: []
      },
      {
        path: 'walkthrough',
        component: WalkthroughComponent,
        data: {
          id: 'walkthrough', title: 'Walkthrough', icon: 'fa-link'
        },
        children: []
      },
      {
        path: 'active_table',
        component: ActiveTableComponent,
        data: {
          id: 'active_table', title: 'Active Table', icon: 'fa-table'
        },
        children: []
      },
      {
        path: 'contigency_table',
        component: ContingencyTableComponent,
        data: {
          id: 'contigency_table', title: 'Contingency Table', icon: 'fa-list-alt'
        },
        children: []
      },
      {
        path: 'digital_assistent',
        component: DigitalAssistentComponent,
        data: {
          id: 'digital_assistent', title: 'Digital Assistent', icon: 'fa-user-secret'
        },
        children: []
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonComponentsModule,
    BrowserModule,
    PerfectScrollbarModule,
    FormsModule,
    RouterModule.forChild(viewsRoutes)
  ],
  providers: [
    DocumentInfoService
  ],
  declarations: [
    WalkthroughComponent,
    ResearchComponent,
    PickItemComponent,
    ActiveTableComponent,
    ContingencyTableComponent,
    DigitalAssistentComponent,
    FilterComponent,
    DocumentPreviewComponent,
    DocumentInfoComponent,
    HistoryChatComponent,
    DocumentPostItComponent,
    DocumentVersionsComponent,
    DocumentContentComponent
  ],
  exports: [
    FilterComponent
  ]
})
export class ViewsModule {
}