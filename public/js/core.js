/**
 * Created with JetBrains WebStorm.
 * User: Paul.Bronshteyn
 * Date: 12/25/12
 * Time: 4:34 PM
 * To change this template use File | Settings | File Templates.
 */

jQuery('select.alliance').on('change', function(e) {
    window.location = '/tiles/alliance/' + this.value;
});

jQuery('select.player').on('change', function(e) {
    window.location = '/tiles/player/' + this.value;
});