export interface ColumnSettings {
    field: string;
    title?: string;
    hidden?: boolean;
    filter?: 'string'|'numeric'|'date'|'boolean';
    format?: string;
    _width?: number;   
    minResizableWidth?: number;
    reorderable?: boolean;
    resizable?: boolean;
    filterable?: boolean;
    sortable?: boolean;
    groupable?: boolean,
    selectable?: boolean;  
    orderIndex?: number;
    columnMenu?: boolean;
    editable?: boolean;
    editor?: string;
}
//minResizableWidth ?: number;
//_minResizableWidth ?: number;   
//lockable ?: boolean;
//locked ?: boolean;
//isColumnGroup?: boolean;
//isSpanColumn ?: boolean;
//matchesMedia ?: boolean;
