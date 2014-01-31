define(['SubmissionMgmt.App'], function (App) {

    'use strict';

    describe('SubmissionMgmt.App', function () {

        it('should be a defined module', function () {
            expect(App).toBeDefined();
        });

        it('should have a "entityTabSummary" region', function () {
            console.log(App.entityTabSummary);
            expect(App.entityTabSummary).toBeDefined();
        });
    });
});