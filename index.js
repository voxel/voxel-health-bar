'use strict';

module.exports = function(game, opts) {
  return new HealthBarPlugin(game, opts);
};

module.exports.pluginInfo = {
  loadAfter: ['voxel-health']
};

var cssPercentWidth = function(value, max) {
  return (value / max * 100.0) + '%';
}

function HealthBarPlugin(game, opts) {
  this.healthPlugin = game.plugins && game.plugins.get('voxel-health');
  if (!this.healthPlugin) throw new Error('voxel-health-bar requires voxel-health plugin');

  var bar = document.createElement('div');
  bar.style.backgroundColor = opts.frontColor || 'darkgreen';
  bar.style.width = cssPercentWidth(this.healthPlugin.startHealth, this.healthPlugin.maxHealth);
  bar.style.height = '100%';

  var inner = document.createElement('div');
  inner.style.margin = '0 auto';
  inner.style.width = opts.width || '880px';
  inner.style.height = opts.height || '20px';
  inner.style.backgroundColor = opts.backColor || 'lightgreen';
  inner.style.opacity = opts.opacity || '0.8';
  inner.appendChild(bar);

  var outer = document.createElement('div');
  outer.style.width = '100%';
  outer.style.position = 'absolute';
  outer.style.bottom = opts.bottom || '100px';
  outer.style.visibility = 'hidden';
  outer.appendChild(inner);
  document.body.appendChild(outer);

  this.bar = bar;
  this.container = outer;

  this.enable();
}

HealthBarPlugin.prototype.enable = function() {
  this.container.style.visibility = '';

  this.healthPlugin.on('health', this.onHealth = this.update.bind(this));
};

HealthBarPlugin.prototype.disable = function() {
  this.container.style.visibility = 'hidden';

  this.healthPlugin.removeListener('health', this.onHealth);
};

HealthBarPlugin.prototype.update = function() {
  this.bar.style.width = this.healthPlugin.percentage() + '%';
};
