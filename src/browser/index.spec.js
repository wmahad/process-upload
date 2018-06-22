// 'use strict';
var element, $controller, scope, sce, elementMock, controller;

describe('Uploader: controller', function() {

    beforeEach(function () {
        angular.module('blueimp.fileupload', []);
        module('app');
    });
    beforeEach(inject(function( _$controller_) {
        $controller = _$controller_;
        sce = {
            trustAsResourceUrl: jasmine.createSpy().and.returnValue('http://uri'),
        };
        elementMock = {
            fileupload: jasmine.createSpy()
        }
        element = {
            find: jasmine.createSpy().and.returnValue(elementMock),
        }
        scope = {
            $apply: jasmine.createSpy(),
        };
        controller = $controller('uploadCtrl', { $scope: scope, $element: element, $sce: sce });
    }));

    it('should load the controller', function () {
        expect(controller).toBeDefined();
    });

    it('should call the on init method', function () {
        controller.$onInit();
        expect(element.find).toHaveBeenCalledWith('#fileupload');
        expect(elementMock.fileupload).toHaveBeenCalled();
    });
});
