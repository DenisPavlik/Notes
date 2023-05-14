import axios from "axios";

export const getAllDataDB = async () => {
  const response = await axios.get(
    "https://quintadb.com.ua/apps/ctFmoXW51dOO3dVMaqoCoP/dtypes/entity/bUt8obqr1cOikFcsRcMJWT.json?rest_api_key=ddSCkYWQviWP3dKXhdQmkC&amp;view="
  );

  return response.data.records;
};

export const updateNote = async (globalID, note) => {
  const response = await axios.put(
    `https://quintadb.com.ua/apps/ctFmoXW51dOO3dVMaqoCoP/dtypes/${globalID}.json?rest_api_key=ddSCkYWQviWP3dKXhdQmkC`,
    {
      entity_id: "bUt8obqr1cOikFcsRcMJWT",
      values: {
        bmfmoZWR5dIPxcGSonBmkJ: note.id,
        ddTqFdK8jaWOhdUmkjdSo9: note.title,
        bIWRdcQ8nktB5LA8kKuSky: note.time,
        dcOvC9hXDgpyowWPtcI3fm: note.innerText,
        cYoSk0WQvjzkFdSWK_CCow: note.input,
      },
    }
  );
  return response;
};

export const addNote = async (note) => {
  const response = await axios.post(
    `https://quintadb.com.ua/apps/ctFmoXW51dOO3dVMaqoCoP/dtypes.json?rest_api_key=ddSCkYWQviWP3dKXhdQmkC`,
    {
      entity_id: "bUt8obqr1cOikFcsRcMJWT",
      values: {
        bmfmoZWR5dIPxcGSonBmkJ: note.id,
        ddTqFdK8jaWOhdUmkjdSo9: note.title,
        bIWRdcQ8nktB5LA8kKuSky: note.time,
        dcOvC9hXDgpyowWPtcI3fm: note.innerText,
        cYoSk0WQvjzkFdSWK_CCow: note.input,
      },
    }
  );
  return getAllDataDB();
};

export const deleteNote = async (globalID) => {
  const response = await axios.delete(
    `https://quintadb.com.ua/apps/ctFmoXW51dOO3dVMaqoCoP/dtypes/${globalID}.json?rest_api_key=ddSCkYWQviWP3dKXhdQmkC`
  );
  return response;
};
