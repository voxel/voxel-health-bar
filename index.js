'use strict';

module.exports = function(game, opts) {
  return new HealthBarPlugin(game, opts);
};

module.exports.pluginInfo = {
  clientOnly: true,
  loadAfter: [
    'voxel-health',           // provides health value
    'voxel-inventory-hotbar'  // optional, but looks better loading after
    ]
};

var cssPercentWidth = function(value, max) {
  return (value / max * 100.0) + '%';
}

function HealthBarPlugin(game, opts) {
  this.opts = opts || {};

  this.healthPlugin = game.plugins && game.plugins.get('voxel-health');
  if (!this.healthPlugin) throw new Error('voxel-health-bar requires voxel-health plugin');

  this.enable();
}

HealthBarPlugin.prototype.enable = function() {
  var opts = this.opts;

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

  var container = document.createElement('div');
  container.setAttribute('id', 'voxel-health-bar');
  container.style.width = '100%';
  container.style.position = 'absolute';
  container.style.bottom = opts.bottom || '100px';
  container.appendChild(inner);
  document.body.appendChild(container);

  this.bar = bar;
  this.container = container;

  this.healthPlugin.on('health', this.onHealth = this.update.bind(this));
};

HealthBarPlugin.prototype.disable = function() {
  if (this.container) this.container.parentElement.removeChild(this.container);

  delete this.bar;
  delete this.container;

  this.healthPlugin.removeListener('health', this.onHealth);
};

HealthBarPlugin.prototype.update = function() {
  if (this.bar) this.bar.style.width = this.healthPlugin.percentage() + '%';
};
