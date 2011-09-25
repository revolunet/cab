Ext.ns('Cab.utils');

Cab.utils = {

    userId: null,

    removeLoadMask: function() {
        var el = Ext.getBody().down('.loadmask');

        if (el) Ext.Anim.run(el, 'fade', {
            after: Ext.createDelegate(el.remove, el)
        });
    },

    stopPolling: function() {
        console.log('stopPolling', this, arguments);
        if (this.pollTimeout) {
            clearTimeout(this.pollTimeout);
        }
    },

    startPolling: function() {
        Cab.utils.poll();
        this.pollTimeout = setInterval(function() {
            Cab.utils.poll();
        }, 5000);
    },

    poll: function() {
        Cab.data.Rides.load({
            params: {
                userId: Cab.utils.userId
            }
        });
    },

    loadUserId: function() {
        var userId = Cab.utils.localStorage._getItems()[0];
        if (!userId) {
            userId = Math.random();
            Cab.utils.localStorage.add(userId);
            console.log("createUserId", userId);
        }
        Cab.utils.userId = userId;
        return Cab.utils.userId;
    },

    watchPosition: function() {
        var self = this;
        navigator.geolocation.watchPosition(function(position) {
            console.log("position", this, arguments);
            self.position = position.coords;
            self.sendPosition();
        });
    },

    sendPosition: function() {
        var position = Ext.ModelMgr.getModel('Position');
        position.load('42', {
            scope: this,
            params: {
                userId: this.userId,
                latitude: this.position.latitude,
                longitude: this.position.longitude
            },
            callback: function(model, response) {
                console.log("position callback", this, arguments);
            }
        });
    },

    localStorage: new function() {
				
		this._localKey = 'Cab-userId';
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