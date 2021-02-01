/// <reference path="../../declarations/GameHelper.d.ts" />

class OakItemLoadouts {
    defaults = {
        available: 0,
    }

    loadouts: OakItems.OakItem[][];


    //Number of Loadouts Available
    private _available: KnockoutObservable<number>;

    constructor() {
        this._available = ko.observable(0);
        this.loadouts = [[],[],[]];
    }

    activateLoadout(num: number) {
        App.game.oakItems.deactivateAll();
        this.loadouts[num - 1].forEach((item: OakItems.OakItem) => {
            App.game.oakItems.activate(item);
        });
    }

    updateLoadout(num: number, item: OakItems.OakItem) {
        if (this.loadouts[num - 1].includes(item)) {
            const index = this.loadouts[num - 1].indexOf(item);
            if (index !== -1) {
                this.loadouts[num - 1].splice(index, 1);
            }
        } else if (this.loadouts[num - 1].length < 3 && App.game.oakItems.isUnlocked(item)) {
            this.loadouts[num - 1].push(item);
        }
    }

    isPartOfLoadout(num: number, item: OakItems.OakItem) {
        return this.loadouts[num - 1].includes(item);
    }

    clearLoadout(num: number) {
        this.loadouts[num - 1] = [];
    }

    openLoadoutModal() {
        $('#OakItemLoadoutModal').modal('show');
    }

    // Knockout getters/setters
    get available() {
        return this._available();
    }

    set available(val: number) {
        this._available(val);
    }
}