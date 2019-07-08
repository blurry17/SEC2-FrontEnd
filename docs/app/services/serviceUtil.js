(function () {
    var serviceUtil = function () {
        var utilitario = {

        }

        var ddmmyyyy = function (date) {
            var d = new Date(date),
                month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear();

            if (month.length < 2) month = '0' + month;
            if (day.length < 2) day = '0' + day;
            return [day, month, year].join('/');
        }

        var getObjDate = function (date) {
            var d = new Date(date),
                month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear();

            if (month.length < 2) month = '0' + month;
            if (day.length < 2) day = '0' + day;

            var obj = {
                datestr: [day, month, year].join('/'),
                hora: '' + d.getHours(),
                min: '' + d.getMinutes()
            }

            return obj;
        }

        var yyyymmdd = function (date) {
            var d = new Date(date),
                month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear();

            if (month.length < 2) month = '0' + month;
            if (day.length < 2) day = '0' + day;
            return [year, month, day].join('-');
        }

        var formatSQL = function (date) {
            var d = new Date(date),
                month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear(),
                hour = '' + d.getHours(),
                min = '' + d.getMinutes(),
                seg = '' + d.getSeconds()

            if (month.length < 2) month = '0' + month;
            if (day.length < 2) day = '0' + day;
            if (hour.length < 2) hour = '0' + hour;
            if (min.length < 2) min = '0' + min;
            if (seg.length < 2) seg = '0' + seg;
            return [year, month, day].join('-') + ' ' + [hour, min, seg].join(':');
        }

        var convertToDate = function (datestring) {
            var dd = parseInt(datestring.substring(0, 2));
            var mm = parseInt(datestring.substring(3, 5));
            var yyyy = parseInt(datestring.substring(6, 10));

            return new Date(yyyy, mm - 1, dd);
        }

        var SQLtoJSDate = function (datestring) {
            var yyyy = parseInt(datestring.substring(0, 4));
            var mm = parseInt(datestring.substring(5, 7));
            var dd = parseInt(datestring.substring(8, 10));
            var hrs = parseInt(datestring.substring(11, 13));
            var min = parseInt(datestring.substring(14, 16));
            var seg = parseInt(datestring.substring(17, 19));

            return new Date(yyyy, mm - 1, dd, hrs, min, seg);
        }

        return {
            utilitario: utilitario,
            ddmmyyyy: ddmmyyyy,
            yyyymmdd: yyyymmdd,
            convertToDate: convertToDate,
            formatSQL: formatSQL,
            SQLtoJSDate: SQLtoJSDate,
            getObjDate: getObjDate,
        }

    }

    angular.module('ServiceUtil', []).factory("serviceUtil", serviceUtil);
})();