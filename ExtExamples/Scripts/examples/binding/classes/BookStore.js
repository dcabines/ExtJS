Ext.ns('App');

App.BookStore = function (config) {
    var config = config || {};
    Ext.applyIf(config, {
        reader: new Ext.data.XmlReader({
            // records will have an "Item" tag
            record: 'Item',
            id: 'ASIN',
            totalRecords: '@total'
        }, [
           // set up the fields mapping into the xml doc
           // The first needs mapping, the others are very basic
           { name: 'Author', mapping: 'ItemAttributes > Author' },
           'Title',
		   'Manufacturer',
		   'ProductGroup',
		   // Detail URL is not part of the column model of the grid
		   'DetailPageURL'
        ])
    });
    // call the superclass's constructor 
    App.BookStore.superclass.constructor.call(this, config);
};
Ext.extend(App.BookStore, Ext.data.Store);