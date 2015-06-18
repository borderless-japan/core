/**
 * Creates the orion variable
 */
orion = {};

/**
 * Initializes the subscriptions mannager
 */
if (TAPi18n.subscribe) {
  var subsOptions = {subscribe: _.bind(TAPi18n.subscribe, TAPi18n)};
}
orion.subs = new SubsManager(subsOptions);
