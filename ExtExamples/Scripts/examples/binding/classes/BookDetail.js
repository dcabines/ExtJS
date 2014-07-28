Ext.ns('App');

App.BookDetail = (function () {
    function strong(text) {
        return '<strong>' + text + '</strong>';
    }

    return Ext.extend(Ext.Panel, {
        // add tplMarkup as a new property
        tplMarkup: [
            strong('Title:') + ' <a href="{DetailPageURL}" target="_blank">{Title}</a><br/>',
            strong('Author:') + ' {Author}<br/>',
            strong('Manufacturer:') + ' {Manufacturer}<br/>',
            strong('Product Group:') + ' {ProductGroup}<br/>'
        ],
        // startingMarup as a new property
        startingMarkup: 'Select a book to see additional details',
        // override initComponent to create and compile the template
        // apply styles to the body of the panel and initialize
        // html to startingMarkup
        initComponent: function () {
            this.tpl = new Ext.Template(this.tplMarkup);
            Ext.apply(this, {
                bodyStyle: {
                    background: '#ffffff',
                    padding: '7px'
                },
                html: this.startingMarkup
            });
            // call the superclass's initComponent implementation
            App.BookDetail.superclass.initComponent.call(this);
        },
        // add a method which updates the details
        updateDetail: function (data) {
            this.tpl.overwrite(this.body, data);
        }
    });
}());
// register the App.BookDetail class with an xtype of bookdetail
Ext.reg('bookdetail', App.BookDetail);