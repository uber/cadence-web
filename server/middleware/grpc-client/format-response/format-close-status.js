const formatCloseStatus = closeStatus => closeStatus === 'WORKFLOW_EXECUTION_CLOSE_STATUS_INVALID' ? null : closeStatus.replace('WORKFLOW_EXECUTION_CLOSE_STATUS_', '');

module.exports = formatCloseStatus;
