define(['tpl!entity/entity-matched-count.tmpl', 'tpl!entity/entity-confirmed-count.tmpl', 'tpl!entity/entity-fuzzy-count.tmpl', 'tpl!entity/entity-unmatched-count.tmpl' ], function (MatchedCount, ConfirmedCount, FuzzyCount, UnmatchedCount) {
    'use strict';
console.log(MatchedCount);
    return {
        'entityMatchedCount': MatchedCount,
        'entityConfirmedCount': ConfirmedCount,
        'entityFuzzyCount': FuzzyCount,
        'entityUnmatchedCount': UnmatchedCount
    };
});