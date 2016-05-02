import moment from "moment";

export function getTodayString () {
  return moment().startOf("day").format("MMMM Do");
}

export function getCreatedAtString (createdAt) {
  return moment(createdAt).startOf("day").format("MMMM Do");
}
