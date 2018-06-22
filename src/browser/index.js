'use strict';

angular
.module('app', ['blueimp.fileupload'])
.component('upload', {
    bindings: {},
    controller: 'uploadCtrl',
    template: function () {
        return [
            '<div class="container">',
                '<form enctype="multipart/form-data" autocomplete="off">',
                    '<p>Upload Video</p>',
                    '<input id="fileupload" type="file" name="files" accept="video/*">',
                '</form>',
                '<div class="progress" ng-show="$ctrl.isUploading">',
                    '<div class="progress-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" style="width: {{$ctrl.progress}}">{{$ctrl.progress}}</div>',
                '</div>',
                '<div id="error" ng-show="$ctrl.error && !$ctrl.isUploading">Error: {{$ctrl.error}}</div>',
                '<div id="preview" ng-if="$ctrl.videoId && !$ctrl.isUploading">',
                    '<iframe src="{{$ctrl.videoId}}" allowtransparency="true" frameborder="0" scrolling="no" class="wistia_embed" name="wistia_embed" allowfullscreen mozallowfullscreen webkitallowfullscreen oallowfullscreen msallowfullscreen width="620" height="349"></iframe>',
                '</div>',
            '</div>'
        ].join('');
    }
})
.controller('uploadCtrl', function ($scope, $element, $sce) {
    var ctrl = this;
    ctrl.progress = '0%';
    ctrl.videoId = '';
    ctrl.error = false;
    ctrl.isUploading = false;
    this.$onInit = function() {
        var fileInput = $element.find('#fileupload');
        fileInput.fileupload({
            url: 'https://upload.wistia.com/?access_token=b8accefe373776e42699a3723bd2acc475d4266bd45f8831a7e6417a4711dce9',
            autoUpload: true,
            acceptFileTypes: /(\.|\/)(flv|avi|mov|mp4|mpg|wmv|3gp)$/i,
            progressall: function (e, data) {
                ctrl.isUploading = true;
                $scope.$apply(function () {
                    ctrl.progress = parseInt(data.loaded / data.total * 100, 10) + '%';;
                });
            },
            done: function (e, data) {
                $scope.$apply(function () {
                    ctrl.videoId = $sce.trustAsResourceUrl("//fast.wistia.net/embed/iframe/" + data.result.hashed_id);
                    ctrl.isUploading = false;
                });
            },
            fail: function (e, data) {
                $scope.$apply(function () {
                    ctrl.error = data.errorThrown;
                    ctrl.isUploading = false;
                });
            },
        });
    };

})
.controller('MainCtrl', function() {

});