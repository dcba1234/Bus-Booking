import { HttpClient } from '@angular/common/http';
import { ApiUrl } from 'src/Common';

export class BaseService {
    table = '';
    constructor(table, public http: HttpClient) {
        this.table = table;
    }

    changeStatusItem(Id, value: 'active' | 'deactive') {
        return this.http.delete<any>(`${ApiUrl}/${this.table}/${value}/${Id}`).toPromise();
    }

}
