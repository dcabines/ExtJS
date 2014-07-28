Ext.ns('App');

App.BookDetail = (function () {
    function strong(text) {
        return '<strong>' + text + '</strong>';
    }

    return Ext.extend(Ext.Panel, {
        tplMarkup: [
            strong('Title:') + ' <a href="{DetailPageURL}" target="_blank">{Title}</a><br/>',
            strong('Author:') + ' {Author}<br/>',
            strong('Manufacturer:') + ' {Manufacturer}<br/>',
            strong('Product Group:') + ' {ProductGroup}'
        ],

        startingMarkup: 'Select a book to see additional details',

        initComponent: function () {
            this.tpl = new Ext.Template(this.tplMarkup);
            Ext.apply(this, {
                bodyStyle: {
                    background: '#ffffff',
                    padding: '7px'
                },
                html: this.startingMarkup
            });

            App.BookDetail.superclass.initComponent.call(this);
        },

        updateDetail: function (data) {
            this.tpl.overwrite(this.body, data);
        }
    });
}());

Ext.reg('bookdetail', App.BookDetail);