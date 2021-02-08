export default (state) => {
  state.settingsWorkflowHistory.eventHighlightList = state.history.eventHighlightList;
  state.settingsWorkflowHistory.eventHighlightListEnabled = state.history.eventHighlightListEnabled;
  state.settingsWorkflowHistory.graphEnabled = state.history.graphEnabled;
};
