import { RouterStateSerializer } from '@ngrx/router-store';
import { RouterStateSnapshot, Params } from '@angular/router';

/**
 * The RouterStateSerializer takes the current RouterStateSnapshot
 * and returns any pertinent information needed. The snapshot contains
 * all information about the state of the router at the given point in time.
 * The entire snapshot is complex and not always needed. In this case, you only
 * need the URL and query parameters from the snapshot in the store. Other items could be
 * returned such as route parameters and static route data.
 */

export interface RouterStateUrl {
  url: string;
  queryParams: Params;
  pageState: string;
}

export class CustomRouterStateSerializer
  implements RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {

    const { url } = routerState;
    const queryParams = routerState.root.queryParams;
    const pageState = getPageState(routerState);

    return { url, queryParams, pageState };
  }
}


function getPageState(routerState: any) {
  let child = routerState.root.children[0];

  while (child != null) {

    if (child.data && child.data.pageState) {
      console.log(child.data.pageState);
      return child.data.pageState;
    }

    if (child.children.length > 0) {
      child = child.children[0];
    } else {
      child = null;
    }
  }

  return '';
}
