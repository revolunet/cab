Ext.ns('Cab.utils');

Cab.utils = {

    removeLoadMask: function() {
        var el = Ext.getBody().down('.loadmask');

        if (el) Ext.Anim.run(el, 'fade', {
            after: Ext.createDelegate(el.remove, el)
        });
    },

    startPolling: function() {
        setInterval(function() {
            Cab.data.Rides.load({
                params: {
                    userId: Cab.utils.userId
                }
            });
        }, 5000);
    },

    loadUserId: function() {
        var userId = Cab.utils.localStorage._getItems()[0];
        if (!userId) {
            userId = Ext.id();
            Cab.utils.localStorage.add(userId);
            console.log("createUserId", userId);
        }
        Cab.utils.userId = userId;
        return Cab.utils.userId;
    },

    localStorage: new function() {
				
		this._localKey = 'userId';
		this._items = [];

		this.add = function(item) {
			if (this.exists(item)) return;
			this._getItems().push(this._cast(item));
			this._save();
		};
		this.remove = function(item) {
			if (!this.exists(item)) return;
			this._getItems().remove(this._cast(item));
			this._save();
		};
		this.toggle = function(item) {
			if (this.exists(item)) this.remove(item);
			else this.add(item);
		};
		this.exists = function(item) {
			return (this._getItems().indexOf(this._cast(item))>-1);
		};
		this.clear = function() {
			this._items = [];
			this._save();	
		};
		this._cast = function(item) {
			// cast to string for localStorage deserialisation
			return ''+item;
		};
		this._getItems = function() {
			return this._items;
		};
		this._save = function() {
			// backup to localStorage
			localStorage.setItem(this._localKey, this._getItems());
		};
		this._init = function() {
			// load from localStorage
			var items = localStorage.getItem(this._localKey);
			if (items) items = items.split(',');
			this._items =  items || [];
		};
		this._init();
	}

};