Ext.ns('App');

App.BookMasterDetail = Ext.extend(Ext.Panel, {
    initComponent: function () {
        Ext.applyIf(this, {
            frame: true,
            title: 'Book List',
            width: 540,
            height: 400,
            layout: 'border',
            items: [{
                xtype: 'bookgrid',
                itemId: 'gridPanel',
                region: 'north',
                height: 210,
                split: true
            }, {
                xtype: 'bookdetail',
                itemId: 'detailPanel',
                region: 'center'
            }]
        })
        
        App.BookMasterDetail.superclass.initComponent.call(this);
    },
    initEvents: function () {
        App.BookMasterDetail.superclass.initEvents.call(this);

        var bookGridSm = this.getComponent('gridPanel').getSelectionModel();
        bookGridSm.on('rowselect', this.onRowSelect, this);
    },
    onRowSelect: function (sm, rowIdx, r) {
        var detailPanel = this.getComponent('detailPanel');
        detailPanel.updateDetail(r.data);
    }
});

Ext.reg('bookmasterdetail', App.BookMasterDetail);