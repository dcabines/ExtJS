Ext.ns('App');

App.BookGrid = Ext.extend(Ext.grid.GridPanel, {
    // override 
    initComponent: function () {
        Ext.apply(this, {
            // Pass in a column model definition
            // Note that the DetailPageURL was defined in the record definition but is not used
            // here. That is okay.
            columns: [
	            { header: "Author", width: 120, dataIndex: 'Author', sortable: true },
	            { header: "Title", dataIndex: 'Title', sortable: true },
	            { header: "Manufacturer", width: 115, dataIndex: 'Manufacturer', sortable: true },
	            { header: "Product Group", dataIndex: 'ProductGroup', sortable: true }
            ],
            sm: new Ext.grid.RowSelectionModel({ singleSelect: true }),
            // Note the use of a storeId, this will register this Store
            // with the StoreMgr and allow us to retrieve it very easily.
            store: new App.BookStore({
                storeId: 'gridBookStore',
                url: '/Content/xml/sheldon.xml'
            }),
            // force the grid to fit the space which is available
            viewConfig: {
                forceFit: true
            }
        });
        // finally call the superclasses implementation
        App.BookGrid.superclass.initComponent.call(this);
    }
});
// This will associate an string representation of a class
// (called an xtype) with the Component Manager
// It allows you to support lazy instantiation of your components
Ext.reg('bookgrid', App.BookGrid);