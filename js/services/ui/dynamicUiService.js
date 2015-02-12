agbeServices.factory('dynamicUiService', ['$log', '$window', '$timeout', 'dynamicCommands', '$q', function (log, $window, $timeout, dynamicCommands, $q) {

    var dynamicCommandsById = {};

    function DynamicContext(id, jqElem) {
        this.id = id;
        this.jqElem = jqElem;
        this.commands = this.getDynamicCommands(id);
    }

    DynamicContext.prototype.getDynamicCommands = function (identifier) {
        var result = dynamicCommandsById[identifier];
        if (result == null) {$
            result = {};
            var definitionObjet = dynamicCommands[identifier];
            if (definitionObjet != null) {
                if (definitionObjet.templates != null) {
                    for (var i = 0; i < definitionObjet.templates.length; i++) {
                        var res = this.getDynamicCommands(definitionObjet.templates[i]);
                        this.overrideProps(result, res);
                    }
                }
                this.overrideProps(result, definitionObjet.props);
            }
        }
        return result;
    }

    DynamicContext.prototype.overrideProps = function (targetProps, sourceProps) {
        if (targetProps == null || sourceProps == null) {
            return;
        }
        for (var prop in sourceProps) {
            targetProps[prop] = sourceProps[prop];
        }
    }

    DynamicContext.prototype.process = function () {
        this.interpretPosition();
    }

    DynamicContext.prototype.getPositionValueAndUnit = function (val) {
        var result = null;
        var pattern = /(\d+)(.*)/;
        var match = pattern.exec(val);
        if (match != null) {
            result = {};
            result.value = match[1];
            result.unit = match[2];
        }
        return result;
    }

    DynamicContext.prototype.getCommandByTagAndName = function (commands,tagName,propName) {
        var result = null;
        if (!commands || !tagName || !propName) {
            return result;
        }
        var tagCommands = commands[tagName];
        if (!tagCommands) {
            return result;
        }
        result = tagCommands[propName];
        return result;
    }

    function isValidProp(prop) {
        var result = false;
        if (prop != null && prop.value != null) {
            result = true;
        }
        return result;
    }

    DynamicContext.prototype.getImgRealSize_q = function () {
        var res_q = $q.defer();
        if (!this.jqElem.data('realSize')) {
            var pic_real_width, pic_real_height;
            var oldThis = this;
            $("<img/>") // Make in memory copy of image to avoid css issues
                .attr("src", this.jqElem.attr("src"))
                .load(function () {
                    pic_real_width = this.width;   // Note: $(this).width() will not
                    pic_real_height = this.height; // work for in memory images.
                    var realSize = { width: pic_real_width, height: pic_real_height};
                    var result = {realSize:realSize,oldThis:oldThis};
                    oldThis.jqElem.data('realSize', result);
                    res_q.resolve(result);
                });
        }
        else {
            res_q.resolve(this.jqElem.data('realSize'));
        }
        return res_q.promise;
    }

    function onError(error) {
        log.error(error);
    }

    DynamicContext.prototype.interpretPosition = function () {
        var def0 = {value: 0, unit: '%'};
        var def100 = {value: 100, unit: '%'};
        var left = this.getPositionValueAndUnit(this.commands.left);
        var right = this.getPositionValueAndUnit(this.commands.right);
        var top = this.getPositionValueAndUnit(this.commands.top);
        var bottom = this.getPositionValueAndUnit(this.commands.bottom);
        var referent = this.getReferentContainer();
        var refWidth = referent.width();
        var refHeight = referent.height()
        var referentPosition = referent.position();
        var refLeft = Math.round(referentPosition.left);
        var refTop = Math.round(referentPosition.top);
        refTop = 0;
        refLeft = 0;
        // TODO eclaircir
        var positionType ='absolute';

        if (this.jqElem.get(0).tagName != 'IMG') {
            var startBorder = Math.round(refWidth * ((left != null ? left.value : def0.value) / 100));
            var endBorder = Math.round(refWidth * ((right != null ? right.value : def100.value) / 100));
            var width = endBorder - startBorder;
            var topBorder = Math.round(refHeight * ((top != null ? top.value : def0.value) / 100));
            var bottomBorder = Math.round(refHeight * ((bottom != null ? bottom.value : def100.value) / 100));
            var height = bottomBorder - topBorder;
            this.jqElem.css({position: positionType, left: (startBorder+refLeft) + 'px', width: width + 'px', top: (topBorder+refTop)+'px', height: height});
        }
        else {
            this.getImgRealSize_q().then(function (obj) {
                var realSize = obj.realSize;
                var oldThis = obj.oldThis;
                var ratioCommand = oldThis.getCommandByTagAndName(oldThis.commands,'img','ratio');
                var keepRatio = (ratioCommand == 'keep');
                var ratio = realSize.width/realSize.height;
                var jqElem = oldThis.jqElem;
                if (left && right && ((top && !bottom) || (!top && bottom))) {
                    var startBorder = Math.round(refWidth * ((left != null ? left.value : def0.value) / 100));
                    var endBorder = Math.round(refWidth * ((right != null ? right.value : def100.value) / 100));
                    var width = endBorder - startBorder;
                    var zooomFactor = width / realSize.width;
                    var heightSpace = Math.round(refHeight * ((bottom != null ? bottom.value : def100.value) / 100))-Math.round(refHeight * ((top != null ? top.value : def0.value) / 100));
                    var height = Math.min(Math.round(zooomFactor * realSize.height), heightSpace);
                    var topBorder = null;
                    if (top) {
                        topBorder = Math.round(refHeight * (top.value) / 100);
                    }
                    else {
                        var bottomBorder = Math.round(refHeight * (bottom.value) / 100);
                        topBorder = bottomBorder - height;
                    }
                    if ((width/height > ratio) && (keepRatio)) {
                        // deformation, not good
                        var oldWidth = width;
                        width = Math.round(ratio*height);
                        var diff = oldWidth-width;
                        startBorder = startBorder+Math.round(diff/2);
                    }
                    jqElem.css({position: positionType, left: (startBorder+refLeft) + 'px', width: width + 'px', top: (topBorder+refTop)+'px', height: height});
                }
                else if (top && bottom && ((left && !right) || (!left && right))) {
                    var topBorder = Math.round(refHeight * ((top != null ? top.value : def0.value) / 100));
                    var bottomBorder = Math.round(refHeight * ((bottom != null ? bottom.value : def100.value) / 100));
                    var height = bottomBorder - topBorder;
                    var zoomFactor = height / realSize.height;
                    var widthSpace = Math.round(refWidth * ((right != null ? right.value : def100.value) / 100))-Math.round(refWidth * ((left != null ? left.value : def0.value) / 100));
                    var width = Math.min(Math.round(zoomFactor * realSize.width), widthSpace);
                    var startBorder = null;
                    if (left) {
                        startBorder = Math.round(refWidth * (left.value) / 100);
                    }
                    else {
                        var endBorder = Math.round(refWidth * (right.value) / 100);
                        startBorder = endBorder - width;
                    }
                    if ((width/height < ratio) && (keepRatio)) {
                        // deformation, not good
                        var oldHeight = height;
                        height = Math.round(width/ratio);
                        var diff = oldHeight-height;
                        topBorder = topBorder+Math.round(diff/2);
                    }
                    jqElem.css({position: positionType, left: (startBorder+refLeft) + 'px', width: width + 'px', top: (topBorder+refTop)+'px', height: height});
                }
                else {
                    var startBorder = Math.round(refWidth * ((left != null ? left.value : def0.value) / 100));
                    var endBorder = Math.round(refWidth * ((right != null ? right.value : def100.value) / 100));
                    var width = endBorder - startBorder;
                    var topBorder = Math.round(refHeight * ((top != null ? top.value : def0.value) / 100));
                    var bottomBorder = Math.round(refHeight * ((bottom != null ? bottom.value : def100.value) / 100));
                    var height = bottomBorder - topBorder;
                    jqElem.css({position: positionType, left: (startBorder+refLeft) + 'px', width: width + 'px', top: (topBorder+refTop)+'px', height: height});
                }
            }, onError);
        }
    }

    DynamicContext.prototype.getReferentContainer = function (jqElem) {
        return $(window).get(0);
    }

    DynamicContext.prototype.getReferentContainerPosition = function (jqElem) {
        var daddy = this.getReferentContainer(jqElem);
        var result = {
            top: 0,
            left: 0
        }
        if (!(daddy instanceof window.constructor)) {
            var pos = daddy.position();
            result.top = pos.top;
            result.left = pos.left;
        }
        return result;
    }

    DynamicContext.prototype.getReferentContainer = function () {
        var result = this.jqElem.parent();
        return result;
    }


    var me = {

        DYNAMIC_COMMAND: 'agbe_dynamic',
        DYNAMIC_COMMAND_ID_PREFIX: 'agbe_id_',

        adjustElements: function () {
            log.log('dynamicUiService.adjustElements');
            $('.' + me.DYNAMIC_COMMAND).each(function () {
                var commands = $(this).attr('class').split(' ');
                for (var i = 0; i < commands.length; i++) {
                    var command = commands[i];
                    if (command.indexOf(me.DYNAMIC_COMMAND_ID_PREFIX) == 0) {
                        var id = command.substr(me.DYNAMIC_COMMAND_ID_PREFIX.length, command.length);
                        var dynamicContext = new DynamicContext(id, $(this));
                        dynamicContext.process();
                    }
                }
            });
        }

    }

    return me;
}]);