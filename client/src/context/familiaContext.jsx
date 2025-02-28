import { createContext, useContext, useState } from "react";
import {
  createFamiliaRequest,
  deleteFamiliaRequest,
  getFamiliasRequest,
  getFamiliaRequest,
  updateFamiliaRequest,
} from "../api/familias";

const FamiliaContext = createContext();

export const useFamilias = () => {
  const context = useContext(FamiliaContext);
  if (!context) throw new Error("useFamilias must be used within a FamiliaProvider");
  return context;
};

export function FamiliaProvider({ children }) {
  const [familias, setFamilias] = useState([]);
//Para futuras funciones de administrador general
  const getFamilias = async () => {
    const res = await getFamiliasRequest();
    setFamilias(res.data);
  };

  const deleteFamilia = async (id) => {
    try {
      const res = await deleteFamiliaRequest(id);
      if (res.status === 204) setFamilias(familias.filter((familia) => familia._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const createFamilia = async (familia) => {
    try {
      const res = await createFamiliaRequest(familia);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getFamilia = async (id) => {
    try {
      const res = await getFamiliaRequest(id);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateFamilia = async (id, familia) => {
    try {
      await updateFamiliaRequest(id, familia);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FamiliaContext.Provider
      value={{
        familias,
        getFamilias,
        deleteFamilia,
        createFamilia,
        getFamilia,
        updateFamilia,
      }}
    >
      {children}
    </FamiliaContext.Provider>
  );
}