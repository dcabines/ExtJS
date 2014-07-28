Ext.onReady(function() {
	var bookApp = new App.BookMasterDetail({
		renderTo: 'binding-example'
	});

	Ext.StoreMgr.get('gridBookStore').load();
});