Ext.ns('App');

App.BookGrid = Ext.extend(Ext.grid.GridPanel, {
    initComponent: function () {
        Ext.apply(this, {
            columns: [
	            { header: "Author", width: 120, dataIndex: 'Author', sortable: true },
	            { header: "Title", dataIndex: 'Title', sortable: true },
	            { header: "Manufacturer", width: 115, dataIndex: 'Manufacturer', sortable: true },
	            { header: "Product Group", dataIndex: 'ProductGroup', sortable: true }
            ],
            sm: new Ext.grid.RowSelectionModel({ singleSelect: true }),
            store: new App.BookStore({
                storeId: 'gridBookStore',
                url: '/Content/xml/sheldon.xml'
            }),
            viewConfig: {
                forceFit: true
            }
        });

        App.BookGrid.superclass.initComponent.call(this);
    }
});

Ext.reg('bookgrid', App.BookGrid);