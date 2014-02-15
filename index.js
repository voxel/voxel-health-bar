'use strict';

module.exports = function(game, opts) {
  return new HealthBarPlugin(game, opts);
};

module.exports.pluginInfo = {
  loadAfter: ['voxel-health']
};

function HealthBarPlugin(game, opts) {
  this.healthPlugin = game.plugins && game.plugins.get('voxel-health');
  if (!this.healthPlugin) throw new Error('voxel-health-bar requires voxel-health plugin');

  var outer = document.createElement('div');
  outer.style.width = '100%';
  outer.style.position = 'absolute';
  outer.style.bottom = opts.bottom || '100px';
  outer.style.visibility = 'hidden';

  var inner = document.createElement('div');
  inner.style.margin = '0 auto';
  inner.style.width = opts.width || '880px';
  inner.style.height = opts.height || '20px';
  inner.style.backgroundColor = opts.color || 'lightgreen';
  inner.style.opacity = opts.opacity || '0.8';

  outer.appendChild(inner);
  document.body.appendChild(outer);
  this.container = outer;

  this.enable();
}

HealthBarPlugin.prototype.enable = function() {
  this.container.style.visibility = '';
};

HealthBarPlugin.prototype.disable = function() {
  this.container.style.visibility = 'hidden';
};

