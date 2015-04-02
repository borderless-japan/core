/**
 * Creates the orion variable
 */
orion = {};

/**
 * Initializes the subscriptions mannager
 */
if (TAPi18n.subscribe) {
  var subsOptions = {subscribe: TAPi18n.subscribe.bind(TAPi18n)};
}
orion.subs = new SubsManager(subsOptions);
