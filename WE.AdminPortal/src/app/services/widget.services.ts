import { Injectable } from '@angular/core';
import { PanelDto } from 'src/api-service/share-services/models';
import { GroupsService } from 'src/api-service/share-services/services';

@Injectable({
  providedIn: 'root',
})
export class WidgetInfoService {
  constructor(private groupService: GroupsService) {}
  panelStore: any;
  getWidgets(panel_id: string) {
    const panelstore = localStorage.getItem('panels');

    if (panelstore) {
      const panels = JSON.parse(panelstore) as PanelDto[];

      return panels.find((i) => i.id == panel_id);
    }
    return undefined;
  }
  getWidget(widget_id: string, panel_id: string) {
    const panel = this.getWidgets(panel_id);
    return panel?.widgets?.find((i) => i.id == widget_id);
  }
  addPanel(panels: PanelDto[]) {
    localStorage.setItem('panels', JSON.stringify(panels));
  }

  getWidgetFromLogin(panels: any) {
    this.panelStore = panels;
  }
  loadLeftMenu(tenant_name: string) {
    this.groupService
      .tenantNameGroupsLeftmenuGet({ tenant_name: tenant_name })
      .subscribe((i) => {
        localStorage.setItem('leftMenu', JSON.stringify(i));
        let panels: PanelDto[] = [];
        i.forEach((n) => {
          panels = panels.concat(n.panels!);
          this.addPanel(panels);
        });
      });
  }
}
