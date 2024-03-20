export type status = "Pending" | "Completed";

export type todoType = {
  title: string;
  currentStatus: status;
  id: string;
  date: string;
};

export type inputType = {
  titleInput: string;
  dateCreated: string;
  id?: string;
};
