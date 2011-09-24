Ext.ns('Ext.ux');

/**
 * @class Ext.ux.CardPanel
 * A panel with a card layout, destroying hidden items after each item activation.
 * @extends Ext.Panel
 * @xtype ux_cardpanel
 * @author Revolunet
 */
Ext.ux.CardPanel = Ext.extend(Ext.Panel, {

    /**
     * @cfg
     * The panel layout.
     */
    layout: 'card',


    initComponent: function() {
        this.addEvents(
            /**
             * @event cardactivated
             * Fires after card activation and animation.
             * @param {Ext.ux.CardPanel} this
             */
            'cardactivated'
        );
        Ext.ux.CardPanel.superclass.initComponent.apply(this, arguments);
    },


    /**
     * Actives a card in this container.
     * @param {Ext.Component/Object/String} card The card you want to be made active. A string is interpreted as a xtype.
     * @param {String/Object} cardSwitchAnimation (optional) The cardSwitchAnimation used to switch between the cards.
     * @param {Boolean} showLoadMask True to show loadMask over old card.
     * @return {Ext.Component} card
     * @method
     */
    setActiveCard: function(card, anim, showLoadMask) {
        console.log("setActiveCard", this, arguments, this.items.indexOf(card));
        if (typeof card === 'string') {
            card = {xtype: card};
        }

        if (typeof anim === 'string') {
            anim = {type: anim};
        }

        var activeItem,
            item = this.items.indexOf(card) > -1 ? card : this.add(card),
            anim = Ext.apply({
                scope: this,
                type: 'fade',
                after: function() {
                    if (this.timeout) clearTimeout(this.timeout);
                    this.timeout = Ext.defer(this.afterCardActivated, 500, this);
                }
            }, anim || {});

        if (showLoadMask && (activeItem = this.getActiveItem())) {
            activeItem.setLoading(true);
        }

        this.setActiveItem(item, anim);

        return item;
    },


    /**
     * Called after card activation.
     * @private
     * @method
     */
    afterCardActivated: function() {
        console.log("afterCardActivated", this, arguments);
        delete this.timeout;
        if (this.items.getCount() > 1) {
            this.removeHiddenCards();
        }
        this.fireEvent('cardactivated', this);
        var card = this.items.first();
        card.fireEvent('activated', card);
    },


    /**
     * Removes all hidden cards.
     * @private
     * @method
     */
    removeHiddenCards: function() {
        console.log('removeHiddenCards', this, arguments);
        var items = [],
            count = this.items.getCount();
        this.items.each(function(item, index) {
            if (index <= count - 2) {
                items.push(item);
            }
        });
        for (var i = 0, l = items.length; i < l; i++) {
            console.warn("destroy", items[i], items[i].xtype);
            items[i].destroy();
        }
    }

});

Ext.reg('ux_cardpanel', Ext.ux.CardPanel);