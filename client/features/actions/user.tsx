import axios from "axios";

export const CheckRoom = async (dispatch: any) => {
  try {
    const res = await (await axios.get("")).data;
    dispatch();
  } catch (error) {}
};
