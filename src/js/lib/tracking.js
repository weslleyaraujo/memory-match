define([
  'shared/mediator',
], function (mediator) {

  return {
    init: function () {
      this.bind();
    },

    prepare: function () {
    
    },

    bind: function () {
      mediator.subscribe('game:start', $.proxy(this.track, this, 'game', 'start'));
      mediator.subscribe('game:win', $.proxy(this.track, this, 'game', 'win'));
      mediator.subscribe('game:abort', $.proxy(this.track, this, 'game', 'abort'));
      mediator.subscribe('easteregg:show', $.proxy(this.track, this, 'game', 'easteregg'));
    },

    track: function (name, label) {
      ga('send', 'event', name, label);
    }
  };

});
