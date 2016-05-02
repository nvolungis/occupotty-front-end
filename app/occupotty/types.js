import createAsyncActionsTypes from "app/utils/create_async_actions_types";
import createSyncActionsTypes from "app/utils/create_sync_actions_types";

const AsyncTypes = createAsyncActionsTypes([
  "FETCH_BATHROOM_STATUS",
  "FETCH_MOTIVATIONS",
  "SET_CURRENT_TRACK"
]);

const SyncTypes = createSyncActionsTypes([
  "SET_SEARCH_RESULTS"
]);

export default {...SyncTypes, ...AsyncTypes};
