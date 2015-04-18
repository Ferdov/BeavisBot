exports.names = ['.ban', '.unban'];
exports.hidden = true;
exports.enabled = false;
exports.matchStart = true;
exports.handler = function (data) {

    // Only bouncers and above can call this
    if (data.from.role > 1) {

        var input = data.message.split(' ');
        var command = _.first(input);
        var params = _.rest(input);
        var username = '';

        if (params.length >= 2) {
            username = _.initial(params).join(' ').trim();
            duration = _.last(params).toUpperCase();
        }
        else if (params.length == 1) {
            username = params.join(' ').trim();
            var duration = 'PERMA';
        }
        else {
            bot.sendChat('Usage: .[ban|unban|kick] username [PERMA|DAY|HOUR]');
            return;
        }

        var usernameFormatted = S(username).chompLeft('@').s;

        // Don't let bouncers get too feisty (API should prohibit this, but just making sure!
        if (data.from.role == 2) {
            duration = 'HOUR';
        }

        switch (duration) {
            case 'DAY':
                apiDuration = 1440;
                break;
            case 'PERMA':
                apiDuration = -1;
                break;
            case 'HOUR':
            default:
                apiDuration = 60;
                break;

        }

    }
};
