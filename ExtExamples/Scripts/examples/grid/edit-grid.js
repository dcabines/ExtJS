Ext.onReady(function () {
    Ext.QuickTips.init();

    Ext.grid.CheckColumn = (function () {
        var checkColumn = function (config) {
            Ext.apply(this, config);
            if (!this.id) {
                this.id = Ext.id();
            }
            this.renderer = this.renderer.createDelegate(this);
        };

        checkColumn.prototype = {
            init: function (grid) {
                this.grid = grid;
                this.grid.on('render', function () {
                    var view = this.grid.getView();
                    view.mainBody.on('mousedown', this.onMouseDown, this);
                }, this);
            },

            onMouseDown: function (e, t) {
                if (t.className && t.className.indexOf('x-grid3-cc-' + this.id) != -1) {
                    e.stopEvent();
                    var index = this.grid.getView().findRowIndex(t);
                    var record = this.grid.store.getAt(index);
                    record.set(this.dataIndex, !record.data[this.dataIndex]);
                }
            },

            renderer: function (v, p, record) {
                p.css += ' x-grid3-check-col-td';
                return '<div class="x-grid3-check-col' + (v ? '-on' : '') + ' x-grid3-cc-' + this.id + '">&#160;</div>';
            }
        };

        return checkColumn;
    }());

    var Plant = Ext.data.Record.create([
           { name: 'common', type: 'string' },
           { name: 'botanical', type: 'string' },
           { name: 'light' },
           { name: 'price', type: 'float' },
           { name: 'availDate', mapping: 'availability', type: 'date', dateFormat: 'm/d/Y' },
           { name: 'indoor', type: 'bool' }
    ]);

    function createStore() {
        var store = new Ext.data.Store({
            url: '/Content/xml/plants.xml',
            reader: new Ext.data.XmlReader({ record: 'plant' }, Plant),
            sortInfo: { field: 'common', direction: 'ASC' }
        });

        return store;
    }

    function createGrid(store) {
        var checkColumn = new Ext.grid.CheckColumn({
            header: "Indoor?",
            dataIndex: 'indoor',
            width: 55
        });

        function createColumnModel() {
            var fm = Ext.form;

            function formatDate(value) {
                return value ? value.dateFormat('M d, Y') : '';
            };

            var commonNameColumn = {
                id: 'common',
                header: "Common Name",
                dataIndex: 'common',
                width: 220,
                editor: new fm.TextField({
                    allowBlank: false
                })
            };

            var lightColumn = {
                header: "Light",
                dataIndex: 'light',
                width: 130,
                editor: new fm.ComboBox({
                    typeAhead: true,
                    triggerAction: 'all',
                    transform: 'light',
                    lazyRender: true,
                    listClass: 'x-combo-list-small'
                })
            };

            var priceColumn = {
                header: "Price",
                dataIndex: 'price',
                width: 70,
                align: 'right',
                renderer: 'usMoney',
                editor: new fm.NumberField({
                    allowBlank: false,
                    allowNegative: false,
                    maxValue: 100000
                })
            };

            var availableDateColumn = {
                header: "Available",
                dataIndex: 'availDate',
                width: 95,
                renderer: formatDate,
                editor: new fm.DateField({
                    format: 'm/d/y',
                    minValue: '01/01/06',
                    disabledDays: [0, 6],
                    disabledDaysText: 'Plants are not available on the weekends'
                })
            };

            var columns = [
                commonNameColumn,
                lightColumn,
                priceColumn,
                availableDateColumn,
                checkColumn
            ];

            var model = new Ext.grid.ColumnModel(columns);

            model.defaultSortable = true;

            return model;
        }

        var columnModel = createColumnModel();

        var addPlantButton = {
            text: 'Add Plant',
            cls: 'x-btn-text-icon',
            icon: '/Content/images/default/dd/drop-add.gif',
            handler: function () {
                var plant = new Plant({
                    common: 'New Plant 1',
                    light: 'Mostly Shady',
                    price: 0,
                    availDate: (new Date()).clearTime(),
                    indoor: false
                });

                grid.stopEditing();
                store.insert(0, plant);
                grid.startEditing(0, 0);
            }
        };

        var grid = new Ext.grid.EditorGridPanel({
            store: store,
            cm: columnModel,
            renderTo: 'editor-grid',
            width: 600,
            height: 300,
            autoExpandColumn: 'common',
            title: 'Edit Grid',
            frame: true,
            plugins: checkColumn,
            clicksToEdit: 1,
            tbar: [addPlantButton]
        });

        return grid;
    }

    var store = createStore();
    var grid = createGrid(store);

    store.load();
});