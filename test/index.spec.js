'use strict';
var { expect } = require('chai');
var pick = require('../src/');

describe('basics', () => {
    it('does stuff', () => {
        var pickedOne = range(100).map(() => (
            pick(['foo','bar','baz'], { weights: [ 80, 15, 5 ] })
        ));
        console.log({ pickedOne });

        var pickedMany = pick(['foo','bar','baz'], {
            weights: [ 80, 15, 5 ],
            count: 100,
        });

        console.log({ pickedMany });
    });
});

var range = (n) => ([ ...Array(n).keys() ]);

