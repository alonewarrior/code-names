'use strict';
const CLSConstants = require("../Contracts/constants").CLSConstants;

const CLSFactory = function() {
    const Promise = require('bluebird');
    const clsBluebird = require('cls-bluebird');
    // const cls = require('continuation-local-storage');
    const cls = require('cls-hooked');
    const ns = cls.createNamespace(CLSConstants.GLOBAL_NAMESPACE);

    clsBluebird(ns, Promise);

    return ns;
};

export = CLSFactory;
module.exports = CLSFactory;
