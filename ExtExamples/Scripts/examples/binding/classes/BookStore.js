Ext.ns('App');

App.BookStore = function (config) {
    var config = config || {};

    Ext.applyIf(config, {
        reader: new Ext.data.XmlReader({
            record: 'Item',
            id: 'ASIN',
            totalRecords: '@total'
        }, [
           { name: 'Author', mapping: 'ItemAttributes > Author' },
           'Title',
		   'Manufacturer',
		   'ProductGroup',
		   'DetailPageURL'
        ])
    });

    App.BookStore.superclass.constructor.call(this, config);
};

Ext.extend(App.BookStore, Ext.data.Store);